import { useEffect, useState } from "react";
import useSWR from "swr";
import clienteAxios from "../../config/axios";
import Spinner from "../../components/Spinner";
import { PiToothDuotone } from "react-icons/pi";
import { BsClipboard2Plus } from "react-icons/bs";
//navegate
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Historial_medico() {
    const [historial_medicos, setHistorial_medico] = useState([]);
    const fetcher = () => clienteAxios('api/historial_medico').then(datos => datos.data)
    const { data, isLoading } = useSWR('api/historial_medico', fetcher)

    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.data) {
            setHistorial_medico(data.data);
        }
    }, [data]);

    if (isLoading) return <Spinner />

    const handelEnviarAhistorial = (historial_medico) => {
        localStorage.setItem('IDHISTORIAL', historial_medico);
        navigate('/historial/historial-completo')
    }

    const handleEnvioOdontograma = (historial_medico) => {
        // localStorage.setItem('IDHISTORIAL', historial_medico.idhistorial);
        navigate(`/odontograma/creacion-odontograma/${historial_medico}`)
    }
    return (
        <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Historial medico</h3>
            </div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                            Numero ficha
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
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

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {historial_medicos.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                                No hay ningún paciente aún
                            </td>
                        </tr>
                    ) : (

                        historial_medicos.map(historial_medico => (
                            <tr key={historial_medico.idhistorial}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                                    {historial_medico.numero_ficha}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                                    {historial_medico.consulta.cita.paciente.nombre_paciente} {historial_medico.consulta.cita.paciente.apellidos_paciente}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                                    {historial_medico.consulta.cita.paciente.identificacion_paciente}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                                    {historial_medico.consulta.cita.paciente.genero_paciente}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                                    {historial_medico.consulta.cita.paciente.edad_paciente}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button onClick={()=>handelEnviarAhistorial(historial_medico.numero_ficha)} className="text-red-500 hover:text-red-700 mr-4">
                                        <BsClipboard2Plus size={24} />
                                    </button>
                                    <button onClick={() => handleEnvioOdontograma(historial_medico.numero_ficha)} className="text-blue-500 hover:text-blue-700">
                                        <PiToothDuotone size={24} />
                                    </button>

                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div>
    )
}
