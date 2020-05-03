import { combineReducers } from 'redux'
import authReducer from './authReducer'
import productsReducer from './productsReducer'
// import assetsReducer from './assetsReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    auth: authReducer,
    products: productsReducer,
    // assets: assetsReducer,
    form: formReducer
})