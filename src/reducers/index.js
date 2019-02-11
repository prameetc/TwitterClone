import {reducer as formReducer} from 'redux-form';
import storage from 'redux-persist/es/storage';
import {persistCombineReducers} from 'redux-persist';
import configureStore from '../stores/configureStore';
import rootSaga from '../sagas';

export default onCompletion => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = {
    user: require('./userstore').reducer,
    form: formReducer
  };

  const config = {
    key: 'root',
    storage,
    blacklist: ['form']
  };

  const reducer = persistCombineReducers(config, rootReducer);
  return configureStore(reducer, rootSaga, onCompletion);
};
