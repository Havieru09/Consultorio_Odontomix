import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import { useEffect } from "react";


export const useAuth = ({ middleware, url }) => {

    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR("api/usuario", () => 
        clienteAxios('/api/usuario')
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    );
        
    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('api/login', datos);
            localStorage.setItem('USUARIO', data.user.nombre_usuario);
            localStorage.setItem('ROL', data.user.idroles);

            setErrores([]);
            if (data.user) {
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log(error);
            // console.log(error.response.data.message);
            let mensajesError = [];

            if (typeof error.response.data.errors === 'string') {
                mensajesError.push(error.response.data.errors);
            } else {
                mensajesError = Object.values(error.response.data.errors).map(val =>
                    Array.isArray(val) ? val.join(' ') : val
                );
            }

            setErrores(mensajesError);
        }
    }

    // const logout = async() => {
    //     try{            
    //         localStorage.removeItem('USUARIO');
    //         localStorage.removeItem('AUTH_TOKEN');
    //         await mutate(undefined);
    //     }catch(error) {
    //         throw Error(error?.response?.data?.errors)
    //     }
    // }

    useEffect(() => {
        // Verifica primero si user está definido y luego si tiene la propiedad 'data'
        if(user && user.data) {
            if(middleware === 'guest' && (user.data.admin === 1 || user.data.admin === 2 || user.data.admin === 3)) {
                navigate(url);
            }
        }
        if(middleware === 'guest' && user && user.data.admin === 4) {
            navigate(url);
        }
        // Agregar lógica para manejar cuando haya un error
        if(middleware === 'auth' && error) {
            navigate('/auth/login');
        }
    }, [user, error, middleware, navigate, url]);

    return {
        login,
        user,
        error,
        mutate
        
    }
}