import React, { useEffect } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import clienteAxios from '../../config/axios'
import useSWR from 'swr'
import Spinner from '../../components/Spinner'
import useDental from '../../hooks/useDental'

export default function Vistaenfermedades() {
  const { handleClickModal, handleDatosActual, handleTipoModal, handleEliminarDatos } = useDental()
  const fecher = () => clienteAxios('api/enfermedades').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('api/enfermedades', fecher)
  const [enfermedades, setEnfermedades] = React.useState([])

  useEffect(() => {
    handleTipoModal('enfermedad')
    if (data && data.data) {
      setEnfermedades(data.data)
    }
  }, [data, error])

  if (isLoading) return <Spinner />
  // console.log(enfermedades);
  return (
    <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
      <div className="mb-4 mt-4">
        <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Enfermedades</h3>
      </div>
      <div className="flex justify-end mb-4">
        <button onClick={handleClickModal} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPlus className="mr-2" /> Agregar Enfermedad
        </button>
      </div>
      <table className="min-w-full leading-normal">
        <thead className=''>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
              Nombre
            </th>
            {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Descripción
            </th> */}
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {enfermedades.length > 0 ? (


            enfermedades.map(enfermedad => (
              <tr key={enfermedad.idenfermedades} className=''>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap text-xl ">{enfermedad.nombre_enfermedad}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {/* <button onClick={() => handleDatosActual(enfermedad)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleEliminarDatos(enfermedad.idenfermedades, 'api/enfermedades')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center">
                    Eliminar
                  </button> */}

                  {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"> */}
                    <button onClick={() => handleDatosActual(enfermedad)} className="text-blue-500 hover:text-blue-700 mr-4">
                      <FaEdit size={20}/>
                    </button>
                    <button onClick={() => handleEliminarDatos(enfermedad.idenfermedades, 'api/enfermedades')} className="text-red-500 hover:text-red-700">
                      <FaTrash size={20}/>
                    </button>
                  {/* </td> */}
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
  )
}
