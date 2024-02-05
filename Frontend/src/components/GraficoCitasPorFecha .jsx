import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraficoCitasPorFecha = ({ fechas, conteos }) => {
    const data = {
        labels: fechas,
        datasets: [
            {
                label: 'Número de Citas',
                data: conteos,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={data} />;
};

export default GraficoCitasPorFecha;
