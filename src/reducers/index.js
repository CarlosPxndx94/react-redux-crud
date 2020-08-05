import { combineReducers } from 'redux';
import ProductosReducer from './ProductosReducer';
import AlertaReducer from './AlertaReducer';

export default combineReducers({
    productos: ProductosReducer,
    alerta: AlertaReducer
});