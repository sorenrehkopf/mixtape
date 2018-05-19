import {
	LOGIN_START,
	LOGIN_FINISH
} from './types';

import ChildWindow from '../../../services/child-window';
import Api from '../../../services/api';

const login = () => (dispatch, getState) => {
	dispatch({ type: LOGIN_START });

	const loginWindow = new ChildWindow({
		url: 'https://www.myxtyp.com/api/auth/login',
		onMessage: ({ data: { authToken, ...more } }) => {
			const payload = {
				user: more
			};

			Api.setAuthToken(authToken);
			console.log('the payload!1', payload);
			dispatch({ type: LOGIN_FINISH, payload });
			loginWindow.close();
		}
	});

	loginWindow.open();
}

export default login;
