import {createBrowserRouter} from 'react-router-dom';
// importar layouts
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Vistacliente from './views/cliente/vista-cliente';
import VistaPaciente from './views/paciente/vista-paciente';
import VistaCitas from './views/citas/vista-citas';
import VistaConsultas from './views/consulta/vista-consultas';
import Odontograma from './views/odontograma/Odontograma';
import FormularioHistorialM from './views/consulta/formulario-historialM';
import Historial_medico from './views/historial_medico/Historial_medico';
import Historial_completo from './views/historial_medico/Historial_completo';
import Vistafactura from './views/facturacion/vista-factura';
import Facturacion from './views/facturacion/facturacion';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />,
            },
            
            {
                path: '/listar-cliente',
                element: <Vistacliente />,
            },
        ],
    },
    // Clientes
    {
        path: '/cliente',
        element: <Layout />,
        children: [            
            {
                path: '/cliente/vista-cliente',
                element: <Vistacliente />,
            },
        ],
    },
    {
        path: '/paciente',
        element: <Layout />,
        children: [            
            {
                path: '/paciente/vista-paciente',
                element: <VistaPaciente />,
            },
        ],
    },
    // Citas
    {
        path: '/citas',
        element: <Layout />,
        children: [
            {
                path: '/citas/lista-citas',
                element: <VistaCitas />,
            },
        ],
    },
    // Auth
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',        
                element: <Login />,
            }
        ]
    },
    // Consultas
    {
        path: '/consultas',
        element: <Layout />,
        children: [
            {
                path: '/consultas/lista-consultas',
                element: <VistaConsultas />,
            },
            {
                path: '/consultas/historial-medico',
                element: <FormularioHistorialM />,
            },
        ],
    },

    // Historial
    {
        path: '/historial',
        element: <Layout />,
        children: [
            {
                path: '/historial/lista-historial',
                element: <Historial_medico />,
            },
            {
                path: '/historial/historial-completo/',
                element: <Historial_completo />,
            }
        ],
    },


    // Odontograma
    {
        path: '/odontograma',
        element: <Layout />,
        children: [
            {
                path: '/odontograma/creacion-odontograma',
                element: <Odontograma />,
            },
            {
                path: '/odontograma/creacion-odontograma/:idHistorial',
                element: <Odontograma />,
            },
        ],
    },

    // Factura
    {
        path: '/factura',
        element: <Layout />,
        children: [
            {
                path: '/factura/lista-factura',
                element: <Vistafactura />,
            },
            {
                path: '/factura/facturacion',
                element: <Facturacion />,
            }
        ],
    },
]);

export default router;