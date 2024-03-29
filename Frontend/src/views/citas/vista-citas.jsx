import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import useSWR from 'swr';
import Spinner from "../../components/Spinner";
import useDental from "../../hooks/useDental";
import { formatearFechaSinHora, formatearHora } from "../../helpers";
import { FaPlus, FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination";

export default function VistaCitas() {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const { handleTipoModal, handleClickModal, handleDatosActual, handleCompletarCita, handleEliminarDatos, handleErrorSweet,setActualizarDatos } = useDental();
    const [citas, setCitas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalDatos, setTotalDatos] = useState(0);
    const DatosPorPagina = 6;
    const fetcher = () => clienteAxios(`api/citas?page=${paginaActual}`).then(datos => datos.data);
    const { data, error, isLoading } = useSWR(`api/citas?page=${paginaActual}`, fetcher);

    useEffect(() => {
        setActualizarDatos('');
        handleTipoModal('citas');
        if (data && data.data) {
            setCitas(data.data);
            setTotalDatos(data.total);
        }
    }, [data, error]);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const handleBuscarCita = () => {
        if (terminoBusqueda != '') {
            clienteAxios.get(`api/citas_paciente/${terminoBusqueda}`)
                .then((respuesta) => {
                    setCitas(respuesta.data.data);
                })
                .catch((error) => {
                    handleErrorSweet('No se encontró ningún paciente con esa identificación');
                });
        } else {
            console.log(data.data);
            setCitas(data.data);
        }
    };


    const handleEliminarCita = (id) => {
        setActualizarDatos(`api/citas?page=${paginaActual}`);
        handleEliminarDatos(id, 'api/citas', "No podras recuperar la información!", true, false, `api/citas?page=${paginaActual}`);        
    };

    const handleEnviarDatos = (cita) => {
        setActualizarDatos(`api/citas?page=${paginaActual}`);
        handleDatosActual(cita)
    };

    const handleAgregarCitas = () => {
        setActualizarDatos(`api/citas?page=${paginaActual}`);
        handleClickModal();
    };


    if (isLoading) return <Spinner />

    return (
        <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Citas</h3>
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <input
                        type="text"
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                        placeholder="Identificación pacientes..."
                        className="p-2 border-gray-200 border rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button onClick={handleBuscarCita} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
                        <FaSearch />
                    </button>
                </div>
                <button onClick={handleAgregarCitas} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FaPlus className="mr-2" /> Agregar Cita
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {
                    citas.length === 0 ? (
                        <div className="col-span-full text-center py-5 bg-white rounded-lg shadow">
                            No hay ningún paciente aún
                        </div>
                    ) : (
                        citas.map((cita) => {
                            const cardBgColor = cita.estado_cita === 0 ? '' :
                                cita.estado_cita === 1 ? 'bg-green-300' :
                                    'bg-red-300';
                            const isPending = cita.estado_cita === 0;
                            const isCancelled = cita.estado_cita === 2;
                            return (
                                <div key={cita.idcita} className={`flex flex-col rounded-lg overflow-hidden shadow-lg ${cardBgColor}`}>
                                    {/* Cabecera con datos del paciente */}
                                    <div className="bg-blue-300 p-4">
                                        <h2 className="font-bold text-xl mb-2">
                                            <span className="mr-2 text-white bg-blue-500 px-2 py-1 rounded">Paciente</span>
                                            {cita.paciente.nombre_paciente} {cita.paciente.apellidos_paciente}
                                        </h2>
                                        <p className="text-gray-700 text-base">Identificación: {cita.paciente.identificacion_paciente}</p>
                                    </div>

                                    {/* Cuerpo con motivo de la cita y datos del cliente */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2">Motivo de la cita:</h3>
                                        <p className="text-gray-700 text-base mb-4">{cita.concepto_cita}</p>
                                    </div>

                                    <div className="mt-auto bg-blue-300 p-4">
                                        <p className="text-gray-700 text-base">Fecha de la cita: <span className="font-bold">{(formatearFechaSinHora(cita.fechahora_cita) + ' a las: ' + formatearHora(cita.fechahora_cita))}</span></p>
                                        <div className="flex justify-between pl-4 pr-4 pt-4 border-gray-200">
                                            {/* Muestra el botón Editar solo si la cita está pendiente o cancelada */}
                                            <button onClick={(event) => handleEnviarDatos(cita)} className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded ${isPending || isCancelled ? '' : 'hidden'}`}>
                                                Editar
                                            </button>
                                            {/* Muestra el botón Completar solo si la cita está pendiente */}
                                            <button onClick={() => handleCompletarCita(cita.idcita, 'api/citas', cita, `api/citas?page=${paginaActual}`)}
                                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded ${isPending ? '' : 'hidden'}`}
                                            >
                                                Completar
                                            </button>
                                            {/* Muestra el botón Eliminar solo si la cita está pendiente o cancelada */}
                                            <button onClick={() => handleEliminarCita(cita.idcita)} className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded ${isPending || isCancelled ? '' : 'hidden'}`}>
                                                Eliminar
                                            </button>
                                        </div>
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
    );

}
