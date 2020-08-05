import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editarProductoAction } from '../actions/ProductosActions';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/AlertaActions';

import { useHistory } from 'react-router-dom';

const EditarProducto = () => {

    const [productoNuevo, setProductoEditar] = useState({
        nombre: '',
        precio: 0
    });

    const dispatch = useDispatch();
    const productoEditar = useSelector(state => state.productos.productoEditar);
    //Alerta
    const alerta = useSelector(state => state.alerta.alerta);

    const history = useHistory();

    useEffect(() => {        
        setProductoEditar(productoEditar);
    }, [productoEditar, dispatch]);

    const onChangeForm = e => {
        setProductoEditar({
            ...productoNuevo,
            [e.target.name]: e.target.value
        });
    }

    const handleEditarProducto = e => {
        e.preventDefault();

        //validar
        if (productoNuevo.nombre.trim() === '' || productoNuevo.precio <= 0) {
            const alerta = {
                msg: 'Todos los campos son obligatorios',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch(mostrarAlertaAction(alerta));
            return;
        }

        dispatch(ocultarAlertaAction());

        dispatch(editarProductoAction(productoNuevo));

        history.push('/');
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Editar Producto
                        </h2>

                        {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}

                        <form
                            onSubmit={handleEditarProducto}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={productoNuevo.nombre}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={productoNuevo.precio}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <button
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Editar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;