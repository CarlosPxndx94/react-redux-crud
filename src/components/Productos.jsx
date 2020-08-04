import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Producto from './Producto';

import { obtenerProductos } from '../actions/ProductosActions';

const Productos = () => {

    //utilizar dispatch
    const dispatch = useDispatch();

    //Effect
    useEffect(() => {
        //Funcion que ejecuta el dispatch
        const handleGetProductos = () => { dispatch(obtenerProductos()) };
        handleGetProductos();
        // eslint-disable-next-line
    }, []);

    //Acceder al State
    const cargando = useSelector(state => state.productos.loading);
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {error ? <p className="font-weigth-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {cargando ? <p className="text-center">Cargando...</p> :
                <table className="table table-striped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length === 0 ? 'No hay productos' :
                            (
                                productos.map(producto => (
                                    <Producto
                                        key={producto.id}
                                        producto={producto}
                                    />
                                ))
                            )
                        }
                    </tbody>
                </table>
            }

        </Fragment>
    );
}

export default Productos;