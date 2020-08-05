import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { borrarProductoAction, getProductoEditarAction } from '../actions/ProductosActions';

const Producto = ({ producto }) => {

    const dispatch = useDispatch();
    const history = useHistory();//Habilitar el history

    const { id, nombre, precio } = producto;

    const handleEliminarProducto = id => {
        //Confirmacion del usuario
        Swal.fire({
            title: `Estas seguro de eliminar el producto: ${nombre}.`,
            text: "Un producto eliminado, no se puede recuparar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                //Ejecutar Dispatch
                dispatch(borrarProductoAction(id));
            }
        });
    };

    //función que redirige de forma prograada
    const redireccionarProdutoEditar = producto => {
        dispatch(getProductoEditarAction(producto));
        history.push(`/productos/editar/${producto.id}`);
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={() => { redireccionarProdutoEditar(producto) }}
                    className="btn btn-primary mr-2"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => { handleEliminarProducto(id) }}
                >Eliminar</button>
            </td>
        </tr>
    );
}

export default Producto;