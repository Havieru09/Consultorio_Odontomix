import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import useSWR from 'swr';
import Spinner from "../../components/Spinner";
import useDental from "../../hooks/useDental";
import { formatearFechaSinHora, formatearHora } from "../../helpers";
import { FaPlus } from "react-icons/fa";

export default function VistaCitas() {
    const { handleTipoModal, handleClickModal, handleDatosActual, handleCompletarCita, handleEliminarDatos } = useDental();
    const [citas, setCitas] = useState([]);

    const fetcher = () => clienteAxios('api/citas').then(datos => datos.data);
    const { data, error, isLoading, mutate } = useSWR('api/citas', fetcher);

    useEffect(() => {
        handleTipoModal('citas');
        if (data && data.data) {
            setCitas(data.data);
        }
    }, [data, error]);


    const handleEliminarCita = (id) => {
        handleEliminarDatos(id, 'api/citas');
    };


    if (isLoading) return <Spinner />
    // console.log(citas);
    return (
        <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Citas</h3>
            </div>
            <div className="flex justify-end mb-4">
                <button onClick={handleClickModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FaPlus className="mr-2" /> Agregar Cita
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    citas.length === 0 ? (
                        <div className="col-span-full text-center py-5 bg-white rounded-lg shadow">
                            No hay ningún paciente aún
                        </div>
                    ) : (
                        citas.map((cita) => {
                            const isPending = cita.estado_cita === 0;
                            return (
                                <div key={cita.idcita} className={`flex flex-col rounded-lg overflow-hidden shadow-lg ${isPending ? 'bg-white' : 'bg-green-300'}`}>
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
                                            <button onClick={(event) => handleDatosActual(cita)} className={`${isPending ? '' : 'hidden'} bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded`}>
                                                Editar
                                            </button>
                                            <button onClick={() => handleCompletarCita(cita.idcita, 'api/citas', cita)}
                                                className={`${isPending ? 'bg-green-500' : 'bg-indigo-500'} hover:${isPending ? 'bg-green-700' : 'bg-indigo-600'} text-white font-bold py-1 px-3 rounded ${isPending ? '' : 'hidden'}`}
                                            >
                                                {isPending ? 'Completar' : 'Ver consulta'}
                                            </button>
                                            <button onClick={()=>handleEliminarCita(cita.idcita)} className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded ${isPending ? '' : 'hidden'}`}>
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
        </div>
    );

}
