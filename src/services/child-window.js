class ChildWindow {
	constructor({ url, onMessage }) {
		this.onMessage = onMessage;
		this.url = url;
	}

	initializeMessageHandler() {
		window.addEventListener('message', (event) => this.messageHandler(event));
	}

	messageHandler(event) {
		const { onMessage, url } = this;
		if(url.includes(event.origin)) {
			onMessage(event);
		}
	}

	open() {
		const { url } = this;
		this.childWindow = window.open(url, 'mixtape login', 'height=500, width=500');
		this.initializeMessageHandler();
	}

	close() {
		const { childWindow } = this;
		window.removeEventListener('message', this.messageHandler);
		childWindow.close();
	}
}

export default ChildWindow;