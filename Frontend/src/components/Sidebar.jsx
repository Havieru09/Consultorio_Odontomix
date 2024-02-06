import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineCaretDown, AiOutlineCaretLeft, AiOutlineCaretUp, AiOutlineMenu } from 'react-icons/ai'
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';


export default function Sidebar() {
  const { logout, user } = useAuth({ middleware: 'auth' });
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('user', user);
    if (!localStorage.getItem('USUARIO')) {
      navigate('/auth/login');
    }
    setRol(localStorage.getItem('ROL'));
  }, [user, navigate]);

  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Nuevo estado para controlar la visibilidad
  const sidebarWidth = isSidebarVisible ? 'w-64 px-5' : 'w-0 px-0 border-r-0'; // Controlar la anchura del sidebar
  const sidebarTransition = 'transition-width duration-300'; // Añadir transición suave
  // const location = useLocation();


  const isPathActive = (path) => {
    return location.pathname.includes(path);
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);  // Si el menú ya está activo, lo cerramos.
    } else {
      setActiveMenu(menuName);
      setActiveSubMenu(null);  // Si no, abrimos el menú seleccionado.
    }
  };

  const handleEjecutarFuncion = (funcion) => {
    
    Swal.fire({
      title: 'Cerrar Sesión',
      text: 'Estas seguro de Cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        funcion();
      }
    })
  }

  const handleSubMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveSubMenu(null);  // Si el menú ya está activo, lo cerramos.
    } else {
      setActiveSubMenu(menuName);  // Si no, abrimos el menú seleccionado.
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className='h-auto flex'>

      <div className={`${sidebarWidth} ${sidebarTransition} space-y-6 py-7  bg-slate-800 text-white overflow-hidden`}>
        <Link to="/" className="text-xl font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-2">
          <img src="../../img/odontomixSinFondo.png" alt="Logotipo menu" />
        </Link>
        <ul>

          <li className={`mb-2 ${rol == 2 || rol == 1 ? '': 'hidden'}`}>
            <button onClick={() => handleMenuClick('crear')} className={`flex flex-1 items-center w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/vista') ? 'bg-cyan-600' : (activeMenu === 'crear' ? 'bg-cyan-600' : '')}`}>Clientes-Pacientes {activeMenu === 'crear' ? <AiOutlineCaretUp className='ml-9' /> : <AiOutlineCaretDown className='ml-9' />}</button>

            {(activeMenu === 'crear' && (
              <ul className="ml-5 space-y-2 mt-2 mb-3">
                <li onClick={() => handleSubMenuClick('vista-cliente')}><Link to="/cliente/vista-cliente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${isPathActive('/cliente') ? 'bg-indigo-500' : (activeSubMenu === 'vista-cliente' ? 'bg-indigo-500' : '')}`}>Lista de clientes</Link></li>
                <li onClick={() => handleSubMenuClick('')}><Link to="/paciente/vista-paciente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${isPathActive('/paciente') ? 'bg-indigo-500' : (activeSubMenu === 'crear-paciente' ? 'bg-indigo-500' : '')}`}>Lista de paciente</Link></li>
              </ul>
            ))}
          </li>

          <li className={`mb-2 ${rol == 2 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('citas')} to="/citas/lista-citas" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${activeMenu == 'citas' ? 'bg-cyan-600' : ''}`}>Citas
            </Link>
          </li>
          <li className={`mb-2 ${rol == 3 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('consultas')} to="/consultas/lista-consultas" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/consultas') ? 'bg-cyan-600' : ''}`}>
              Consultas
            </Link>
          </li>
          <li className={`mb-2 ${rol == 3 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('lista-historial')} to="/historial/lista-historial" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/lista-historial') ? 'bg-cyan-600' : ''}`}>
              Historial Médico
            </Link>
          </li>
          <li className={`mb-2 ${rol == 3 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('odontograma')} to="/odontograma/creacion-odontograma" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/odontograma') ? 'bg-cyan-600' : ''}`}>
              Odontograma
            </Link>
          </li>

          <li className={`mb-2 ${rol == 2 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('facturacion')} to="/factura/facturacion" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/facturacion') ? 'bg-cyan-600' : ''}`}>
              Facturación
            </Link>
          </li>
          <li className={`mb-2 ${rol == 2 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('enfermedades')} to="/enfermedades/lista-enfermedades" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/enfermedades') ? 'bg-cyan-600' : ''}`}>
              Enfermedades
            </Link>
          </li>
          <li className={`mb-2 ${rol == 3 || rol == 1 ? '': 'hidden'}`}>
            <Link onClick={() => handleMenuClick('condiciones')} to="/condiciones/lista-condiciones" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/condiciones') ? 'bg-cyan-600' : ''}`}>
              Condiciones Dentales
            </Link>
          </li>
          <li className={`mb-2 ${rol != 1 ? 'hidden': ''}`}>
            <Link onClick={() => handleMenuClick('/lista-user')} to="/usuarios/lista-user" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/lista-user') ? 'bg-cyan-600' : ''}`}>
              Usuarios
            </Link>
          </li>
          {/* logout */}
          <li className='mb-2'>
            <button onClick={() => handleEjecutarFuncion(logout)} className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-700 hover:text-white w-full text-start bg-red-600`}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
      <button onClick={toggleSidebar} className='p-2 text-white bg-slate-700'>
        {isSidebarVisible ? <AiOutlineCaretLeft /> : <AiOutlineMenu />}
      </button>

    </div>
  );
}

