import React, { useEffect, useMemo, useState } from 'react';
import useDental from '../../hooks/useDental';
import Spinner from '../../components/Spinner';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaGripLines } from "react-icons/fa";
import Swal from 'sweetalert2';
import MiniSpinner from '../../components/MiniSpiner';
import { IoMdClose } from "react-icons/io";
import { CgShapeZigzag } from "react-icons/cg";
const Diente = ({ numero, idHistorial, idubicacion, nombre_diente, numeroFicha, idhemisferio_diente, estado_historial }) => {
    let error = false;

    const [estiloBorde, setEstiloBorde] = useState("");
    const [estiloLineas, setEstiloLineas] = useState("");
    const { datosPosicion, handleDatosActual, handleErrorSweet, dientes, modal, handleEliminarDatos, setActualizar, actualizar } = useDental();

    const aplicarEstilosInvertidos = idhemisferio_diente >= 5 && idhemisferio_diente <= 8;

    useEffect(() => {
        setEstiloBorde("");
        setEstiloLineas("");
        if (dientes && dientes.length > 0) {
            const dienteActual = dientes.find(d => d.idubicaciond === idubicacion && d.idposiciond === 5);
            if (dienteActual) {
                const grupos = dientes.reduce((acc, diente) => {
                    if (diente.ubicacion_dental.idhemisferio_diente === idhemisferio_diente &&
                        diente.posicion_dental.idposiciond === 5 &&
                        [9, 10, 11].includes(diente.condiciones_dentales.idcondicionesd)) {

                        const clave = `${diente.ubicacion_dental.idhemisferio_diente}-${diente.posicion_dental.idposiciond}-${diente.condiciones_dentales.idcondicionesd}`;
                        if (!acc[clave] || acc[clave][0].idtratamientos != diente.idtratamientos) {
                            acc[clave] = [];
                        }
                        acc[clave].push(diente);
                        return acc;
                    }
                    return acc;
                }, {});
                const claveGrupo = `${dienteActual.ubicacion_dental.idhemisferio_diente}-${dienteActual.posicion_dental.idposiciond}-${dienteActual.condiciones_dentales.idcondicionesd}`;
                const grupo = grupos[claveGrupo] || [];
                const esPrimero = grupo[0]?.ubicacion_dental.ubicacion_diente == dienteActual.ubicacion_dental.ubicacion_diente;
                const esUltimo = grupo[grupo.length - 1]?.ubicacion_dental.ubicacion_diente == dienteActual.ubicacion_dental.ubicacion_diente;

                let nuevoEstiloBorde = "";
                if (dienteActual.condiciones_dentales.idcondicionesd === 9) {
                    if (aplicarEstilosInvertidos) {
                        nuevoEstiloBorde = esUltimo ? "border-t-4 border-b-4 border-l-4 border-blue-600 rounded-l-lg"
                            : esPrimero ? "border-t-4 border-b-4 border-r-4 border-blue-600 rounded-r-lg"
                                : "border-t-4 border-b-4 border-blue-600 rounded-none";
                    } else {
                        nuevoEstiloBorde = esPrimero ? "border-t-4 border-b-4 border-l-4 border-blue-600 rounded-l-lg"
                            : esUltimo ? "border-t-4 border-b-4 border-r-4 border-blue-600 rounded-r-lg"
                                : "border-t-4 border-b-4 border-blue-600";
                    }
                } else if (dienteActual.condiciones_dentales.idcondicionesd === 10) {
                    if (aplicarEstilosInvertidos) {
                        nuevoEstiloBorde = esUltimo ? "border-t-4 border-b-4 border-l-4 border-red-600 rounded-l-lg"
                            : esPrimero ? "border-t-4 border-b-4 border-r-4 border-red-600 rounded-r-lg"
                                : "border-t-4 border-b-4 border-red-600 rounded-none";
                    } else {
                        nuevoEstiloBorde = esPrimero ? "border-t-4 border-b-4 border-l-4 border-red-600 rounded-l-lg"
                            : esUltimo ? "border-t-4 border-b-4 border-r-4 border-red-600 rounded-r-lg"
                                : "border-t-4 border-b-4 border-red-600";
                    }
                }

                setEstiloBorde(nuevoEstiloBorde);
                let nuevoEstiloLineas = "";

                if (dienteActual.condiciones_dentales.idcondicionesd === 11) {
                    nuevoEstiloLineas = esPrimero ? 'F' : esUltimo ? 'L' : 'N';
                }
                // console.log(nuevoEstiloLineas);
                setEstiloLineas(nuevoEstiloLineas);
            }
        }
    }, [dientes, idubicacion, idhemisferio_diente]);

    if (Object.keys(datosPosicion).length === 0) return <MiniSpinner />


    const handlePartClick = (idposiciond) => {

        if (estado_historial === 1) {
            return handleErrorSweet('No se puede modificar el odontograma, el paciente ya tiene un tratamiento finalizado');
        }

        const grupoFiltrado = dientes.filter(diente => diente.ubicacion_dental.idhemisferio_diente == idhemisferio_diente && diente.posicion_dental.idposiciond == idposiciond && (diente.condiciones_dentales.idcondicionesd == 9 || diente.condiciones_dentales.idcondicionesd == 10 || diente.condiciones_dentales.idcondicionesd == 11));

        if (grupoFiltrado.length > 0 && grupoFiltrado.some(objeto => objeto.idubicaciond === idubicacion)) {

            let idParaURL = `${idHistorial}/${idubicacion}/${grupoFiltrado.find(objeto => objeto.idubicaciond === idubicacion).idcondicionesd}/${idposiciond}`;
            // console.log();
            handleEliminarDatos(idParaURL, 'api/dientes2', `Elimina ls dientes con la condicion ${grupoFiltrado.find(objeto => objeto.idubicaciond === idubicacion).condiciones_dentales.nombre_condicion} en el ${grupoFiltrado.find(objeto => objeto.idubicaciond === idubicacion).ubicacion_dental.hemisferio.nombre_hemisferio}`);
            setTimeout(() => {
                setActualizar(!actualizar);
            }, 2000);

            return;



        }

        const datosDiente = dientes.find(d => d.idubicaciond === idubicacion && d.idposiciond === idposiciond);

        const posicion = datosPosicion.find(p => p.idposiciond === idposiciond);

        const datos = {
            idposiciond: posicion.idposiciond,
            nombre_posiciond: posicion.nombre_posiciond,
            numDiente: numero,
            idHistorial: idHistorial,
            idubicacion: idubicacion,
            nombre_diente: nombre_diente,
            numeroFicha: numeroFicha,
            idtratamientos: datosDiente?.idtratamientos ? datosDiente?.idtratamientos : null,
            idcondicionesd: datosDiente?.idcondicionesd ? datosDiente?.idcondicionesd : null,
            descripcion_diente: datosDiente?.descripcion_diente ? datosDiente?.descripcion_diente : '',
            datosDiente: datosDiente ? datosDiente : null,
            idhemisferio_diente: idhemisferio_diente,
        };

        handleDatosActual(datos);
    };

    if (dientes.length === 0) {
        return (
            <div>
                <div className="w-full text-center p-1 text-xs font-bold bg-slate-300">{numero}</div>
                <div className="relative flex items-center justify-end w-16 h-16">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="h-3 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                onClick={() => handlePartClick(1)}></div>
                            <div className="flex w-full justify-between px-1">
                                <div className="h-8 w-3 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                    onClick={() => handlePartClick(2)}></div>
                                <div className="h-8 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-full hover:bg-slate-300 "
                                    onClick={() => handlePartClick(5)}>
                                </div>
                                <div className="h-8 w-3 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                    onClick={() => handlePartClick(3)}></div>
                            </div>
                            <div className="h-3 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                onClick={() => handlePartClick(4)}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    const renderizarParteDiente = (idposicion, classes) => {
        if (dientes.length > 0) {
            const dienteEncontrado = dientes.find(diente => diente.idubicaciond === idubicacion && diente.idposiciond === idposicion);

            return (

                <div
                    style={{ zIndex: '0' }}
                    className={`relative ${classes} border-2 border-gray-400 cursor-pointer ${idposicion === 5 ? 'rounded-full' : 'rounded-lg'}`}
                    onClick={() => handlePartClick(idposicion)}>
                    <div
                        style={{ backgroundColor: dienteEncontrado?.condiciones_dentales.color_condicion || 'transparent' }}
                        className={`absolute inset-0 bg-transparent ${idposicion === 5 ? 'rounded-full' : 'rounded-lg'} ${(dienteEncontrado?.condiciones_dentales.idcondicionesd === 6 || dienteEncontrado?.condiciones_dentales.idcondicionesd === 8) && idposicion === 5 ? 'border-4 border-red-600' : ''}`}>
                    </div>
                </div>
            );
        }
    };

    const dienteConCondicionEspecial = dientes.length > 0 && dientes.find(diente =>
        diente.idubicaciond === idubicacion &&
        (diente.idcondicionesd === 3 || diente.idcondicionesd === 4 || diente.idcondicionesd === 7 || diente.idcondicionesd === 8 || diente.idcondicionesd === 12) &&
        diente.idposiciond === 5
    );

    let borderColor = '';
    if (dienteConCondicionEspecial) {
        if (dienteConCondicionEspecial.idcondicionesd === 3) {
            borderColor = 'border-blue-600 rounded-full border-2';
        } else if (dienteConCondicionEspecial.idcondicionesd === 4) {
            borderColor = 'border-red-600 rounded-full border-2';
        }
    }


    let tieneCondicionTres = false;

    if (dienteConCondicionEspecial) {
        if (dienteConCondicionEspecial.idcondicionesd === 7) {
            tieneCondicionTres = true;
        } else if (dienteConCondicionEspecial.idcondicionesd === 8) {
            tieneCondicionTres = true;
        }
    }

    let fractura = false;
    if (dienteConCondicionEspecial) {
        if (dienteConCondicionEspecial.idcondicionesd === 12) {
            fractura = true;
        }
    }

    const getIconColor = (diente) => {
        return diente?.idcondicionesd === 1 ? 'blue' : diente?.idcondicionesd === 2 ? 'red' : 'transparent';
    };


    const dienteConIcono = dientes.length > 0 && dientes.find(diente => diente.idubicaciond === idubicacion && diente.idposiciond === 5 && (diente.idcondicionesd === 1 || diente.idcondicionesd === 2));

    const iconZIndex = modal ? 0 : 1;

    const iconContainerStyles = {
        position: 'absolute',

        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        zIndex: iconZIndex,
        pointerEvents: 'none',
    };


    return (
        <div>
            <div className="w-full text-center p-1 text-xs font-bold bg-slate-300">{numero}</div>
            <div className={`relative flex items-center justify-center w-16 h-16 ${borderColor ? borderColor : ''} ${estiloBorde}`}>
                {estiloLineas == 'F' && (
                    // una subcondicion a la variable aplicarEstilosInvertidos
                    aplicarEstilosInvertidos ? (
                        <div style={iconContainerStyles}>
                            <FaGripLines style={{ pointerEvents: 'none', fontSize: '1rem', color: 'blue', width: '38px', height: '38px' }} />
                            <FaRegSquarePlus style={{ pointerEvents: 'none', fontSize: '1.2rem', color: 'blue', marginRight: '2.5rem' }} />
                        </div>
                    ) :
                        <div style={iconContainerStyles}>
                            <FaRegSquarePlus style={{ pointerEvents: 'none', fontSize: '1.2rem', color: 'blue', marginLeft: '2.5rem' }} />
                            <FaGripLines style={{ pointerEvents: 'none', fontSize: '1rem', color: 'blue', width: '38px', height: '38px' }} />
                        </div>
                )}
                {estiloLineas == 'L' && (
                    aplicarEstilosInvertidos ? (
                        <div style={iconContainerStyles}>
                            <FaRegSquarePlus style={{ pointerEvents: 'none', fontSize: '1.2rem', color: 'blue', marginLeft: '2.5rem' }} />
                            <FaGripLines style={{ pointerEvents: 'none', fontSize: '1rem', color: 'blue', width: '38px', height: '38px' }} />
                        </div>
                    ) :
                        <div style={iconContainerStyles}>
                            <FaGripLines style={{ pointerEvents: 'none', fontSize: '1rem', color: 'blue', width: '38px', height: '38px' }} />
                            <FaRegSquarePlus style={{ pointerEvents: 'none', fontSize: '1.2rem', color: 'blue', marginRight: '2.5rem' }} />
                        </div>

                )}
                {estiloLineas == 'N' && (
                    <div style={iconContainerStyles} className='flex justify-between'>
                        <div >
                            <FaGripLines style={{ width: '38px', height: '38px', color: 'blue', pointerEvents: 'none' }} />
                        </div>
                        <div >
                            <FaGripLines style={{ width: '38px', height: '38px', color: 'blue', pointerEvents: 'none' }} />
                        </div>
                    </div>
                )}
                <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className="flex flex-col items-center justify-center">
                        {renderizarParteDiente(1, 'h-3 w-8')}
                        <div className="flex w-full justify-between px-1">
                            {renderizarParteDiente(2, 'h-8 w-3')}
                            {renderizarParteDiente(5, 'h-8 w-8')}
                            {renderizarParteDiente(3, 'h-8 w-3')}
                        </div>
                        {renderizarParteDiente(4, 'h-3 w-8')}
                        {tieneCondicionTres && (
                            <div className="absolute mt-0.5 top-14 text-xs font-bold flex items-center justify-center">
                                SFF
                            </div>
                        )}
                    </div>
                </div>
                {dienteConIcono && (
                    <IoMdClose className="absolute " style={{ color: getIconColor(dienteConIcono), width: '90px', height: '100px', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', pointerEvents: 'none' }} />
                )}
                {fractura && (
                    <CgShapeZigzag className="absolute " style={{ color: 'red', width: '50px', height: '50px', transform: 'translate(-50%, -50%) rotate(-90deg)', top: '50%', left: '50%', pointerEvents: 'none' }} />
                )}


            </div>
        </div >
    );

};

export default Diente;
