import { createRef, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alertas";

export default function Login() {
  const nombre_usuario = createRef();
  const clave_usuario = createRef();

  const [errores, setErrores] = useState([]);
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });


  const handleSubmit = e => {
    e.preventDefault();

    const datos = {
      nombre_usuario: nombre_usuario.current.value,
      password: clave_usuario.current.value,
    }
    login(datos, setErrores);
  }

  return (
    <>
      <h1 className="text-4xl font-black text-center text-indigo-900">Iniciar Sesión</h1>
      {/* <p className="text-cyan-600 font-black text-center pl-2">Inicia sesión con tus credenciales</p> */}

      <div className="bg-white drop-shadow-2xl rounded-md px-5 py-10">
        <form onSubmit={handleSubmit}>
          {
            errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
          }
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="nombre_usuario"

            >
              Usuario
            </label>
            <input
              type="text"
              ref={nombre_usuario}
              id="nombre_usuario"
              name="nombre_usuario"
              className="w-full p-3 mt-2 bg-gray-200 rounded-md"
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="clave_usuario"
            >
              Contraseña
            </label>
            <input
              type="password"
              ref={clave_usuario}
              id="clave_usuario"
              name="clave_usuario"
              className="w-full p-3 mt-2 bg-gray-200 rounded-md"
              placeholder="Ingresa tu clave de usuario"
            />
          </div>
          <button
            className="bg-indigo-900 hover:bg-indigo-950 text-white w-full mt-5 p-3 rounded-md uppercase font-bold cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  )
}
