import Api from '../../../services/api.js';
import { LOGOUT } from './types.js';

const logout = () => (dispatch, getState) => {
	Api.clearAuthToken();
	dispatch({ type: LOGOUT })
}

export default logout;