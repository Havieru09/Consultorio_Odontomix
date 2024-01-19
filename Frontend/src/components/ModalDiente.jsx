import React, { useState, useEffect } from 'react'
import useDental from '../hooks/useDental';
import { FaTimes } from 'react-icons/fa';
import { PiTooth } from "react-icons/pi";
import useSWR from 'swr'
import clienteAxios from '../config/axios';
import { useNavigate } from "react-router-dom";
import MiniSpinner from './MiniSpiner';
export default function ModalDiente() {
  const navigate = useNavigate();
  const { handleErrorSweet, handleIngresarDatos, actualizar, handleEliminarDatos } = useDental();
  const fetcher = () => clienteAxios('api/tratamientos_dentales').then(datos => datos.data)
  const { data: tratamientosDatos, isLoading: isLodingTratamiento } = useSWR('api/tratamientos_dentales', fetcher)
  const fetchercondiones = () => clienteAxios('api/condiciones_dentales').then(datos => datos.data)
  const { data: condicionesDatos, isLoading: isLodingCondicion } = useSWR('api/condiciones_dentales', fetchercondiones)
  const { datosActual, handleClickModal, setActualizar, handleEditarDatos, dientes: datosDientes } = useDental();
  const tratamientos = tratamientosDatos?.data;
  const condiciones = condicionesDatos?.data;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCondicion, setSelectedCondicion] = useState('');
  const [seleccionador, setSeleccionador] = useState(false);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState([]);

  const { data: datosUbicaciones, isLoading: isLoadingUbicaciones } = useSWR('api/ubicacion_dental', () => clienteAxios('api/ubicacion_dental').then(res => res.data));

  // const { data: datosDientes, isLoading: isLoadingDientes } = useSWR(`api/dientes/${datosActual.idHistorial}`, () => clienteAxios('api/dientes').then(res => res.data));

  const handleCondicionChange = (condicion) => {
    setSelectedCondicion(condicion);
    setDropdownOpen(false);
  };

  const handleEnviarOdonto = (e) => {
    e.preventDefault();
    let dientesUsado = false;
    const data = new FormData(e.target);

    if (!data.get('tratamiento') || (selectedCondicion === '' && !datosActual.idcondicionesd)) {
      handleErrorSweet('Debe seleccionar un tratamiento y una condición');
      return;
    }

    console.log(datosActual);

    // console.log(datosDientes.data);
    // console.log(selectedCondicion ? selectedCondicion : datosActual.idcondicionesd);
    const condicionesPermitidas = [9, 10, 11];
    if (condicionesPermitidas.includes(selectedCondicion)) {
      // Verificar si ya existen condiciones en el mismo hemisferio
      const condicionExistente = datosDientes.find(diente =>
        diente.ubicacion_dental.idhemisferio_diente === datosActual.idhemisferio_diente &&
        condicionesPermitidas.includes(diente.idcondicionesd)
      );

      console.log(condicionExistente);
  
      // Si ya existe una condición y es diferente a la seleccionada o el tratamiento no coincide
      if (condicionExistente &&
        (condicionExistente.idcondicionesd !== selectedCondicion || condicionExistente.idtratamientos !== data.get('tratamiento'))) {
        handleErrorSweet('Este hemisferio ya tiene una condición registrada que no coincide con la seleccionada o el tratamiento es diferente.');
        return;
      }
    }

    // console.log(filtrarDatos);
    // if (hemisferioOcupado) {
    //   handleErrorSweet('Este diente ya tiene un registro');
    //   return;
    // }

    const datos = {
      iddiente: datosActual.idHistorial,
      idposiciond: datosActual.idposiciond,
      idubicaciond: datosActual.idubicacion,
      idcondicionesd: selectedCondicion ? selectedCondicion : datosActual.idcondicionesd,
      idtratamientos: data.get('tratamiento'),
      descripcion_diente: data.get('descripcion') != null || data.get('descripcion') != '' ? data.get('descripcion') : '',
      idhistorial: datosActual.idHistorial,
    }

    let ubicacionesConDatos = [];

    ubicacionesSeleccionadas.forEach(ubicacion => {
      const diente = datosDientes?.filter(d => d.idubicaciond === ubicacion && d.idposiciond === datosActual.idposiciond && d.iddiente === datosActual.idHistorial);
      if (diente.length > 0) {
        ubicacionesConDatos.push(diente[0]?.ubicacion_dental?.ubicacion_diente);
        dientesUsado = true;
      }
    });

    // console.log(dientesUsado && !datosActual?.datosDiente);
    if (dientesUsado && !datosActual?.datosDiente) {
      const ubicacionesString = ubicacionesConDatos.join(', ');
      handleErrorSweet(`Los dientes ${ubicacionesString} ya tiene registro registrado`);
      return;
    }

    ubicacionesSeleccionadas.forEach(ubicacion => {
      datos.idubicaciond = ubicacion;
      if (datosActual?.datosDiente) {

      } else {
        handleIngresarDatos(datos, 'api/dientes', false);
      }
    });

    if (datosActual?.datosDiente) {
      let idParaURL = `${datosActual.idHistorial}/${datosActual.idposiciond}/${datosActual.idubicacion}`;
      datos.idubicaciond = datosActual.idubicacion;
      handleEditarDatos(idParaURL, datos, 'api/dientes');
    }

    setTimeout(() => {
      setActualizar(!actualizar);
    }, 1500);


  }

  useEffect(() => {
    if (datosUbicaciones) {

      setSelectedCondicion(datosActual.idcondicionesd);
      setUbicaciones(datosUbicaciones.data);
      setUbicacionesSeleccionadas([datosActual.idubicacion]);
    }
  }, [datosUbicaciones]);

  const handleElimimarDiente = () => {
    const idParaURL = `${datosActual.idHistorial}/${datosActual.idposiciond}/${datosActual.idubicacion}`;
    handleEliminarDatos(idParaURL, 'api/dientes');
    setTimeout(() => {
      setActualizar(!actualizar);
    }, 1000);
    handleClickModal();
  };

  const obtenerDientesAdyacentes = (numDiente, ubicaciones) => {
    const numDienteInt = parseInt(numDiente);
    let adyacentes = [];
    const ubicacionAnterior = ubicaciones.find(ubicacion => ubicacion.ubicacion_diente === numDienteInt - 1);
    if (ubicacionAnterior) adyacentes.push(ubicacionAnterior.idubicaciond);
    const ubicacionSiguiente = ubicaciones.find(ubicacion => ubicacion.ubicacion_diente === numDienteInt + 1);
    if (ubicacionSiguiente) adyacentes.push(ubicacionSiguiente.idubicaciond);

    return adyacentes;
  };


  useEffect(() => {
    if ((selectedCondicion === 9 || selectedCondicion === 10 || selectedCondicion === 11) && datosActual.idposiciond === 5) {
      setSeleccionador(true);
      const adyacentes = obtenerDientesAdyacentes(datosActual.numDiente, datosUbicaciones.data);
      setUbicacionesSeleccionadas([datosActual.idubicacion, ...adyacentes]);
    } else {
      setSeleccionador(false);
      setUbicacionesSeleccionadas([datosActual.idubicacion]);
    }
  }, [selectedCondicion, datosActual.idposiciond, datosActual.numDiente, datosUbicaciones.data]);

  const obtenerRango = (numDiente) => {
    if (numDiente >= 11 && numDiente <= 18) return [18, 17, 16, 15, 14, 13, 12, 11];
    if (numDiente >= 51 && numDiente <= 55) return [51, 52, 53, 54, 55];
    if (numDiente >= 21 && numDiente <= 28) return [21, 22, 23, 24, 25, 26, 27, 28];
    if (numDiente >= 61 && numDiente <= 65) return [61, 62, 63, 64, 65];
    if (numDiente >= 81 && numDiente <= 85) return [85, 84, 83, 82, 81];
    if (numDiente >= 41 && numDiente <= 48) return [48, 47, 46, 45, 44, 43, 42, 41];
    if (numDiente >= 71 && numDiente <= 75) return [71, 72, 73, 74, 75];
    if (numDiente >= 31 && numDiente <= 38) return [31, 32, 33, 34, 35, 36, 37, 38];
  };

  const checkboxesDientes = () => {
    if (!seleccionador || !ubicaciones.length || datosActual?.datosDiente) return null;
    
    const rangoNumDientes = obtenerRango(datosActual.numDiente);
    
    if (!rangoNumDientes) return null;

    let rangoUbicaciones = ubicaciones.filter(ubicacion => rangoNumDientes.includes(ubicacion.ubicacion_diente));

    // console.log(rangoNumDientes);

    if (rangoUbicaciones.some(ubicacion => ubicacion.ubicacion_diente == 18 || ubicacion.ubicacion_diente == 55 || ubicacion.ubicacion_diente == 85 || ubicacion.ubicacion_diente == 48 )) {
      rangoUbicaciones.sort((a, b) => b.ubicacion_diente - a.ubicacion_diente);
    }

    return rangoUbicaciones.map(ubicacion => (
      <label key={ubicacion.idubicaciond} className={`flex flex-col justify-center items-center ${datosActual.idubicacion === ubicacion.idubicaciond ? 'border-b-2 text-center border-indigo-900' : ''}`}>
        <input
          className={`${datosActual.idubicacion === ubicacion.idubicaciond ? 'hidden' : ''}`}
          type="checkbox"
          value={ubicacion.idubicaciond}
          defaultChecked={ubicacionesSeleccionadas.includes(ubicacion.idubicaciond)}
          onChange={() => handleCheckboxChange(ubicacion.idubicaciond)}
        />
        {ubicacion.ubicacion_diente}
      </label>
    ));
  };


  const handleCheckboxChange = (idUbicacion) => {
    setUbicacionesSeleccionadas(prev => {
      if (prev.includes(idUbicacion)) {
        return prev.filter(item => item !== idUbicacion);
      } else {
        return [...prev, idUbicacion];
      }
    });
  };

  return (
    <div className='p-4 overflow-visible z-50'>

      <div>
        <button className="float-right focus:outline-none" onClick={handleClickModal}>
          <FaTimes size={24} />
        </button>
      </div>

      <form onSubmit={handleEnviarOdonto} className='z-40'>
        <div className="bg-white p-4 rounded grid grid-cols-2 gap-4">
          <div className='border-r flex items-center flex-col justify-center'>
            <h2 className="text-center text-2xl text-cyan-600 flex justify-center items-center gap-4"><PiTooth size={50} /> Diente #{datosActual.numDiente}</h2>
            <h2 className="text-center text-2xl text-cyan-600 flex justify-center items-center gap-4"><span className='font-bold '>Lado:</span> {datosActual.nombre_posiciond}</h2>
          </div>
          <div>
            <div className='mb-3'>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tratamientos: <span className="text-red-500">*</span>
                </label>
                {
                  isLodingTratamiento ? <MiniSpinner /> :
                    <select name="tratamiento" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={datosActual?.idtratamientos}>
                      <option value="">--Selecciona--</option>
                      {tratamientos.map(tratamiento => (
                        <option key={tratamiento.idtratamientosd} value={tratamiento.idtratamientosd}>{tratamiento.nombre_tratamiento}</option>
                      ))}
                    </select>
                }
              </div>
            </div>
            <div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripccion: <span>(OPCIONAL)</span>
                </label>
                <textarea
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  defaultValue={datosActual?.descripcion_diente}
                  name="descripcion"
                  rows="3"
                  placeholder="Descripción del tratamiento"
                ></textarea>
              </div>
            </div>
            <div>
              <div className='gap-4 mt-2 flex flex-col'>
                <label className="block text-gray-700 text-sm font-bold">
                  Condiciones: <span className="text-red-500">*</span>
                </label>
                {
                  isLodingCondicion ? <MiniSpinner /> :
                    <div className="relative w-full text-gray-700">
                      <div className="shadow border rounded w-full py-2 px-3 flex justify-between items-center text-gray-700 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <span>
                          {selectedCondicion ? condiciones.find(c => c.idcondicionesd === selectedCondicion).nombre_condicion : (datosActual?.idcondicionesd ? condiciones.find(c => c.idcondicionesd === datosActual?.idcondicionesd).nombre_condicion : '--Selecciona--')}
                        </span>
                        {(selectedCondicion || datosActual.idcondicionesd) && (
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: condiciones.find(c => c.idcondicionesd === (selectedCondicion ? selectedCondicion : datosActual?.idcondicionesd)).color_condicion }}>
                          </div>
                        )}
                      </div>
                      {dropdownOpen && (
                        <div className="absolute bg-white border mt-2 rounded w-full z-10 max-h-32 overflow-y-scroll">
                          {condiciones.map(condicion => (
                            <div
                              key={condicion.idcondicionesd}
                              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                              onClick={() => handleCondicionChange(condicion.idcondicionesd)}
                            >
                              <div className="h-4 w-4 mr-2 rounded-full" style={{ backgroundColor: condicion.color_condicion }}>
                              </div>
                              {condicion.nombre_condicion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                }
              </div>
            </div>
            <div>
              {seleccionador && datosActual?.idposiciond == 5 && !datosActual?.datosDiente && (
                <div className='gap-4 mt-2 flex flex-col'>
                  <label className="block text-gray-700 text-sm font-bold">
                    Dientes: <span className="text-red-500">*</span>
                  </label>
                  <div className='flex items-center justify-between'>
                    {checkboxesDientes()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex-1 flex justify-center gap-14 mt-8'>
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
            <span className="mr-2">{datosActual?.datosDiente ? 'Guardar Cambios' : 'Guardar'}</span>
          </button>
          {datosActual?.datosDiente && (
            <button onClick={() => handleElimimarDiente()} type="button" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
              <span className="mr-2">Eliminar</span>
            </button>
          )
          }
          <button type="button" onClick={handleClickModal} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
            <span className="mr-2">Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
