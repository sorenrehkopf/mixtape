class Api {
	static get baseUrl() {
		return process.env.API_BASE_URL;
	}

	static get authToken() {
		return window.localStorage.getItem('authtoken');
	}

	static setAuthToken(token) {
		window.localStorage.setItem('authtoken', token);
	}

	static clearAuthToken() {
		window.localStorage.removeItem('authtoken');
	}

	static get(path) {
		return this.executeHttpReqest({ path })
	}

	static post(path, data) {
		return this.executeHttpReqest({ data, method: 'POST', path });
	}

	static put(path, data) {
		return this.executeHttpReqest({ data, method: 'PUT', path });
	}

	static executeHttpReqest({ data, method = 'GET', path }) {
		const { authToken, baseUrl } = this;
		return new Promise((resolve, reject) => {
			const http = new XMLHttpRequest();

			http.open(method, `${baseUrl}${path}`);

			if (authToken) {
				http.setRequestHeader('authtoken', authToken);
			}

			http.onreadystatechange = () => {
				if(http.readyState === 4){
					if(http.status===200) resolve({data: JSON.parse(http.response)});
					else reject(`Error: ${http.status}`);
				}
			};

			if(data){
				http.setRequestHeader('Content-Type', 'application/json');
				const serializedData = JSON.stringify(data);
				http.send(serializedData);
			} else {
				http.send();
			}
		})
	}
}

export default Api;