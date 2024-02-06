import { useEffect, useState } from "react";
import useDental from "../../hooks/useDental";
import clienteAxios from "../../config/axios";
import useSWR from "swr";
import Spinner from "../../components/Spinner";
import { formatearFechaSinHora, formatearHora } from "../../helpers";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormularioHistorialM from "./formulario-historialM";
import Pagination from "../../components/Pagination";
import { FaSearch } from "react-icons/fa";
export default function VistaConsultas() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const { handleErrorSweet } = useDental();
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalDatos, setTotalDatos] = useState(0);
  const DatosPorPagina = 6;
  const fetcher = () => clienteAxios(`api/consultas?page=${paginaActual}`).then(datos => datos.data);
  const { data, error, isLoading } = useSWR(`api/consultas?page=${paginaActual}`, fetcher);

  const handleRealizarHistorial = (consulta) => {
    localStorage.setItem('IDCONSULTA', consulta.idconsulta);
    navigate('/consultas/historial-medico')
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const handleBuscarConsulta = () => {
    // consultar la API
    if (terminoBusqueda != '') {
      clienteAxios.get(`api/consultas_paciente/${terminoBusqueda}`)
        .then((respuesta) => {
          setConsultas(respuesta.data.data);
        })
        .catch((error) => {
          handleErrorSweet('No se encontró ningún paciente con esa identificación');
        });
    } else {
      console.log(data.data);
      setConsultas(data.data);
    }


  };

  useEffect(() => {
    // handleTipoModal('citas');
    if (data && data.data) {
      setConsultas(data.data);
      setTotalDatos(data.total);
    }
  }, [data, error]);

  if (isLoading) return <Spinner />

  return (
    <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
      <div className="mb-4 mt-4">
        <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de consultas</h3>
      </div>
      <div>
        <input
          type="text"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          placeholder="Identificación pacientes..."
          className="p-2 border-gray-200 border rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button onClick={handleBuscarConsulta} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mt-5">
        {
          consultas.length === 0 ? (
            <div className="col-span-full text-center py-5 bg-white rounded-lg shadow">
              No hay ningún paciente aún
            </div>
          ) : (
            consultas.map((consulta) => {

              return (
                <div key={consulta.idconsulta} className={`flex flex-col rounded-lg overflow-hidden shadow-lg bg-white`}>
                  {/* Cabecera con datos del paciente */}
                  <div className="bg-blue-300 p-4">
                    <h2 className="font-bold text-xl mb-2">
                      <span className="mr-2 text-white bg-blue-500 px-2 py-1 rounded">Paciente</span>
                      {consulta.cita.paciente.nombre_paciente} {consulta.cita.paciente.apellidos_paciente}
                    </h2>
                    <p className="text-gray-700 text-base">Identificación: {consulta.cita.paciente.identificacion_paciente}</p>
                  </div>

                  {/* Cuerpo con motivo de la consulta y datos del cliente */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">Motivo de la consulta:</h3>
                    <p className="text-gray-700 text-base mb-4">{consulta.motivo_consulta}</p>

                    {/* <h3 className="font-bold text-lg mb-2">Datos del cliente:</h3>
                                        <p className="text-gray-700 text-base">Nombre: {consulta.cliente.nombre_cliente} {consulta.cliente.apellidos_cliente}</p>
                                        <p className="text-gray-700 text-base">Identificación: {consulta.cliente.identificacion_cliente}</p> */}
                  </div>

                  <div className="mt-auto bg-blue-300 p-4">
                    <p className="text-gray-700 text-base">Fecha de la consulta: <span className="font-bold">{(formatearFechaSinHora(consulta.fecha_consulta))}</span></p>
                    {/* Botones de acciones */}
                    {consulta.estado_consulta == 0 && (
                      <div className="flex pl-4 pr-4 pt-4 border-gray-200">
                        <button onClick={() => handleRealizarHistorial(consulta)} className="flex-1 text-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded">
                          Realizar Historial
                        </button>
                      </div>
                    )}
                    {consulta.estado_consulta == 1 && (
                      <div className="flex pl-4 pr-4 pt-4 border-gray-200">
                        <label className="flex-1 text-center bg-green-600 text-white font-bold py-1 px-3 rounded">
                          Consulta realizada
                        </label>
                      </div>
                    )}

                  </div>


                </div>
              );
            })
          )
        }
      </div>
      <Pagination
        totalItems={totalDatos}
        itemsPerPage={DatosPorPagina}
        currentPage={paginaActual}
        onPageChange={cambiarPagina}
      />
    </div>
  )
}
