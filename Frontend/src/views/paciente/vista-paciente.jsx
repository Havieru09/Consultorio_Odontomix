import { useEffect, useState } from "react";
import useDental from "../../hooks/useDental";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import clienteAxios from "../../config/axios";
import useSWR from 'swr'
import Spinner from "../../components/Spinner";

export default function VistaPaciente() {
  const {  handleClickModal, handleTipoModal, handleDatosActual, handleEliminarDatos } = useDental();
  const [pacientes, setPacientes] = useState([]);
  const fetcher = () => clienteAxios('api/pacientes').then(datos => datos.data)
  const { data, error,isLoading } = useSWR('api/pacientes', fetcher)

  useEffect(() => {
    handleTipoModal('paciente');
    if (data && data.data) {
      setPacientes(data.data);
    }
  }, [data, error]);

  if (isLoading) return <Spinner />

  return (
    <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
      <div className="mb-4 mt-4">
        <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Pacientes</h3>
      </div>
      <div className="flex justify-end mb-4">
        <button onClick={handleClickModal} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPlus className="mr-2" /> Agregar Paciente
        </button>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nombres y Apellidos
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Identificación
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Género
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Edad
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Correo
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                No hay ningún paciente aún
              </td>
            </tr>
          ) :
            (


              pacientes.map(paciente => (
                <tr key={paciente.idpaciente}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                    {paciente.nombre_paciente} {paciente.apellidos_paciente}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                    {paciente.identificacion_paciente}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                    {paciente.genero_paciente}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                    {paciente.edad_paciente}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                    {paciente.telefono_paciente}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                    {paciente.correo_paciente}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button onClick={(event) => handleDatosActual(paciente)} className="text-blue-500 hover:text-blue-700 mr-4">
                      <FaEdit />
                    </button>
                    <button onClick={(event) => handleEliminarDatos(paciente.idpaciente, 'api/pacientes')} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )))}
        </tbody>
      </table>
    </div>
  )

}
