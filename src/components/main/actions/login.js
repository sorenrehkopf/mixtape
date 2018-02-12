import {
	LOGIN_START,
	LOGIN_FINISH
} from './types.js';

import ChildWindow from '../../../services/child-window.js';
import Api from '../../../services/api.js';

const login = () => (dispatch, getState) => {
	dispatch({ type: LOGIN_START });

	const loginWindow = new ChildWindow({
		url: 'http://localhost:3000/api/auth/login',
		onMessage: ({ data: { authToken, displayName, displayPhoto } }) => {
			const payload = {
				user: {
					displayName,
					displayPhoto
				}
			};

			Api.setAuthToken(authToken);
			dispatch({ type: LOGIN_FINISH, payload })
			loginWindow.close();
		}
	});

	loginWindow.open();
}

export default login;