import React, { useEffect, useState } from 'react'
import { createRef } from 'react'
import { FaTimes } from 'react-icons/fa';
import useDental from '../hooks/useDental';
import useSWR from 'swr';
import clienteAxios from '../config/axios';
import Spinner from './Spinner';



export default function UsuarioModal() {

    const { handleClickModal, datosActual, handleErrorSweet, handleEditarDatos, handleIngresarDatos } = useDental();
    const username = createRef();
    const password = createRef();
    const rol = createRef();
    const [roles, setRoles] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});
    const fecher = () => clienteAxios('api/roles').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('api/roles', fecher)
    const [selectedRol, setSelectedRol] = useState('');

    const handleEnviarUsuario = (e) => {
        e.preventDefault()

        if (username.current.value.trim() === '') {
            handleErrorSweet('El nombre de usuario es obligatorio');
            return;
        }
        if (password.current.value.trim() === '' && !datosActual.idusuario) {
            handleErrorSweet('La contraseña es obligatoria');
            return;
        }
        if (rol.current.value.trim() === '') {
            handleErrorSweet('El rol es obligatorio');
            return;
        }
        const datos = {
            nombre_usuario: username.current.value,
            password: password.current.value == '' ? (datosActual.idusuario ? datosActual.password : '') : password.current.value,
            idroles: rol.current.value,
        }
        console.log(datos);
        if (datosActual.idusuario) {
            handleEditarDatos(datosActual.idusuario, datos, 'api/usuario');
            
        }else {
            handleIngresarDatos(datos, 'api/usuario');
        }
    }

    useEffect(() => {
        if (data && data.data) {
            setRoles(data.data);
            if (datosActual && datosActual.roles) {
                const rolDefault = data.data.find(rol => rol.idroles === datosActual.roles.idroles)?.idroles || '';
                setSelectedRol(rolDefault);
            }

        }
    }, [data, error]);

    const rolPorDefecto = datosActual && datosActual.roles && roles.length > 0
        ? roles.find(rol => rol.idroles === datosActual.roles.idroles)?.idroles
        : '';

    if (isLoading) return <Spinner />
    return (
        <div>
            <div>
                <button className="float-right focus:outline-none" onClick={handleClickModal}>
                    <FaTimes />
                </button>
            </div>        
            <h2 className="text-center mb-4 text-xl font-bold">{datosActual.idpaciente ? 'Actualizar Paciente' : 'Crear Paciente'}</h2>
            <form noValidate onSubmit={handleEnviarUsuario} className="bg-white p-4 rounded flex flex-col">
                <div>
                    <label className="text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input
                        defaultValue={datosActual ? datosActual.nombre_usuario : ''}
                        ref={username}
                        type="text" name="username"
                        placeholder='Username'
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.username ? 'border-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rol:</label>
                    <select
                        value={selectedRol} // Usamos el estado para controlar el valor
                        onChange={(e) => setSelectedRol(e.target.value)} // Actualizamos el estado al cambiar de opción
                        ref={rol}
                        name="rol"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Seleccione un rol</option>
                        {roles.map(rol => (
                            <option key={rol.idroles} value={rol.idroles}>{rol.nombre_roles}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        // defaultValue={datosActual ? datosActual.password : ''}
                        ref={password}
                        type="password"
                        name="password"
                        placeholder='Password'
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${invalidFields.password ? 'border-red-500' : ''}`}
                    />
                    {/* {!validate && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>} */}
                </div>


                {/* <div> */}
                <div className="col-span-2 flex justify-end mt-5">
                    <button onClick={handleEnviarUsuario} type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 focus:outline-none focus:bg-slate-900">
                    {datosActual.idusuario ? 'Actualizar Usuario' : 'Crear Usuario'}
                    </button>
                </div>
                {/* </div> */}
            </form>
        </div>
    )
}
