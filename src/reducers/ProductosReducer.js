import {
    AGREGA_PRODUCTO,
    AGREGA_PRODUCTO_EXITO,
    AGREGA_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    GET_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    GET_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types';

//Cada Reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

export default function(state = initialState, action) {

    switch (action.type) {

        case AGREGA_PRODUCTO:
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGA_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGA_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINAR_ERROR:
        case PRODUCTO_EDITAR_ERROR:
            return {
                ...state,
                loading: false,
                productoEliminar: null,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload,
            }
        case GET_PRODUCTO_ELIMINAR:
            return {
                ...state,
                loading: true,
                productoEliminar: action.payload
            }
        case PRODUCTO_ELIMINAR_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
                loading: false,
                productoEliminar: null
            }
        case GET_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload,
            }
        case PRODUCTO_EDITAR_EXITO:
            return {
                ...state,
                productoEditar: null,
                productos: state.productos.map(producto =>
                    producto.id === action.payload.id ? producto = action.payload : producto)
            }
        default:
            return state;
    }

}