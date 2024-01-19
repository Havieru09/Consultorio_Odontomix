import { RouterProvider } from 'react-router-dom';
import router from './router'; // Asegúrate de que la ruta es correcta

function App() {
  return (
    <RouterProvider router={router} />
  );
}
