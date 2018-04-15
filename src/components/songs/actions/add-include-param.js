import {
	ADD_INCLUDE_PARAM
} from './types';

const addIncludeParam = ({ newParamName, newParamType, ...values }) => (dispatch, getState) => {
	const { songs: { query: { include: { params } } } } = getState();
	const newParams = {
		...params
	};

	newParams[newParamName] = {
		type: newParamType,
		...values
	};

	console.log(newParams);

	dispatch({ type: ADD_INCLUDE_PARAM, payload: { params: newParams } });
};

export default addIncludeParam;