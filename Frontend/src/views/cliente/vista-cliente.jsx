
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importando íconos de Font Awesome
import useDental from "../../hooks/useDental";
import clienteAxios from "../../config/axios";
import useSWR from 'swr'
import Spinner from "../../components/Spinner";

export default function Vistacliente() {

    const { handleClickModal, handleDatosActual, handleTipoModal, handleEliminarDatos  } = useDental();
    const [clientes, setClientes] = useState([]);
    
    const fetcher = () => clienteAxios('api/clientes').then(datos => datos.data)
    const { data, error,isLoading } = useSWR('api/clientes', fetcher)

    useEffect(() => {
        handleTipoModal('cliente');
        if (data && data.data) {
            setClientes(data.data);
        }
    }, [data, error]);
    
    if (isLoading) return <Spinner />

    return (
        <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Clientes</h3>
            </div>
            <div className="flex justify-end mb-4">
                <button onClick={handleClickModal} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FaPlus className="mr-2" /> Agregar Cliente
                </button>
            </div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
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
                    {clientes.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                                No hay ningún paciente aún
                            </td>
                        </tr>
                    ) : (  

                    clientes.map(cliente => (
                    <tr key={cliente.idcliente}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                            {cliente.nombre_cliente} {cliente.apellidos_cliente}
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                            {cliente.identificacion_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                            {cliente.genero_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                            {cliente.edad_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                            {cliente.telefono_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                            {cliente.correo_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button onClick={(event) => handleDatosActual(cliente)} className="text-blue-500 hover:text-blue-700 mr-4">
                                <FaEdit />
                            </button>
                            <button onClick={(event) => handleEliminarDatos(cliente.idcliente, 'api/clientes')} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                    ) ))}
                </tbody>
            </table>
        </div>
    )
}
