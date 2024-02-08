import { useEffect, useState } from "react";
import useSWR from "swr";
import clienteAxios from "../../config/axios";
import Spinner from "../../components/Spinner";
import { PiToothDuotone } from "react-icons/pi";
import { BsClipboard2Plus } from "react-icons/bs";
//navegate
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import useDental from "../../hooks/useDental";

export default function Historial_medico() {
    const { handleErrorSweet } = useDental();
    const [terminoBusqueda, setTerminoBusqueda] = useState('')
    const navigate = useNavigate();
    const [totalDatos, setTotalDatos] = useState(0);
    const DatosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);
    const [historial_medicos, setHistorial_medico] = useState([]);
    const fetcher = () => clienteAxios(`api/historial_medico?page=${paginaActual}`).then(datos => datos.data)
    const { data, isLoading } = useSWR(`api/historial_medico?page=${paginaActual}`, fetcher)

    useEffect(() => {
        if (data && data.data) {
            setHistorial_medico(data.data);
            setTotalDatos(data.total);
        }
    }, [data]);

    if (isLoading) return <Spinner />

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const handleBuscarHistorial = () => {
        if (terminoBusqueda != '') {
            clienteAxios.get(`api/historial_medico_paciente/${terminoBusqueda}`)
            .then((respuesta) => {
                console.log(respuesta.data.data);
                setHistorial_medico(respuesta.data.data);
            })
            .catch((error) => {
                handleErrorSweet('No se encontró ningún paciente con esa identificación');
            });
        }else{
            
            setHistorial_medico(data.data);
        }
    };

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
            <div>
                <input
                    type="text"
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    placeholder="Identificación Paciente..."
                    className="p-2 border-gray-200 border rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button onClick={handleBuscarHistorial} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
                    <FaSearch />
                </button>
            </div>
            <table className="min-w-full leading-normal mt-5 mb-5">
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
                                    <button onClick={() => handelEnviarAhistorial(historial_medico.numero_ficha)} className="text-red-500 hover:text-red-700 mr-4">
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
            <Pagination
                totalItems={totalDatos}
                itemsPerPage={DatosPorPagina}
                currentPage={paginaActual}
                onPageChange={cambiarPagina}
            />
        </div>
    )
}
