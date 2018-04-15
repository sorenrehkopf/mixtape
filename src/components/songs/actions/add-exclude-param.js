import {
	ADD_EXCLUDE_PARAM
} from './types';

const addExcludeParam = ({ newParamName, newParamType, ...values }) => (dispatch, getState) => {
	const { songs: { query: { exclude: { params } } } } = getState();
	const newParams = {
		...params
	};

	newParams[newParamName] = {
		type: newParamType,
		...values
	};

	console.log(newParams);

	dispatch({ type: ADD_EXCLUDE_PARAM, payload: { params: newParams } });
};

export default addExcludeParam;