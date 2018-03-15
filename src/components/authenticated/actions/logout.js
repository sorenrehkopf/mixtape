import Api from '../../../services/api';
import { LOGOUT } from './types';

const logout = () => (dispatch, getState) => {
	Api.clearAuthToken();
	dispatch({ type: LOGOUT });
}

export default logout;