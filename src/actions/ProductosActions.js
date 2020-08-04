import {
    AGREGA_PRODUCTO,
    AGREGA_PRODUCTO_EXITO,
    AGREGA_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    GET_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear producto
export function crearNuevoProductoAction(producto) {
    return async(dispatch) => {
        dispatch(agregarProducto());

        try {
            //insertar en la API json-server
            await clienteAxios.post('productos', producto);
            //Si todo va bien se actualiza el state
            dispatch(agregarProductoExito(producto));

            //Alert
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));

            //Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentalo de nuevo'
            });
        }
    }
};

const agregarProducto = () => ({
    type: AGREGA_PRODUCTO,
    payload: true
});

const agregarProductoExito = producto => ({
    type: AGREGA_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = error => ({
    type: AGREGA_PRODUCTO_ERROR,
    payload: error
});

//Consultar productos
export function obtenerProductos() {
    return async(dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('productos');
            dispatch(descargarProductosExito(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError(true));
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = error => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: error
});

//Get producto a eliminar
export function borrarProductoAction(id) {

    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`productos/${id}`);

            dispatch(obtenerProductoEliminarExito());

            //si se elimina
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(obtenerProductoEliminarError(true));
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: GET_PRODUCTO_ELIMINAR,
    payload: id
});

const obtenerProductoEliminarExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
});

const obtenerProductoEliminarError = error => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: error
});