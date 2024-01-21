import React, { createRef } from 'react'
import { FaTimes } from 'react-icons/fa';
import useDental from '../hooks/useDental';

export default function CondicionesModal() {
  const descripcion_condicion = createRef();
  const color_condicion = createRef();
  const { handleClickModal, datosActual, handleErrorSweet, handleEditarDatos } = useDental();

  const handleEnviarCondicion = (e) => {
    e.preventDefault()
    if (descripcion_condicion.current.value.trim() === '') {
      handleErrorSweet('La descripción de la condición es obligatorio');
      return;
    }
    const datos = {
      descripcion_condicion: descripcion_condicion.current.value,
      color_condicion: color_condicion.current.value,
    }
    handleEditarDatos(datosActual.idcondicionesd, datos, 'api/condiciones_dentales');
  }
  return (
    <div>
      <div>
        <button className="float-right focus:outline-none" onClick={handleClickModal}>
          <FaTimes />
        </button>
      </div>
      <div className="mb-4 mt-4">
        <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">{'Actualizar condición'}</h3>
      </div>
      <form onSubmit={handleEnviarCondicion}>
        <div className="bg-white p-4 rounded grid grid-cols-2 gap-4">
          {/* <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_condicion">
                Nombre de la condición
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre_condicion"
                type="text"
                placeholder="Nombre de la condición"
                defaultValue={datosActual.nombre_condicion}
              />
            </div> */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion_condicion">
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
              id="descripcion_condicion"
              type="text"
              placeholder="Descripción"
              defaultValue={datosActual.descripcion_condicion}
              ref={descripcion_condicion}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color_condicion">
              Color
            </label>
            <div className='flex justify-start'>

              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20 w-32"
                id="color_condicion"
                type="color"
                placeholder="Color"
                defaultValue={datosActual.color_condicion}
                ref={color_condicion}
              />
            </div>
          </div>
          <div className="flex justify-end col-span-2">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              Actualizar Condición
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
