import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal'
import Sidebar from "../components/Sidebar";
import useDental from "../hooks/useDental";
import ClienteModal from "../components/ClienteModal";
import "react-toastify/dist/ReactToastify.css";
import 'sweetalert2/src/sweetalert2.scss'
import PacienteModal from "../components/PacienteModal";
import CitasModal from "../components/CitasModal";
import ModalDiente from "../components/ModalDiente";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    zIndex: '9999',    
  },
};

Modal.setAppElement('#root');

export default function Layout() {
  const { modal, tipoModal } = useDental();
  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 bg-gray-200 overflow-y-auto max-h-screen">
          <Outlet />
        </div>
      </div>
      <Modal isOpen={modal} style={customStyles} >
        {tipoModal == 'cliente' ? <ClienteModal /> : null}
        {tipoModal == 'paciente' ? <PacienteModal /> : null}
        {tipoModal == 'citas' ? <CitasModal /> : null}
        {tipoModal == 'odontograma' ? <ModalDiente /> : null}
      </Modal>
      <ToastContainer />
    </>
  )
}

