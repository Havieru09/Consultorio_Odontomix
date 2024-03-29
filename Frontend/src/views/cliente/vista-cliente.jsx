
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'; // Importando íconos de Font Awesome
import useDental from "../../hooks/useDental";
import clienteAxios from "../../config/axios";
import useSWR from 'swr'
import Spinner from "../../components/Spinner";
import Pagination from '../../components/Pagination';

export default function Vistacliente() {

    const { handleClickModal, handleDatosActual, handleTipoModal, handleEliminarDatos, handleErrorSweet, setActualizarDatos } = useDental();
    const [clientes, setClientes] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalClientes, setTotalClientes] = useState(0);
    const clientesPorPagina = 10;
    const fetcher = () => clienteAxios(`api/clientes?page=${paginaActual}`).then(datos => datos.data)
    const { data, error, isLoading } = useSWR(`api/clientes?page=${paginaActual}`, fetcher)

    useEffect(() => {
        setActualizarDatos('');
        handleTipoModal('cliente');
        if (data && data.data) {
            setClientes(data.data);
            setTotalClientes(data.total);
        }
    }, [data, error]);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const handleEliminarCliente = (id) => {
        setActualizarDatos(`api/clientes?page=${paginaActual}`);
        handleEliminarDatos(id, 'api/clientes', "No podras recuperar la información!", true, false, `api/clientes?page=${paginaActual}`);
    };

    const handleEnviarDatos = (cliente) => {
        setActualizarDatos(`api/clientes?page=${paginaActual}`);
        handleDatosActual(cliente)
    };

        

    const handleBuscarCliente = () => {
        if (terminoBusqueda != '') {
            clienteAxios.get(`api/cliente/${terminoBusqueda}`)
                .then((respuesta) => {
                    if (respuesta.data.data != undefined) {
                        setClientes([respuesta.data.data])
                        setTotalClientes(1);
                    }
                })
                .catch((error) => {
                    handleErrorSweet('No se encontró ningún Cliente con esa identificación');
                });
        } else {
            console.log(data.data);
            setClientes(data.data);
        }
    };

    const handleAgregarCliente = () => {
        setActualizarDatos(`api/clientes?page=${paginaActual}`);
        handleClickModal();
    };

    if (isLoading) return <Spinner />

    return (
        <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Clientes</h3>
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <input
                        type="text"
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                        placeholder="Identificación Cliente..."
                        className="p-2 border-gray-200 border rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button onClick={handleBuscarCliente} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
                        <FaSearch />
                    </button>
                </div>
                <button onClick={handleAgregarCliente} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FaPlus className="mr-2" /> Agregar Cliente
                </button>
            </div>
            <table className="min-w-full leading-normal mb-5">
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
                                    <button onClick={(event) => handleEnviarDatos(cliente)} className="text-blue-500 hover:text-blue-700 mr-4">
                                        <FaEdit />
                                    </button>
                                    {/* <button onClick={(event) => handleEliminarDatos(cliente.idcliente, 'api/clientes')} className="text-red-500 hover:text-red-700"> */}
                                    <button onClick={(event) => handleEliminarCliente(cliente.idcliente)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
            <Pagination
                totalItems={totalClientes}
                itemsPerPage={clientesPorPagina}
                currentPage={paginaActual}
                onPageChange={cambiarPagina}
            />
        </div>
    )
}
