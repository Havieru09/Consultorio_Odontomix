import React, { createRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import useDental from '../hooks/useDental'

export default function EnfermedadModal() {

    const enfermedad = createRef();

    const { handleClickModal, datosActual, handleErrorSweet, handleEditarDatos,  handleIngresarDatos} = useDental();

    const handleEnviarEnfermedad = (e) => {
        e.preventDefault()
        if (enfermedad.current.value.trim() === '') {
            handleErrorSweet('El nombre de la enfermedad es obligatorio');
            return;
        }
        const datos = {
            nombre_enfermedad: enfermedad.current.value,
        }
        // console.log(datosActual.idenfermedades != null);
        if (datosActual.idenfermedades != null) {
            handleEditarDatos(datosActual.idenfermedades, datos, 'api/enfermedades');
        } else {
            handleIngresarDatos(datos, 'api/enfermedades');
        }
    }
    // const { handleClickModal, datosActual, handleTipoModal } = useDental()
    return (
        <div>
            <div>
                <button className="float-right focus:outline-none" onClick={handleClickModal}>
                    <FaTimes />
                </button>
            </div>
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">{datosActual.idenfermedades ? 'Actualizar enfermedad' : 'Agregar enfermedad'}</h3>
            </div>
            <form onSubmit={handleEnviarEnfermedad} className="bg-white p-4 rounded grid grid-cols-2 gap-4">
                
                <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_enfermedad">
                        Nombre de la enfermedad
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombre_enfermedad"
                        type="text"
                        placeholder="Nombre de la enfermedad"
                        defaultValue={datosActual.nombre_enfermedad}
                        ref={enfermedad}
                    />
                </div>
                {/* <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                        Descripción
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                        id="descripcion"
                        type="text"
                        placeholder="Descripción"
                        defaultValue={datosActual.descripcion}
                        onChange={handleEliminarDatos}
                    />
                </div> */}
                <div className="col-span-2 flex justify-end">
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        type="submit"
                    >
                        {datosActual.idenfermedades ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
            </form>

        </div>
    )
}
