class ChildWindow {
	constructor({ url, onMessage }) {
		this.onMessage = onMessage;
		this.url = url;
	}

	initializeMessageHandler() {
		const { onMessage, url } = this;
		window.addEventListener('message', event => {
			if(url.includes(event.origin)) {
				onMessage(event);
			}
		});
	}

	open() {
		const { url } = this;
		this.window = window.open(url, 'mixtape login', 'height=500, width=500');
		this.initializeMessageHandler();
		return this.window;
	}

	close() {
		const { window } = this;
		window.close();
	}
}

export default ChildWindow;