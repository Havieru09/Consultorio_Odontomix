import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import clienteAxios from '../config/axios';
import useDental from '../hooks/useDental';

export default function Inicio() {
  const { handleErrorSweet } = useDental();
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [citas, setCitas] = useState('');
  const [consultas, setConsultas] = useState('');
  const [datosGrafico, setDatosGrafico] = useState({
    labels: [],
    datasets: [{
      label: 'Número de Citas pendiente por dia',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  });

  const [datosGraficoConsultas, setDatosGraficoConsultas] = useState({
    labels: [],
    datasets: [{
      label: 'Número de Consultas por Día',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  });


  const obtenerDatosGrafico = async () => {

    if (!fechaDesde || !fechaHasta) {
      handleErrorSweet("Por favor, rellene ambas fechas.");
      return;
    }

    const partesFechaDesde = fechaDesde.split('-');
    const fechaDesdeObj = new Date(partesFechaDesde[0], partesFechaDesde[1] - 1, partesFechaDesde[2]);

    const partesFechaHasta = fechaHasta.split('-');
    const fechaHastaObj = new Date(partesFechaHasta[0], partesFechaHasta[1] - 1, partesFechaHasta[2]);

    if (fechaDesdeObj > fechaHastaObj) {
      handleErrorSweet("La fecha 'desde' no puede ser posterior a la fecha 'hasta'.");
      return;
    }

    try {
      const { data: datainforme } = await clienteAxios.get(`api/informe_citas`, {
        params: { fecha1: fechaDesde, fecha2: fechaHasta }
      });
      const { data: dataCantidadCita } = await clienteAxios.get(`api/informe_citas_condicion`, {
        params: { fecha1: fechaDesde, fecha2: fechaHasta }
      });
      setCitas(dataCantidadCita);
      console.log(citas);
      procesarDatos(datainforme.data);
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  };

  const procesarDatos = (datosApi) => {
    const contadorCitasPorDia = datosApi.reduce((acc, cita) => {
      // Convertir la fecha a un formato que JavaScript pueda entender
      const partesFecha = cita.fechahora_cita.split(' ')[0].split('-');
      const fechaFormateada = `${partesFecha[0]}-${partesFecha[1]}-${partesFecha[2]}`;
      // const fecha = new Date(fechaFormateada).toLocaleDateString();

      acc[fechaFormateada] = (acc[fechaFormateada] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(contadorCitasPorDia);
    const data = Object.values(contadorCitasPorDia);

    setDatosGrafico({
      labels,

      datasets: [{
        label: 'Número de Citas pendiente por Día',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    });
  };

  const obtenerDatosGraficoConsultas = async () => {
    // Verificar que las fechas no estén vacías y que fechaDesde no sea mayor que fechaHasta
    if (!fechaDesde || !fechaHasta || new Date(fechaDesde) > new Date(fechaHasta)) {
      console.error('Fechas inválidas');
      return;
    }

    try {
      const { data } = await clienteAxios.get(`api/informe_consultas`, {
        params: { fecha1: fechaDesde, fecha2: fechaHasta }
      });
      const { data: dataCantidadConsulta } = await clienteAxios.get(`api/informe_consultas_condicion`, {
        params: { fecha1: fechaDesde, fecha2: fechaHasta }
      });
      console.log({fecha1: fechaDesde, fecha2: fechaHasta});
      setConsultas(dataCantidadConsulta);
      procesarDatosConsultas(data.data);
    } catch (error) {
      console.error('Error al obtener datos de la API para consultas', error);
    }
  };

  const procesarDatosConsultas = (datosApi) => {
    const contadorConsultasPorDia = datosApi.reduce((acc, consulta) => {
      const partesFecha = consulta.fecha_consulta.split(' ')[0].split('-');
      const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
      const fecha = new Date(fechaFormateada).toLocaleDateString();

      acc[fecha] = (acc[fecha] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(contadorConsultasPorDia);
    const data = Object.values(contadorConsultasPorDia);

    setDatosGraficoConsultas({
      labels,
      datasets: [{
        label: 'Número de Consultas por Día',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    });
  };

  return (
    <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
      <div className="mb-4 mt-4">
        <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Estadísticas</h3>
      </div>
      <div className="flex justify-around w-full mt-4">
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FechaD">Fecha desde</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="FechaD" type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FechaH">Fecha hasta</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="FechaH" type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
        </div>
        <button onClick={obtenerDatosGrafico} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generar Gráfico citas</button>
        <button onClick={obtenerDatosGraficoConsultas} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generar Gráfico consultas</button>
      </div>
      <div className='flex justify-between w-full'>
        <div className="flex justify-center mt-6 w-full m-auto h-72">
          <Bar data={datosGrafico} />
        </div>
        <div className="flex justify-center mt-6 w-full m-auto h-72">
          <Bar data={datosGraficoConsultas} />
        </div>
      </div>
      <div>
        {/*2 cards un de cantidad de citas pendientes y otra de cantidad consulta pendientes*/}
        <div className="flex justify-around w-full mt-4">
          <div className="w-1/3">
            <div className="flex flex-col justify-center items-center bg-indigo-50 rounded-xl p-5">
              <p className=" text-2xl font-medium text-center font-serif">Citas pendientes</p>
              <div className="w-1/3">
                <p className="text-gray-600 text-2xl font-medium text-center font-serif">{citas || 0}</p>
              </div>
            </div>
          </div>
          <div className="w-1/3">
          <div className="flex flex-col justify-center items-center bg-indigo-50 rounded-xl p-5">
              <p className="text-2xl font-medium text-center font-serif">Consultas pendientes</p>
              <div className="w-1/3">

                <p className="text-gray-600 text-2xl font-medium text-center font-serif">{consultas || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}