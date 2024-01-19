import { FaTimes } from "react-icons/fa";
import useDental from "../hooks/useDental";
import { createRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

export default function PacienteModal() {
    const ididentificacion = createRef();
    const nombre_paciente = createRef();
    const apellidos_paciente = createRef();
    const identificacion_paciente = createRef();
    const altura_paciente = createRef();
    const peso_paciente = createRef();
    const genero_paciente = createRef();
    const edad_paciente = createRef();
    const direccion_paciente = createRef();
    const telefono_paciente = createRef();
    const correo_paciente = createRef();
    const [validate, setValidate] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [invalidFields, setInvalidFields] = useState({});
    const { handleClickModal, handleIngresarDatos, datosActual, handleEditarDatos, datosId } = useDental();

    const handleEnviarPaciente = e => {
        e.preventDefault();
        if (!validarCampos()) {
            return;
        }

        const datos = {
            nombre_paciente: nombre_paciente.current.value,
            apellidos_paciente: apellidos_paciente.current.value,
            ididentificacion: ididentificacion.current.value,
            identificacion_paciente: identificacion_paciente.current.value,
            altura_paciente: altura_paciente.current.value,
            peso_paciente: peso_paciente.current.value,
            genero_paciente: genero_paciente.current.value,
            edad_paciente: edad_paciente.current.value,
            direccion_paciente: direccion_paciente.current.value,
            telefono_paciente: telefono_paciente.current.value,
            correo_paciente: correo_paciente.current.value,
        };
        if (datosActual.idpaciente != null) {
            handleEditarDatos(datosActual.idpaciente, datos, 'api/pacientes');
        } else {
            handleIngresarDatos(datos, 'api/pacientes');
        }
    }

    const validarCampos = () => {
        let newInvalidFields = {};

        const fieldsToValidate = [
            { ref: nombre_paciente, name: 'nombre_paciente' },
            { ref: apellidos_paciente, name: 'apellidos_paciente' },
            { ref: identificacion_paciente, name: 'identificacion_paciente' },
            { ref: altura_paciente, name: 'altura_paciente' },
            { ref: peso_paciente, name: 'peso_paciente' },
            { ref: edad_paciente, name: 'edad_paciente' },
            { ref: direccion_paciente, name: 'direccion_paciente' },
            { ref: telefono_paciente, name: 'telefono_paciente' },
            { ref: correo_paciente, name: 'correo_paciente' },
        ];

        fieldsToValidate.forEach(field => {
            if (!field.ref.current.value.trim()) { // Verificar si el campo está vacío
                newInvalidFields[field.name] = true;
            }
        });

        setInvalidFields(newInvalidFields);
        return Object.keys(newInvalidFields).length === 0; // Retorna true si todos los campos son válidos
    };

    const handleValidaIdentificacion = () => {
        if (identificacion_paciente.current && identificacion_paciente.current.value !== '') {
            switch (ididentificacion.current.value) {
                case '1':
                    if (identificacion_paciente.current.value.length !== 10 || !/^[0-9]*$/.test(identificacion_paciente.current.value)) {
                        setErrorMsg('La cédula debe tener exactamente 10 dígitos.');
                        setValidate(false);
                    } else {
                        setErrorMsg('');
                        setValidate(true);
                    }
                    break;
                case '2':
                    if (identificacion_paciente.current.value.length !== 13 || !/^[0-9]*$/.test(identificacion_paciente.current.value)) {
                        setErrorMsg('El RUC debe tener exactamente 13 dígitos.');
                        setValidate(false);
                    } else {
                        setErrorMsg('');
                        setValidate(true);
                    }
                    break;
                case '3':
                    if (identificacion_paciente.current.value.length !== 9) {
                        setErrorMsg('El pasaporte no debe tener más ni menos de 9 caracteres.');
                        setValidate(false);
                    } else {
                        setErrorMsg('');
                        setValidate(true);
                    }
                    break;
                default:
                    setErrorMsg('');
                    setValidate(true);
                    break;
            }
        } else {
            setErrorMsg('El campo no puede estar vacío.');
            setValidate(false);
        }
    }

    return (
        <div className="p-4 ">
            <div>
                <button className="float-right focus:outline-none" onClick={handleClickModal}>
                    <FaTimes />
                </button>
            </div>
            <h2 className="text-center mb-4 text-xl font-bold">{datosActual.idpaciente ? 'Actualizar Paciente' : 'Crear Paciente'}</h2>
            <form noValidate onSubmit={handleEnviarPaciente} className="bg-white p-4 rounded grid grid-cols-2 gap-4">
                <div className={`${datosActual.idpaciente ? 'hidden' : ''}`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación:</label>
                    <select onChange={handleValidaIdentificacion} defaultValue={datosActual ? datosActual.ididentificacion : ''} ref={ididentificacion} name="ididentificacion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        {datosId.map(datoId => (
                            <option key={datoId.ididentificacion} value={datoId.ididentificacion}>{datoId.nombre_identificacion}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombres:</label>
                    <input
                        defaultValue={datosActual ? datosActual.nombre_paciente : ''}
                        ref={nombre_paciente}
                        type="text" name="nombre_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.nombre_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
                    <input
                        defaultValue={datosActual ? datosActual.apellidos_paciente : ''}
                        ref={apellidos_paciente}
                        type="text"
                        name="apellidos_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.apellidos_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className={`${datosActual.idpaciente ? 'hidden' : ''}`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación paciente:</label>
                    <input
                        defaultValue={datosActual ? datosActual.identificacion_paciente : ''}
                        ref={identificacion_paciente}
                        type="text"
                        name="identificacion_paciente"
                        onBlur={handleValidaIdentificacion} // Aquí se añade el evento onBlur
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.identificacion_paciente ? 'border-red-500' : ''}`}
                    />
                    {!validate && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Altura (Metros):</label>
                    <input
                        defaultValue={datosActual ? datosActual.altura_paciente : ''}
                        ref={altura_paciente}
                        type="number"
                        name="altura_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.altura_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Peso (Kilos):</label>
                    <input
                        defaultValue={datosActual ? datosActual.peso_paciente : ''}
                        ref={peso_paciente}
                        type="number"
                        name="peso_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.peso_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Género:</label>
                    <select defaultValue={datosActual ? datosActual.genero_paciente : ''} ref={genero_paciente} name="genero_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
                    <input
                        defaultValue={datosActual ? datosActual.edad_paciente : ''}
                        ref={edad_paciente}
                        type="number"
                        name="edad_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.edad_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                    <input
                        defaultValue={datosActual ? datosActual.direccion_paciente : ''}
                        ref={direccion_paciente}
                        type="text"
                        name="direccion_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.direccion_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                    <input
                        defaultValue={datosActual ? datosActual.telefono_paciente : ''}
                        ref={telefono_paciente}
                        type="text"
                        name="telefono_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.telefono_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className={`${datosActual.id}`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
                    <input
                        defaultValue={datosActual ? datosActual.correo_paciente : ''}
                        ref={correo_paciente}
                        type="email"
                        name="correo_paciente"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.correo_paciente ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 focus:outline-none focus:bg-slate-900">
                        {datosActual.idpaciente ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    )


}
