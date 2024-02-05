import React, { useEffect, useState } from 'react';
import useDental from '../../hooks/useDental';
import useSWR from 'swr';
import clienteAxios from '../../config/axios';
import Spinner from '../../components/Spinner';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

export default function VistaUser() {
  const { handleDatosActual, handleTipoModal, handleClickModal, handleEliminarDatos } = useDental()
  const [usuarios, setUsuarios] = useState([])
  const fecher = () => clienteAxios('api/usuario').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('api/usuario', fecher)

  useEffect(() => {
    handleTipoModal('usuario')
    if (data && data.data) {
      setUsuarios(data.data)
    }

  }, [data, error])

  if (isLoading) return <Spinner />

  return (
    <div>
      <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
        <div className="mb-4 mt-4">
          <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de usuarios</h3>
        </div>
        <div className="flex justify-end mb-4">
          <button onClick={handleClickModal} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <FaPlus className="mr-2" /> Agregar Usuario
          </button>
        </div>
        <table className="min-w-full leading-normal">
          <thead className=''>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map(usuario => (
                <tr key={usuario.idusuario} className=''>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap text-base text-center">{usuario.nombre_usuario}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-base text-center">{usuario.roles.nombre_roles}</p>
                  </td>
                  {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: condicion.color_condicion }}></div>
                      </div>
                    </div>
                  </td> */}

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {/* <button onClick={() => { handleDatosActual(condicion) }} className="text-blue-500 hover:text-blue-700 mr-4">
                                        <FaEdit />
                                    </button> */}
                    <button onClick={() => { handleDatosActual(usuario) }} className="text-blue-500 hover:text-blue-700 mr-4">
                      <FaEdit size={20} />
                    </button>
                    <button onClick={() => handleEliminarDatos(usuario.idusuario, 'api/usuario')} className="text-red-500 hover:text-red-700 mr-4">
                      <FaTrash size={20} />
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
