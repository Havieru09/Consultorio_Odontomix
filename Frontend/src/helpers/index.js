const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
};

const formatearFecha = fecha => {
    const fechaHora = new Date(fecha);
    const fechaFormateada = fechaHora.toLocaleDateString();
    const horaFormateada = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Esto mostrará la hora en formato HH:mm
    return fechaFormateada + ' ' + horaFormateada;
};

const formatearFechaSinHora = (fecha, vista = true) => {
    const [date, time] = fecha.split(" ");
    // date = new Date(date).toLocaleDateString();
    if (vista) {
        const [day, month, year] = date.split("-");
        // cambiar a dia mes año
        const formattedDate = day + "/" + month + "/" + year;

        return formattedDate;     
    }
    const [year, month, day] = date.split("-");
    const formattedDate = day +"-"+ month +"-"+ year;
    // console.log(formattedDate);
    console.log(formattedDate);
    return formattedDate;
}

const formatearHora = fecha => {
    const [date, time] = fecha.split(" ");
    
    const [hour, minute] = time.split(":");
    const formattedTime = `${hour}:${minute}`;
    // console.log(formattedTime);
    return formattedTime;
}

export {
    formatearDinero,
    formatearFecha,
    formatearFechaSinHora,
    formatearHora
};
