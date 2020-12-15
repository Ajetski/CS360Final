const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 });

let connections = [];
let messages = [];
let users = {};

wss.on('connection', ws => {
	console.log('connection started');
	ws.on('message', message => {
		const msgObj = JSON.parse(message);
		if (msgObj.type === 'message') {
			messages.push(msgObj)
			connections.filter(conn => conn !== ws).forEach(conn => conn.send(message));
		} else if (msgObj.type === 'login') {
			const { username, password } = msgObj.content;
			if (users[username] == null || users[username]["password"] !== password) {
				ws.send(JSON.stringify({
					type: 'login',
					content: {
						error: 'Unauthorized.'
					}
				}));
			} else {
				ws.send(JSON.stringify({
					type: 'login',
					content: {
						username,
						displayName: users[username]["displayName"],
						password
					}
				}));
				if (!(ws in connections)) {
					connections.push(ws);
					messages.forEach(message => {
						ws.send(JSON.stringify(message));
					});
				}
			}
		}
		else if (msgObj.type === 'register') {
			const { username, displayName, password } = msgObj.content;
			if (users[username] != null ||
				Object.keys(users).some(key => users[key]["displayName"] === displayName)) {
				ws.send(JSON.stringify({
					type: 'register',
					content: {
						error: 'Conflict. User already exists.'
					}
				}));
			} else {
				users[username] = { displayName, password };
				ws.send(JSON.stringify({
					type: 'register',
					content: {
						username,
						displayName,
						password
					}
				}));
				if (!(ws in connections)) {
					connections.push(ws);
					messages.forEach(message => {
						ws.send(JSON.stringify(message));
					});
				}
			}
		}

	});
});

wss.on('close', ws => {
	console.log('connection terminated');
	connections = connections.filter(elem => elem !== ws);
});