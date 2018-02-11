import {
	LOGIN_START,
	LOGIN_FINISH
} from './types.js';

import ChildWindow from '../../../services/child-window.js';

const login = () => (dispatch, getState) => {
	dispatch({ type: LOGIN_START });

	const loginWindow = new ChildWindow({
		url: 'http://localhost:3000/api/auth/login',
		onMessage: event => {
			console.log('the event!', event);
		}
	});

	loginWindow.open();
}

export default login;