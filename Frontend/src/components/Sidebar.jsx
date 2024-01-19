import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
export default function Sidebar() {
  const location = useLocation();

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
  const handleSubMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveSubMenu(null);  // Si el menú ya está activo, lo cerramos.
    } else {
      setActiveSubMenu(menuName);  // Si no, abrimos el menú seleccionado.
    }
  };
  return (
    <div className={`w-64 space-y-6 py-7 px-5 border-r-4 bg-slate-800 text-white`}>
      <Link to="/" className="text-xl font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-2">
        <img src="../../img/odontomixSinFondo.png" alt="Logotipo menu" />
      </Link>
      <ul>
        <li className='mb-2'>
          <button onClick={() => handleMenuClick('crear')} className={`flex flex-1 items-center w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/vista') ? 'bg-cyan-600' : (activeMenu === 'crear' ? 'bg-cyan-600' : '')}`}>Clientes-Pacientes {activeMenu === 'crear' ? <AiOutlineCaretUp className='ml-9' /> : <AiOutlineCaretDown className='ml-9' />}</button>

          {(activeMenu === 'crear' && (
            <ul className="ml-5 space-y-2 mt-2 mb-3">
              <li onClick={() => handleSubMenuClick('vista-cliente')}><Link to="/cliente/vista-cliente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${isPathActive('/cliente') ? 'bg-indigo-500' : (activeSubMenu === 'vista-cliente' ? 'bg-indigo-500' : '')}`}>Lista de clientes</Link></li>
              <li onClick={() => handleSubMenuClick('')}><Link to="/paciente/vista-paciente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${isPathActive('/paciente') ? 'bg-indigo-500' : (activeSubMenu === 'crear-paciente' ? 'bg-indigo-500' : '')}`}>Lista de paciente</Link></li>
            </ul>
          ))}
        </li>

        <li className='mb-2'>
          <Link onClick={() => handleMenuClick('citas')} to="/citas/lista-citas" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${activeMenu == 'citas' ? 'bg-cyan-600' : ''}`}>Citas
          </Link>
        </li>
        <li className='mb-2'>
          <Link onClick={() => handleMenuClick('consultas')} to="/consultas/lista-consultas" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/consultas') ? 'bg-cyan-600' : ''}`}>
            Consultas
          </Link>
        </li>
        <li className='mb-2'>
          <Link onClick={() => handleMenuClick('lista-historial')} to="/historial/lista-historial" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/lista-historial') ? 'bg-cyan-600' : ''}`}>
            Historial Médico
          </Link>
        </li>
        <li className='mb-2'>
          <Link onClick={() => handleMenuClick('odontograma')} to="/odontograma/creacion-odontograma" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/odontograma') ? 'bg-cyan-600' : ''}`}>
            Odontograma
          </Link>
        </li>
        
        <li className='mb-2'>
          <Link onClick={() => handleMenuClick('facturacion')} to="/factura/facturacion" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/facturacion') ? 'bg-cyan-600' : ''}`}>
            Facturación
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

