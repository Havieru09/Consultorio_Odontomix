import { createRef, useEffect, useState } from "react";
import useDental from "../hooks/useDental";
import clienteAxios from "../config/axios";
import useSWR from 'swr';
import { FaTimes } from "react-icons/fa";
import { formatearFechaSinHora, formatearHora } from "../helpers";

export default function CitasModal() {
  const { handleTipoModal, handleClickModal, handleIngresarDatos, datosActual, handleEditarDatos, handleEnvioMail } = useDental();
  const [clientes, setClientes] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [inputCliente, setInputCliente] = useState('');
  const [inputPaciente, setInputPaciente] = useState('');
  const [errores, setErrores] = useState({});
  const [noExisteCliente, setNoExisteCliente] = useState(false);
  const [noExistePaciente, setNoExistePaciente] = useState(false);
  const concepto_cita = createRef();
  const fecha = createRef();
  const hora = createRef();

  const fetcherCliente = () => clienteAxios('api/clientes').then(datos => datos.data);
  const { data: dataCliente } = useSWR('api/clientes', fetcherCliente);

  const fetcherPaciente = () => clienteAxios('api/pacientes').then(datos => datos.data);
  const { data: dataPaciente } = useSWR('api/pacientes', fetcherPaciente);

  const handleClienteChange = (e) => {
    setInputCliente(e.target.value);
  };

  const handlePacienteChange = (e) => {
    setInputPaciente(e.target.value);
  };

  
  const validarCampos = () => {
    let erroresTemp = {};

    if (!inputCliente) erroresTemp.inputCliente = true;
    if (!inputPaciente) erroresTemp.inputPaciente = true;
    if (!concepto_cita.current.value) erroresTemp.concepto_cita = true;
    if (!fecha.current.value) erroresTemp.fecha = true;
    if (!hora.current.value) erroresTemp.hora = true;

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0; // Retorna true si no hay errores
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      
      const idCliente = clientes.find(cliente => cliente.identificacion_cliente === inputCliente)?.idcliente;
      const idPaciente = pacientes.find(paciente => paciente.identificacion_paciente === inputPaciente)?.idpaciente;

      if (!idCliente) {
        setNoExisteCliente(true);
        return;
      }else{
        setNoExisteCliente(false);
      }

      if (!idPaciente) {
        setNoExistePaciente(true);
        return;
      }else{
        setNoExisteCliente(false);
      }

      const data = {
        idcliente: idCliente,
        idpaciente: idPaciente,
        concepto_cita: concepto_cita.current.value,
        fechahora_cita: fecha.current.value + ' ' + hora.current.value,
        estado_cita: 0
      };
      console.log(data);
      if (datosActual.idcita != null) {
        handleEditarDatos(datosActual.idcita, data, 'api/citas');
      } else {        
        handleIngresarDatos(data, 'api/citas');
        handleEnvioMail(data);
      }
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  useEffect(() => {
    handleTipoModal('citas');
    if (dataCliente && dataCliente.data) {
      setClientes(dataCliente.data);
    }
    if (dataPaciente && dataPaciente.data) {
      setPacientes(dataPaciente.data);
    }

    // Si datosActual tiene datos, actualiza el estado de los inputs
    if (datosActual && datosActual.cliente) {
      setInputCliente(datosActual.cliente.identificacion_cliente);
    }
    if (datosActual && datosActual.paciente) {
      setInputPaciente(datosActual.paciente.identificacion_paciente);
    }
  }, [dataCliente, dataPaciente, datosActual]);

  return (
    <div className="p-4">
      <div>
        <button className="float-right focus:outline-none" onClick={handleClickModal}>
          <FaTimes />
        </button>
      </div>
      <h2 className="text-center mb-4 text-xl font-bold">Crear Cita</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded grid grid-cols-2 gap-4">
        {/* Input de Cliente */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha de la cita: <span className="text-red-500">*</span>
          </label>
          <input
            ref={fecha}
            defaultValue={
              datosActual.fechahora_cita
                ? formatearFechaSinHora(datosActual.fechahora_cita, false)
                : ''
            }
            type="date"
            className={`shadow appearance-none border ${errores.fecha ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />

        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hora de la cita: <span className="text-red-500">*</span>
          </label>
          <select
            ref={hora}
            defaultValue={datosActual.fechahora_cita ? (formatearHora(datosActual.fechahora_cita)) : ''}
            className={`shadow appearance-none border ${errores.hora ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          >
            {generateTimeOptions().map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Identificación Cliente: <span className="text-red-500">*</span>
          </label>
          <input
            list="clientes"
            placeholder="Escribe la identificación del cliente"
            defaultValue={inputCliente}
            onChange={handleClienteChange}
            className={`shadow appearance-none border ${errores.inputCliente || noExisteCliente ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {noExisteCliente && (
            <p className="text-red-500 text-xs italic">
              El cliente no existe, por favor ingrese un cliente válido
            </p>
          )}
          <datalist id="clientes">
            {clientes.map(cliente => (
              <option key={cliente.idcliente} value={cliente.identificacion_cliente}>
                {cliente.identificacion_cliente} - {cliente.nombre_cliente} {cliente.apellidos_cliente}
              </option>
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Identificación Paciente: <span className="text-red-500">*</span>
          </label>
          <input
            list="pacientes"
            defaultValue={datosActual.idpaciente ? datosActual.paciente.identificacion_paciente : ''}
            placeholder="Escribe la identificación del paciente"
            onChange={handlePacienteChange}
            className={`shadow appearance-none border ${errores.inputPaciente || noExistePaciente ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {noExistePaciente && (
            <p className="text-red-500 text-xs italic">
              El paciente no existe, por favor ingrese un paciente válido
            </p>
          )}
          <datalist id="pacientes">
            {pacientes.map(paciente => (
              <option key={paciente.idpaciente} value={paciente.identificacion_paciente}>
                {paciente.identificacion_paciente} - {paciente.nombre_paciente} {paciente.apellidos_paciente}
              </option>
            ))}
          </datalist>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Motivo de cita: <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Escribe el motivo de la cita"
            defaultValue={datosActual.concepto_cita ? datosActual.concepto_cita : ''}
            ref={concepto_cita}
            className={`shadow appearance-none border ${errores.concepto_cita ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 focus:outline-none focus:bg-slate-900">
          {datosActual.idcita ? 'Actualizar Cita' : 'Crear Cita'}
          </button>
        </div>
      </form>
    </div>
  );
}
