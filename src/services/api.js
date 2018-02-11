class Api {
	static get baseUrl() {
		return 'http://localhost:3000/api/';
	}

	static get authToken() {
		return window.localStorage.getItem('authtoken');
	}

	static get(path) {
		return this.executeHttpReqest({ path })
	}

	static executeHttpReqest({ data, method = 'GET', path }) {
		const { authToken, baseUrl } = this;
		return new Promise((resolve, reject) => {
			const http = new XMLHttpRequest();

			http.open(method, `${baseUrl}${path}`);

			http.setRequestHeader('authtoken', authToken);

			http.onreadystatechange = () => {
				if(http.readyState === 4){
					if(http.status===200) resolve({data: JSON.parse(http.response)});
					else reject(`error ${http.status}`);
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