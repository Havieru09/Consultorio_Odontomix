import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR from "swr";


export const useAuth = ({ middleware, url }) => {

    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR("api/user", () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    );
        
    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('api/login', datos);
            console.log(data.user);
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

    return {
        login
    }
}