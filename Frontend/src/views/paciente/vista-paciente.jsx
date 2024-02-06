import { useEffect, useState } from "react";
import useDental from "../../hooks/useDental";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import clienteAxios from "../../config/axios";
import useSWR from 'swr'
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

export default function VistaPaciente() {
  const { handleClickModal, handleTipoModal, handleDatosActual, handleEliminarDatos } = useDental();
  const [pacientes, setPacientes] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const pacientesPorPagina = 10;
  const [totalPacientes, setTotalPacientes] = useState(0);
  const fetcher = () => clienteAxios(`api/pacientes?page=${paginaActual}`).then(datos => datos.data)
  const { data, error, isLoading } = useSWR(`api/pacientes?page=${paginaActual}`, fetcher)
  useEffect(() => {
    handleTipoModal('paciente');
    if (data && data.data) {
      setPacientes(data.data);
      setTotalPacientes(data.total);
    }
  }, [data, error]);
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const handleBuscarPaciente = () => {
    if (terminoBusqueda != '') {
      clienteAxios.get(`api/paciente/${terminoBusqueda}`)
        .then((respuesta) => {
          if (respuesta.data.data != undefined) {
            setPacientes([respuesta.data.data])
            setTotalPacientes(1);
          }
        })
        .catch((error) => {
          handleErrorSweet('No se encontró ningún Cliente con esa identificación');
        });
    } else {
      setPacientes(data.data);
    }
  };

  if (isLoading) return <Spinner />

  return (
    <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
      <div className="mb-4 mt-4">
        <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Pacientes</h3>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            placeholder="Identificación Paciente..."
            className="p-2 border-gray-200 border rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button onClick={handleBuscarPaciente} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
            <FaSearch />
          </button>
        </div>
        <button onClick={handleClickModal} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPlus className="mr-2" /> Agregar Paciente
        </button>
      </div>
      <table className="min-w-full leading-normal mb-5">
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
      <Pagination
        totalItems={totalPacientes}
        itemsPerPage={pacientesPorPagina}
        currentPage={paginaActual}
        onPageChange={cambiarPagina}
      />
    </div>
  )

}
