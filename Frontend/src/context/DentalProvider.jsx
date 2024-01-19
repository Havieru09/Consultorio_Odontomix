import { useMemo, createContext, useEffect, useState, } from 'react'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import clienteAxios from '../config/axios';
import { mutate } from 'swr';
const DentalContext = createContext();
const DentalProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [datosActual, setDatosActual] = useState({});
    const [datosId, setDatosId] = useState({});
    const [tipoModal, setTipoModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [datosPosicion, setDatosPosicion] = useState({});
    const [dientes, setDientes] = useState({});
    const [actualizar, setActualizar] = useState(false);
    const [actualizarId, setActualizarId] = useState(false);

    const handleClickModal = () => {
        if (modal === true) {
            setDatosActual({});
        }
        setModal(!modal);
    }

    const getDatos = async () => {
        const { data } = await clienteAxios.get(`api/identificacion`);
        setDatosId(data.data);
    }

    const getExamenes = async () => {
        const { data: Poisciones } = await clienteAxios.get(`api/posicion_dental`);
        setDatosPosicion(Poisciones.data);
    }

    useEffect(() => {
        getDatos();
        getExamenes();
    }, [])

    const handleTipoModal = (tipo) => {
        setTipoModal(tipo);
    }

    const handleDatosActual = (cliente, Modal = true) => {
        setDatosActual(cliente);
        if (Modal) {
            handleClickModal();
        }
    }

    const handleGetDatos = async (url) => {
        try {
            const fetcher = () => clienteAxios(`${url}`).then(datos => datos.data)
            const { data, isLoading } = useSWR(`${url}`, fetcher, {
                refreshInterval: 3000
            })
            return data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    const handleSubmitHistorial = async (arrayEnfermedades, Preguntas, Examenes, idPaciente, idConsulta, navigate, inputExamenIntraoral, idconsulta, archivo, setBotonHabilidato) => {
        setBotonHabilidato(false);
        let c = 0;
        try {
            if (arrayEnfermedades.length > 0) {
                for (let index = 0; index < arrayEnfermedades.length; index++) {
                    const datosEnfermedad = {
                        idenfermedadpaciente: idConsulta,
                        idpaciente: arrayEnfermedades[index].idpaciente,
                        idenfermedad: arrayEnfermedades[index].idenfermedad,
                        tratamiento_enfermedad: arrayEnfermedades[index].tratamiento_enfermedad,

                    }
                    const { data: datosEnfermedadP } = await clienteAxios.post(`api/enfermedad_paciente`, datosEnfermedad);
                }
            }

            const { data: datosPreguntas } = await clienteAxios.post(`api/preguntas`, Preguntas);
            const { data: datosExamenes } = await clienteAxios.post(`api/examen_extraoral`, Examenes);
            const { data: datosExamenIntraoral } = await clienteAxios.post(`api/examen_intraoral`, inputExamenIntraoral);
            
            let formData = new FormData();
            formData.append('idpaciente', idPaciente);
            formData.append('idconsulta', idConsulta);
            formData.append('idenfermedad_paciente', arrayEnfermedades.length > 0 ? idConsulta : '');
            formData.append('idpregunta', datosPreguntas?.data?.idpreguntas ? datosPreguntas?.data?.idpreguntas : '');
            formData.append('idexamen_extraoral', datosExamenes.data.idextraoral ? datosExamenes.data.idextraoral : '');
            formData.append('idexamen_intraoral', datosExamenIntraoral.data.idintraoral ? datosExamenIntraoral.data.idintraoral : '');
            formData.append('estado_historial', 0);
            formData.append('radiografia_historial', archivo ? archivo : null);
            const response = await clienteAxios.post('api/historial_medico', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data.data.numero_ficha);

            const estado_consulta = {
                estado_consulta: 1
            }

            handleEditarDatos(idconsulta, estado_consulta, `api/consultas`, false,false);

            toast.info(`Datos ingresados correctamente`);
            
            navigate(`/odontograma/creacion-odontograma/${response.data.data.numero_ficha}`)
        } catch (error) {

            console.log(error);
            const mensajesError = handleErrores(error);
            setBotonHabilidato(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
        }
    }

    const handleRedireccionar = (navigate, url) => {
        navigate(url);
    }

    const handleCompletarCita = async (id, url, cita) => {
        cita.estado_cita = 1;
        try {
            Swal.fire({
                title: `Desea completar la cita?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await clienteAxios.put(`${url}/${id}`, cita);
                    const datos = {
                        idcita: cita.idcita,
                        motivo_consulta: cita.concepto_cita,
                        fecha_consulta: new Date().toISOString().slice(0, 10) + ' ' + '00:00:00',
                        estado_consulta: 0,
                    }
                    console.log(datos);
                    const { data: dataCita } = await clienteAxios.post(`api/consultas`, datos);
                    console.log(dataCita);
                    setRefresh(!refresh);
                    Swal.fire('Cita actualizada correctamente!', '', 'success')
                    mutate(url);
                } else if (result.isDenied) {
                    Swal.fire('No se actualizo correctamente', '', 'info')
                }

            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleIngresarDatos = async (datos, url, reinicio = false, alerta = true, modal = true) => {
        try {
            // console.log(datos);
            if (alerta) {
                const { data } = await clienteAxios.post(`${url}`, datos);
                toast.info(`Datos ingresados correctamente`);
                if (modal) {
                    handleClickModal();
                }
                mutate(url);
                if (reinicio) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                // console.log(data);
                return data.data;
            } else {
                const { data } = await clienteAxios.post(`${url}`, datos);
                toast.info(`Datos ingresados correctamente`);
                if (modal) {
                    handleClickModal();
                }
                mutate(url);
                return data;
            }
        } catch (error) {
            // console.log(error.response.data.errors);
            const mensajesError = handleErrores(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
        }

    }

    const handleErrores = (error) => {
        let mensajesError = [];

        if (typeof error?.response?.data?.errors === 'string') {
            mensajesError.push(error.response.data.errors);
        } else {
            mensajesError = Object.values(error.response.data.errors).map(val =>
                Array.isArray(val) ? val.join(' ') : val
            );
        }
        return mensajesError;
    }

    // const handleEditarDatos = (id, usr, url, alerta = true) => {
    //     try {
    //         if (alerta) {
    //             Swal.fire({
    //                 title: `Desea actualizar informacion?`,
    //                 showDenyButton: true,
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Save',
    //                 denyButtonText: `Don't save`,
    //             }).then(async (result) => {
    //                 if (result.isConfirmed) {
    //                     try {

    //                         const { data } = await clienteAxios.put(`${url}/${id}`, usr);
    //                         mutate(url);
    //                         setRefresh(!refresh);
    //                         Swal.fire('Cambios Guardados!', '', 'success')
    //                         toast.info(`Datos actualizado correctamente`);
    //                         handleClickModal();

    //                     } catch (error) {
    //                         console.log(error?.response?.data?.errors);
    //                         const mensajesError = handleErrores(error);
    //                         Swal.fire({
    //                             icon: 'error',
    //                             title: 'Oops...',
    //                             text: mensajesError[0]
    //                         })
    //                     }

    //                 } else if (result.isDenied) {
    //                     Swal.fire('No se guardaron los cambios', '', 'info')
    //                     handleClickModal();
    //                 }

    //             })
    //         } else {
    //             try {
    //                 async () => {
    //                     const { data } = await clienteAxios.put(`${url}/${id}`, usr);
    //                     mutate(url);
    //                     setRefresh(!refresh);
    //                     Swal.fire('Cambios Guardados!', '', 'success')
    //                     toast.info(`Datos actualizado correctamente`);
    //                     handleClickModal();
    //                 }
    //             } catch (error) {
    //                 console.log(error?.response?.data?.errors);
    //                 const mensajesError = handleErrores(error);
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Oops...',
    //                     text: mensajesError[0]
    //                 })
    //             }
    //         }

    //     } catch (error) {
    //         console.log(error?.response?.data?.errors);
    //         const mensajesError = handleErrores(error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: mensajesError[0]
    //         })
    //     }
    // }

    const handleEditarDatos = async (id, datos, url, alerta = true, modal = true) => {
        const actualizarDatos = async () => {
            try {
                const { data } = await clienteAxios.put(`${url}/${id}`, datos);
                mutate(url);
                setRefresh((prevRefresh) => !prevRefresh);
                Swal.fire('Cambios Guardados!', '', 'success');
                toast.info(`Datos actualizado correctamente`);
                if (modal){handleClickModal();}

            } catch (error) {
                console.log(error);
                console.error(error?.response?.data?.errors);
                const mensajesError = handleErrores(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: mensajesError[0]
                });
            }
        };

        try {
            if (alerta) {
                const result = await Swal.fire({
                    title: `Desea actualizar información?`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                });

                if (result.isConfirmed) {
                    await actualizarDatos();
                } else if (result.isDenied) {
                    Swal.fire('No se guardaron los cambios', '', 'info');
                    handleClickModal();
                }
            } else {
                await actualizarDatos();
            }
        } catch (error) {
            console.error(error);
            // Manejo adicional de errores si es necesario
        }
    };

    const handleErrorSweet = (valor) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${valor}!`,
        })
    }

    const handleEliminarDatos = (id, url, text = "No podras recuperar la información!", alerta = true) => {
        console.log(id, url, text);
        if (alerta) {
            Swal.fire({
                title: 'Estas seguro de eliminarlo?',
                text: text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(clienteAxios.delete(`${url}/${id}`));
                    mutate(url);
                    Swal.fire(
                        'Eliminado!',
                        'Los datos fueron eliminados con exito.',
                        'success'
                    )
                }
            })
        }else{
            clienteAxios.delete(`${url}/${id}`);
            mutate(url);
        }        
    }

    const handleDientes = async (id, url) => {
        try {
            const { data } = await clienteAxios.get(`${url}/${id}`);
            console.log(data.data);
            setDientes(data.data);
        } catch (error) {
            console.log(error);
            setDientes({});
        }
    }

    const handleEnvioMail = async (datos) => {
        try {
            console.log(datos);
            
            await clienteAxios.post(`api/envioCorreo`, datos);
            toast.info(`Correo enviado correctamente`);
            // setDientes(data.data);
        } catch (error) {
            console.log(error);
            setDientes({});
        }
    }

    return (
        <DentalContext.Provider
            value={{
                modal,
                handleEnvioMail,
                handleClickModal,
                handleGetDatos,
                handleIngresarDatos,
                handleDatosActual,
                datosActual,
                handleEditarDatos,
                handleTipoModal,
                tipoModal,
                handleEliminarDatos,
                refresh,
                datosId,
                handleCompletarCita,
                handleSubmitHistorial,
                datosPosicion,
                handleErrores,
                handleErrorSweet,
                dientes,
                handleDientes,
                handleRedireccionar,
                actualizar,
                setActualizar,
                actualizarId,
                setActualizarId,
            }}
        >
            {children}
        </DentalContext.Provider>
    )
}

export {
    DentalProvider
}

export default DentalContext;