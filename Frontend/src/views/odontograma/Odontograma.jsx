import React, { useEffect, useState } from 'react'
import { MdOutlineContentPasteSearch, MdSouth } from "react-icons/md";
import Diente from './Diente';
import useSWR, { mutate } from 'swr'
import clienteAxios from "../../config/axios";
import Spinner from '../../components/Spinner';
import { FaSearch } from "react-icons/fa";
import useDental from '../../hooks/useDental';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function odontograma() {
    const { handleTipoModal, handleDientes, actualizar, actualizarId, handleErrorSweet, dientes: dientesUse, handleIngresarDatos, handleEditarDatos } = useDental();
    const { idHistorial } = useParams();

    const navigate = useNavigate();
    const [datosId, setDatosId] = useState({});
    const [odontograma, setOdontograma] = useState(null);
    const [consultarAPI, setConsultarAPI] = useState(true);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
    const [noExistePaciente, setNoExistePaciente] = useState(false);

    const fetcherHisto = url => clienteAxios(url).then(res => res.data);

    const { data: datosHistorial, isLoading: isLoadingDatosHistorial, error } = useSWR(consultarAPI && idHistorial ? `api/historial_medico/${idHistorial}` : null, fetcherHisto);


    const { data: dataPaciente, error: errorPaciente, isLoading: isLoadingPaciente } = useSWR('api/pacientes', url => clienteAxios(url).then(res => res.data));


    const handlePacienteChange = (e) => {
        const identificacion = e.target.value;
        setPacienteSeleccionado(identificacion);

        const pacienteExiste = dataPaciente?.data.some(paciente => paciente.identificacion_paciente === identificacion);
        setNoExistePaciente(!pacienteExiste);
    };

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        
        window.scrollTo(0, 0);

        html2canvas(input, {
            scale: 1.5,
            windowHeight: input.scrollHeight,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'letter');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 1.5;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            let heightLeft = pdfHeight;
            
            let position = -10; // Prueba con diferentes valores si es necesario

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight - 10;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save('download.pdf');
        });
    };



    const fetcher = () => clienteAxios('api/ubicacion_dental').then(datos => datos.data)
    const { data: Datosdientes, isLoading } = useSWR('api/ubicacion_dental', fetcher)

    const dientes = Datosdientes?.data || null;

    const funcionDeclaramiento = () => {

        if (!dientes || dientes.length === 0) {
            return <p>No hay dientes para mostrar.</p>; // Devuelve un mensaje o componente vacío
        }

        const renderizarDientes = (rangoInicio, rangoFin) => {
            let dientesFiltrados = dientes
                .filter(diente => diente.ubicacion_diente >= Math.min(rangoInicio, rangoFin) && diente.ubicacion_diente <= Math.max(rangoInicio, rangoFin));
            if (rangoInicio > rangoFin) {
                dientesFiltrados = dientesFiltrados.sort((a, b) => b.ubicacion_diente - a.ubicacion_diente);
            } else {
                dientesFiltrados = dientesFiltrados.sort((a, b) => a.ubicacion_diente - b.ubicacion_diente);
            }

            return dientesFiltrados.map(diente => (
                <Diente
                    key={diente.idubicaciond}
                    numero={diente.ubicacion_diente}
                    idHistorial={datosId}
                    idubicacion={diente.idubicaciond}
                    nombre_diente={diente.nombre_diente}
                    numeroFicha={idHistorial}
                    idhemisferio_diente={diente.idhemisferio_diente}
                    estado_historial={datosHistorial?.data?.estado_historial}
                />
            ));
        };

        return (
            <div className="flex flex-wrap justify-around mt-2">
                <div className="flex flex-col">
                    <div className="flex justify-center mb-2">{renderizarDientes(18, 11)}</div>
                    <div className="flex justify-end md:justify-center">{renderizarDientes(55, 51)}</div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-center mb-2">{renderizarDientes(21, 28)}</div>
                    <div className="flex justify-start md:justify-center">{renderizarDientes(61, 65)}</div>
                </div>
                <div className="flex flex-col">
                    <div className="flex  justify-end mb-2 md:justify-center">{renderizarDientes(85, 81)}</div>
                    <div className="flex justify-center">{renderizarDientes(48, 41)}</div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-start mb-2 md:justify-center">{renderizarDientes(71, 75)}</div>
                    <div className="flex justify-center ">{renderizarDientes(31, 38)}</div>
                </div>
            </div>
        );
    }



    useEffect(() => {
        handleTipoModal('odontograma');
        if (datosHistorial && datosHistorial.data && datosHistorial.data.idhistorial) {
            setDatosId(datosHistorial.data.idhistorial);
            handleDientes(datosHistorial.data.idhistorial, 'api/dientes');
            setOdontograma(funcionDeclaramiento());
        } else if (error) {
            setConsultarAPI(false);
        }
    }, [datosHistorial, isLoading, actualizar, actualizarId, datosId, isLoadingDatosHistorial, pacienteSeleccionado]);

    const datosPaciente = datosHistorial?.data?.paciente;

    if (isLoading || isLoadingDatosHistorial || isLoadingPaciente) return <Spinner />

    const handleBuscaNumero = (e) => {
        e.preventDefault();
        const idPaciente = dataPaciente.data.find(paciente => paciente.identificacion_paciente === pacienteSeleccionado)?.idpaciente;
        if (dataPaciente && idPaciente) {
            clienteAxios.get(`api/historial_medico2/${idPaciente}`).then(res => {
                if (res.data.data) {
                    navigate(`/odontograma/creacion-odontograma/${res.data.data.numero_ficha}`);
                } else {
                    navigate(`/odontograma/creacion-odontograma/${idPaciente}`);
                }
            }).catch(err => {
                handleErrorSweet(err?.response?.data?.errors);
            })
        }
    }

    const handleGuardarOdontograma = (e) => {
        e.preventDefault();
        if (dientesUse.length > 0) {
            const datos = {
                idhistorial: datosHistorial?.data?.idhistorial,
                iddiente: datosHistorial?.data?.idhistorial,
                estado_odontograma: 1
            }
            console.log(datos);
            handleIngresarDatos(datos, 'api/odontograma', false, true, false);
            
            handleEditarDatos(datosHistorial?.data?.idhistorial, {estado_historial: 1}, 'api/historial_medico', false, false);
            navigate(`/historial/lista-historial`);
            // window.location.href = `/historial/lista-historial`;
        }else{
            handleErrorSweet('Debe ingresar al menos un diente');
        }
    }


    return (
        <div className='mt-5'>
            <div className="flex justify-center items-center gap-4">
                <div className="flex items-center gap-4">
                    <MdOutlineContentPasteSearch size={24} />
                    <input
                        list="pacientes"
                        value={pacienteSeleccionado}
                        placeholder="Escribe la identificación del paciente"
                        onChange={handlePacienteChange}
                        className={`shadow appearance-none border ${noExistePaciente ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    {noExistePaciente && (
                        <p className="text-red-500 text-xs italic">
                            El paciente no existe, por favor ingrese un paciente válido
                        </p>
                    )}
                    <datalist id="pacientes">
                        {dataPaciente.data?.map(paciente => (
                            <option key={paciente.idpaciente} value={paciente.identificacion_paciente}>
                                {paciente.identificacion_paciente} - {paciente.nombre_paciente} {paciente.apellidos_paciente}
                            </option>
                        ))}
                    </datalist>
                </div>
                {/* boton de buscar */}
                <div>
                    <button onClick={handleBuscaNumero} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className='w-full flex flex-col justify-between p-4 mt-4 md:flex-row'>{/* bg-slate-300 */}
                <div className='w-1/2'>
                    <h2 className='font-bold'>Nombre: <span className='font-normal'>{(datosPaciente?.nombre_paciente ? datosPaciente.nombre_paciente : 'Sin datos') + " " + (datosPaciente?.apellidos_paciente ? datosPaciente.apellidos_paciente : '')}</span></h2>
                </div>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Identificación: <span className='font-normal'>{datosPaciente?.identificacion_paciente ? datosPaciente?.identificacion_paciente : 'Sin datos'}</span></h2>
                </div>
            </div>

            <div className='w-full flex flex-col   justify-between p-4 md:flex-row'>{/* bg-slate-300 */}
                <div className='w-1/2'>
                    <h2 className='font-bold'>Edad: <span className='font-normal'>{datosPaciente?.edad_paciente ? datosPaciente?.edad_paciente : 'Sin datos'}</span></h2>
                </div>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Genero: <span className='font-normal'>{datosPaciente?.genero_paciente == 'M' ? 'Masculino' : (datosPaciente?.genero_paciente == 'F' ? 'Femenino' : 'Sin Datos')}</span></h2>
                </div>
            </div>
            <div className='w-full flex flex-col justify-between p-4 md:flex-row'>{/* bg-slate-300 */}
                <div className='w-1/2'>
                    <h2 className='font-bold '>Altura: <span className='font-normal'>{datosPaciente?.altura_paciente ? datosPaciente?.altura_paciente + ' M' : 'Sin datos'}</span></h2>
                </div>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Peso: <span className='font-normal'>{datosPaciente?.peso_paciente ? datosPaciente?.peso_paciente + ' Kg' : 'Sin datos'}</span></h2>
                </div>
            </div>
            {odontograma}

            <div className='mt-10 flex flex-1 justify-center'>
                <div>

                </div>
                <div>
                    <button onClick={handleGuardarOdontograma} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${Datosdientes && datosHistorial?.data?.estado_historial == 0 ? '':'hidden'}`}>
                        Guardar odontograma
                    </button>
                    <button onClick={printDocument} className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>Imprimir</button>
                </div>
            </div>
        </div>
    );
}
