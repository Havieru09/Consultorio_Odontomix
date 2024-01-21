import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import useSWR from 'swr'
import Spinner from '../../components/Spinner'
import useDental from '../../hooks/useDental'
import { FaPlus } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
// import { FaEye } from 'react-icons/fa'
// import { FaTooth } from 'react-icons/fa'

export default function ListaCondiciones() {
    const fecher = () => clienteAxios('api/condiciones_dentales').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('api/condiciones_dentales', fecher)
    const { handleClickModal, handleDatosActual, handleTipoModal, handleEliminarDatos } = useDental();
    const [condiciones, setCondiciones] = useState([])
    useEffect(() => {
        handleTipoModal('condicion')
        if (data && data.data) {
            setCondiciones(data.data)
        }
    }, [data, error])

    return (
        <div>
            <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
                <div className="mb-4 mt-4">
                    <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Condiciones Dentales</h3>
                </div>
                <table className="min-w-full leading-normal">
                    <thead className=''>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                Nombre
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Color
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {condiciones.length > 0 ? (
                            condiciones.map(condicion => (
                                <tr key={condicion.idcondicionesd} className=''>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap text-base ">{condicion.nombre_condicion}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap text-base ">{condicion.descripcion_condicion}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: condicion.color_condicion }}></div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        {/* <button onClick={() => { handleDatosActual(condicion) }} className="text-blue-500 hover:text-blue-700 mr-4">
                                            <FaEdit />
                                        </button> */}
                                        <button onClick={() => { handleDatosActual(condicion) }}className="text-blue-500 hover:text-blue-700 mr-4">
                                            <FaEdit size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" colSpan="3">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">No hay datos</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>

                </table>

            </div>

        </div>
    )
}
