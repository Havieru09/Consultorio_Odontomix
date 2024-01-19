import React, { createRef, useEffect, useRef, useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import Spinner from '../../components/Spinner';
import useSWR from 'swr';
import clienteAxios from '../../config/axios';
import useDental from '../../hooks/useDental';
import { FaSearch } from 'react-icons/fa';
export default function Facturacion() {

    const [items, setItems] = useState([]);
    const [num_documento, setNum_documento] = useState('');
    const { handleErrorSweet, handleIngresarDatos } = useDental();
    const fetcher = () => clienteAxios('api/item').then(datos => datos.data)
    const { data, isLoading } = useSWR('api/item', fetcher)
    const concepto = createRef();
    const documento = createRef();
    const [datosFactura, setDatosFactura] = useState([]);


    const { data: dataClientes, isLoading: isLoadingClientes } = useSWR('api/clientes', () => clienteAxios('api/clientes').then(datos => datos.data));

    const [clienteSeleccionado, setClienteSeleccionado] = useState({});

    const seleccionarCliente = (identificacion_cliente) => {
        const cliente = dataClientes.data?.find(c => c.identificacion_cliente === identificacion_cliente);
        if (cliente) {
            setClienteSeleccionado(cliente);

        }
    }


    const [detalles, setDetalles] = useState([]);
    const agregarDetalle = () => {
        const nuevoDetalle = {
            id: Date.now(),
            idItem: 0,
            detalle: "",
            precio: 0,
            cantidad: 1,
            iva: 12,
            descuento_detalle: 0,
            subtotal_detalle: 0,
            existenItems: false,
            completo: false,
            cantidadMenor: false,
            descuentoMenor: false,
            precioMenor: false
        };
        setDetalles([...detalles, nuevoDetalle]);
    };

    const eliminarDetalle = (id) => {
        setDetalles(detalles.filter(detalle => detalle.id !== id));
    };

    const calcularSubtotal = () => {
        return detalles.reduce((subtotal_detalle, detalle) => subtotal_detalle + Number(detalle.precio) * Number(detalle.cantidad), 0).toFixed(2);
    };

    const calcularDescuentoTotal = () => {
        if (detalles.length === 0) {
            return 0;
        }
        return detalles.reduce((subtotal_detalle, detalle) => subtotal_detalle + Number(detalle.descuento_detalle), 0).toFixed(2);
    };

    const calcularIVA = () => {
        let ivaTotal = 0;
        detalles.forEach(detalle => {
            if (detalle.iva > 0) {
                const subtotalDetalle = Number(detalle.precio) * Number(detalle.cantidad);
                ivaTotal += (subtotalDetalle * detalle.iva / 100);
            }
        });
        return ivaTotal.toFixed(2);
    };

    const calcularTotal = () => {
        const subtotal = calcularSubtotal();
        const descuentoTotal = calcularDescuentoTotal();
        const iva = calcularIVA();
        return (parseFloat(subtotal) - parseFloat(descuentoTotal) + parseFloat(iva)).toFixed(2);
    };

    const handleItemChange = (idDetalle, valor) => {
        const itemSeleccionado = items.find(i => i.tratamientos_dentales.nombre_tratamiento === valor);
        const precioItem = itemSeleccionado ? itemSeleccionado.precio_item : 0;
        const nuevosDetalles = detalles.map(detalle => {
            if (detalle.id === idDetalle) {
                const detalleActualizado = {
                    ...detalle,
                    itemSeleccionado: valor,
                    precio: precioItem,
                    idItem: itemSeleccionado?.iditem || 0,
                    existenItems: itemSeleccionado ? false : true
                };

                // Calcular el total del detalle (incluyendo descuento e IVA)
                const subtotal = Number(detalleActualizado.precio) * Number(detalleActualizado.cantidad);
                const descuento = Number(detalleActualizado.descuento_detalle);
                const totalConDescuento = subtotal - descuento;
                const iva = detalleActualizado.iva / 100;
                const totalConIVA = totalConDescuento + (totalConDescuento * iva);
                detalleActualizado.subtotal_detalle = totalConIVA.toFixed(2);

                // validar el precio
                const precioMenor = detalleActualizado.precio <= 0 || detalleActualizado.precio === '';
                detalleActualizado.precioMenor = precioMenor;

                const esCompleto = (detalleActualizado?.itemSeleccionado || '').trim() !== '' && detalleActualizado.idItem > 0 && detalleActualizado.cantidad !== '' && detalleActualizado.descuento_detalle !== '' && detalleActualizado.precio !== '';
                detalleActualizado.completo = esCompleto;

                return detalleActualizado;
            }
            return detalle;
        });
        setDetalles(nuevosDetalles);
    };

    const actualizarDetalle = (id, campo, valor) => {
        const nuevosDetalles = detalles.map(detalle => {
            if (detalle.id === id) {

                const detalleActualizado = { ...detalle, [campo]: valor };
                // console.log((detalleActualizado.descuento_detalle));
                const subtotal = Number(detalleActualizado.precio) * Number(detalleActualizado.cantidad);
                const iva = detalleActualizado.iva / 100;
                const totalConIVA = subtotal + (subtotal * iva);
                detalleActualizado.subtotal_detalle = totalConIVA.toFixed(2);


                // console.log((detalleActualizado?.itemSeleccionado || '').trim() !== '' && detalleActualizado.idItem > 0 && detalleActualizado.cantidad === '' && detalleActualizado.descuento_detalle === '' && detalleActualizado.precio === '');

                const esCompleto = (detalleActualizado?.itemSeleccionado || '').trim() !== '' && detalleActualizado.idItem > 0 && detalleActualizado.cantidad !== '' && detalleActualizado.descuento_detalle !== '' && detalleActualizado.precio !== '';

                console.log((detalleActualizado?.itemSeleccionado || '').trim() !== '' && detalleActualizado.precio !== '' && detalleActualizado.idItem > 0 && detalleActualizado.cantidad !== '' && detalleActualizado.descuento_detalle !== '');

                const cantidadMenor = Number(detalleActualizado.cantidad) < 1;
                const descuentoMenor = detalleActualizado.descuento_detalle < 0 || detalleActualizado.descuento_detalle === '' || Number(detalleActualizado.descuento_detalle) > Number(detalleActualizado.subtotal_detalle);

                const precioMenor = detalleActualizado.precio <= 0 || detalleActualizado.precio === '';

                detalleActualizado.completo = esCompleto;
                detalleActualizado.cantidadMenor = cantidadMenor;
                detalleActualizado.descuentoMenor = descuentoMenor;
                detalleActualizado.precioMenor = precioMenor;

                return detalleActualizado;
            }
            return detalle;
        });
        setDetalles(nuevosDetalles);
    };

    useEffect(() => {
        if (data && data.data) {
            setItems(data.data);
            let num = data.data.find(i => i.num_documento != '');
            setNum_documento(num.n_documento);
        }
    }, [data, num_documento]);

    const handleEnviarFactura = async () => {
        const existeError = detalles.find(detalle => detalle.completo === false);
        const existeErrorPrecio = detalles.find(detalle => detalle.precioMenor === true);
        const existeErrorCantidad = detalles.find(detalle => detalle.cantidadMenor === true);
        const existeErrorDescuento = detalles.find(detalle => detalle.descuentoMenor === true);
        console.log(existeError);
        console.log(detalles);
        if (!clienteSeleccionado.idcliente) {
            handleErrorSweet('Debe seleccionar un cliente');
            return;
        } else if (detalles.length === 0) {
            handleErrorSweet('Debe agregar al menos un detalle');
            return;
        } else if (existeError) {
            handleErrorSweet('Debe completar todos los detalles');
            return;
        } else if (existeErrorPrecio) {
            handleErrorSweet('El precio no puede estar vacio o ser menor a 1');
            return;
        } else if (existeErrorCantidad) {
            handleErrorSweet('La cantidad no puede estar vacio o ser menor a 1');
            return;
        } else if (existeErrorDescuento) {
            handleErrorSweet('El descuento es obligatorio, no puede ser menor a 0 ni mayor al total');
            return;
        } else {
            const factura = {
                idcliente: clienteSeleccionado.idcliente,
                // subtotal_factura: calcularSubtotal(),
                descuento_factura: calcularDescuentoTotal(),
                tiva_factura: calcularIVA(),
                total_factura: calcularTotal(),
                // detalles
            };
            console.log(factura);
            const data = await handleIngresarDatos(factura, 'api/cabecera', false, true, false);
            if (data) {
                const idFactura = data.idcabecerafactura;
                detalles.forEach(async detalle => {
                    const detalleFactura = {
                        idcabecera: idFactura,
                        iditem: detalle.idItem,
                        detalle: detalle.detalle,
                        cantidad: detalle.cantidad,
                        descuento_detalle: detalle.descuento_detalle,
                        iva_detalle: detalle.iva,
                        subtotal_detalle: detalle.subtotal_detalle,

                    }
                    console.log(detalleFactura);
                    await handleIngresarDatos(detalleFactura, 'api/detalle', false, true, false);
                });
            }
        }
    }

    const handleLlamadoDeFactura = async () => {
        const documentoFactura = documento.current.value;
        if (documentoFactura === '') {
            handleErrorSweet('Debe ingresar un numero de factura');
            return;
        }
        try {
            const response = await clienteAxios(`api/cabecera/${documentoFactura}`);
            // console.log(response.data.data);
            setDatosFactura(response.data.data);
            if (response.data.data.length === 0) {
                handleErrorSweet('No existe la factura');
                return;
            }
            const cliente = dataClientes.data?.find(c => c.idcliente === response.data.data.idcliente);
            setClienteSeleccionado(cliente);
            // const detallesFactura = await clienteAxios(`api/detalle/${documentoFactura}`);
        } catch (error) {
            handleErrorSweet(error);
        }
    };
    

    if (isLoading && isLoadingClientes) {
        return <Spinner />
    }


    if (num_documento === '') {
        return;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-6xl bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className='flex max-h-40 justify-center items-center'>
                    <div className="flex justify-start">
                        <img src="../img/logo-sinfondo.png" className='max-h-40' alt="Logo" />
                    </div>
                    <div className='text-base font-bold flex-1 text-center '>
                        <h1 className="font-serif">CENTRO DE ATENCIÓN ODONTOLÓGICA – OD. JUAN MURILLO LLANOS</h1>
                        <h2>Cdla. Luis Morejón Almeida Manzana A2 Villa 16/ Calle 1 S-O y José de la Cuadra.</h2>
                        <h3>Celular: 0982247948. Bio: https://biolink.info/odontomix</h3>
                    </div>
                </div>

                <div className='text-base font-bold flex-1 text-center '>
                    <h1 className="font-serif text-4xl">Factura</h1>
                </div>
                <hr className='my-4' />
                {/* buscador para numero factura */}
                <div className='flex justify-center items-center'>
                    <div className='flex w-1/2 items-center gap-2'>
                        <label className='font-serif font-bold text-base mb-2 w-1/3'>
                            Buscar Factura:
                        </label>
                        <input
                            type="text"
                            // defaultValue={`Factura #  ${num_documento}`}
                            className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="ingrese numero de factura"
                            ref={documento}
                        ></input>
                        <button onClick={handleLlamadoDeFactura} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <hr className='my-4' />
                <div>
                    <div className="grid grid-cols-2 gap-x-4 mt-8 gap-y-5">
                        <div className='flex justify-center items-center'>
                            <label className='font-serif font-bold text-base mb-2 w-1/3'>
                                Concepto:
                            </label>
                            <input
                                type="text"
                                defaultValue={`Factura #  ${num_documento}`}
                                className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Concepto"

                            ></input>
                        </div>
                        <div className='flex justify-center items-center'>
                            <label className='font-serif font-bold text-base mb-2 w-1/3'>
                                N° Factura:
                            </label>
                            <label
                                className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >{num_documento}</label>
                        </div>

                    </div>
                </div>
                <hr className='my-4' />
                <div className='flex justify-between'>

                </div>
                <div className='grid grid-cols-2 gap-x-4 mt-8 gap-y-5'>
                    <div className='flex justify-center items-center'>
                        <label className='font-serif font-bold text-base mb-2 w-1/3'>
                            Razón social:
                        </label>
                        <label
                            className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >{(clienteSeleccionado?.nombre_cliente || '') + '' + (clienteSeleccionado?.apellidos_cliente || '')}</label>

                    </div>
                    <div className='flex justify-center items-center'>
                        <label className='font-serif font-bold text-base mb-2 w-1/12'>
                            CI:
                        </label>

                        <input
                            list="clientes-datalist"
                            placeholder="Numero identificación"
                            defaultValue={(clienteSeleccionado?.identificacion_cliente || '')}
                            className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => seleccionarCliente(e.target.value)}
                        />
                        <datalist id="clientes-datalist">
                            {dataClientes?.data?.map(cliente => (
                                <option key={cliente.idcliente} value={cliente.identificacion_cliente}>
                                    {cliente.identificacion_cliente} - {cliente.nombre_cliente} {cliente.apellidos_cliente}
                                </option>
                            ))}
                        </datalist>
                    </div>
                    <div className='flex justify-center items-center'>
                        <label className='font-serif font-bold text-base mb-2 w-1/4'>
                            Direccion:
                        </label>
                        <label
                            className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >{(clienteSeleccionado?.direccion_cliente || '')}</label>
                    </div>
                    <div className='flex justify-center items-center'>
                        <label className='font-serif font-bold text-base mb-2 w-1/2'>
                            Telefono/Celular:
                        </label>
                        <label
                            className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >{(clienteSeleccionado?.telefono_cliente || '')}</label>
                    </div>
                    <div className='flex justify-center items-center'>
                        <label className='font-serif font-bold text-base mb-2 w-1/4'>
                            Email:
                        </label>
                        <label
                            className="shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >{(clienteSeleccionado?.correo_cliente || '')}</label>
                    </div>

                    <div className='flex justify-center items-center'>
                        <label className='font-serif font-bold text-base mb-2 w-1/2'>
                            Fecha factura:
                        </label>
                        <div className='shadow border py-2 px-3 rounded w-full h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                            {/* Fecha de hoy con React */}
                            <h1 className="font-serif">{
                                new Date().toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })
                            }</h1>
                        </div>
                    </div>
                </div>
                <hr className='my-4' />
                <div className="mb-4 flex-1 ">
                    <button onClick={agregarDetalle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Agregar Detalle
                    </button>
                </div>
                <div>
                    <div className="grid grid-cols-10 gap-x-1 gap-y-2 mb-4">
                        <div className="col-span-2 text-center font-bold">Nombre del Servicio</div>
                        <div className="col-span-2 text-center font-bold">Descripción</div>
                        <div className="text-center font-bold">Precio</div>
                        <div className="text-center font-bold">Cantidad</div>
                        <div className="text-center font-bold">IVA</div>
                        <div className="text-center font-bold">Descuento</div>
                        <div className="text-center font-bold">Total</div>
                    </div>
                </div>
                {detalles.map(detalle => (
                    <div key={detalle.id} className="grid grid-cols-10 gap-2 mb-4">
                        <div className='col-span-2 '>
                            <input
                                list="items"
                                value={detalle.itemSeleccionado || ''}
                                onChange={(e) => handleItemChange(detalle.id, e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nombre del servicio"
                            />
                            {detalle.existenItems && (
                                <p className="text-red-500 text-xs italic">
                                    No existe el tratramiento especificado
                                </p>
                            )}
                            <datalist id="items">
                                {items?.map(i => (
                                    <option key={i.iditem} defaultValue={i.iditem}>
                                        {i.tratamientos_dentales.nombre_tratamiento}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <div className='col-span-2'>


                            <input
                                type="text"
                                className="col-span-2 shadow border py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                defaultValue={detalle.detalle}
                                onChange={(e) => actualizarDetalle(detalle.id, 'detalle', e.target.value)}
                                placeholder="Descripcion detalle"
                            />
                        </div>
                        <div className='col-span-1'>

                            <input
                                type="number"
                                className="shadow border py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                value={detalle.precio}
                                onChange={(e) => actualizarDetalle(detalle.id, 'precio', e.target.value)}
                                pattern='[0-9]'
                                placeholder="Precio"
                            />
                            {detalle.precioMenor && (
                                <p className="text-red-500 text-xs italic">
                                    El precio no puede estar vacio o ser menor a 1
                                </p>
                            )}
                        </div>
                        <div className='col-span-1'>
                            <input
                                type="number"
                                className="shadow border py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                defaultValue={detalle.cantidad}
                                // min="1" 
                                pattern='[0-9]'
                                onChange={(e) => actualizarDetalle(detalle.id, 'cantidad', e.target.value)}
                                placeholder="Cantidad"
                            />
                            {detalle.cantidadMenor && (
                                <p className="text-red-500 text-xs italic">
                                    La cantidad no puede estar vacio o ser menor a 1
                                </p>
                            )}
                        </div>
                        <div className='col-span-1'>
                            <select
                                className="shadow border py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                defaultValue={detalle.iva}
                                onChange={(e) => actualizarDetalle(detalle.id, 'iva', e.target.value)}
                            >
                                <option value="0">0%</option>
                                <option value="12">12%</option>
                                <option value="15">15%</option>
                            </select>
                        </div>
                        <div className='col-span-1'>
                            <input
                                type="number"
                                pattern='[0-9]'
                                className="shadow border py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                defaultValue={detalle.descuento_detalle}
                                onChange={(e) => actualizarDetalle(detalle.id, 'descuento_detalle', e.target.value)}
                                placeholder="$ Descuento"
                            />
                            {detalle.descuentoMenor && (
                                <p className="text-red-500 text-xs italic">
                                    El descuento es obligatorio, no puede ser menor a 0 ni mayor al total
                                </p>
                            )}
                        </div>


                        <div className='col-span-1'>

                            <div className="flex items-center justify-center">
                                <span className="font-medium">{((1 + detalle.iva / 100) * (detalle.precio * detalle.cantidad) - detalle.descuento_detalle).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='flex justify-center'>
                                <button onClick={() => eliminarDetalle(detalle.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    <MdDeleteForever />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div>
                    <div className="grid grid-cols-2 gap-2 mb-4 border-4 mr-40 ml-40 mt-10">
                        <div className="text-center font-bold">Subtotal</div>
                        <div className="flex items-center justify-center">
                            <span className="font-medium">{calcularSubtotal()}</span>
                        </div>
                        <div className="text-center font-bold">% IVA</div>
                        <div className="flex items-center justify-center">
                            <span className="font-medium">{detalles.find(d => d.iva == 12) ? '12' : '0'}</span>
                        </div>
                        <div className="text-center font-bold">Valor IVA</div>
                        <div className="flex items-center justify-center">
                            <span className="font-medium">{calcularIVA()}</span>
                        </div>
                        <div className="text-center font-bold">Descuento</div>
                        <div className="flex items-center justify-center">
                            <span className="font-medium">{calcularDescuentoTotal()}</span>
                        </div>
                        <div className="text-center font-bold">Total</div>
                        <div className="flex items-center justify-center">
                            <span className="font-medium">{calcularTotal()}</span>
                        </div>
                    </div>
                    <div className='flex-1 text-center'>
                        <button onClick={handleEnviarFactura} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}
