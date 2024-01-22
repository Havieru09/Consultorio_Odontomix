
export default function Inicio() {
  const procesarDatosCitas = (datosCitas) => {
    const conteoPorFecha = {};

    datosCitas.forEach(cita => {
        const fecha = cita.fechahora_cita.split(' ')[0]; // Obtiene solo la fecha, sin la hora
        if (conteoPorFecha[fecha]) {
            conteoPorFecha[fecha]++;
        } else {
            conteoPorFecha[fecha] = 1;
        }
    });

    const fechas = Object.keys(conteoPorFecha);
    const conteos = Object.values(conteoPorFecha);

    return { fechas, conteos };
};
  return (
    <div>Inicio</div>
  )
}
