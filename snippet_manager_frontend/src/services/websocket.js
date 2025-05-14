// websocket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = new Client({
        // Use SockJS for compatibility with Spring Boot's .withSockJS()
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        connectHeaders: {},
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 5000, // auto-reconnect every 5 seconds
        onConnect: () => {
            console.log('WebSocket connected');
        },
        onDisconnect: () => {
            console.log('WebSocket disconnected');
        },
        onStompError: (frame) => {
            console.error('Broker error:', frame.headers['message']);
            console.error('Details:', frame.body);
        },
        });

        this.client.activate();
    }

    subscribeToSnippet(snippetId, callback) {
        const subscribe = () => {
            this.client.subscribe(`/topic/snippets/${snippetId}`, (message) => {
            const data = JSON.parse(message.body);
            callback(data.code); // update only code
            });
        };

        if (this.client.connected) {
            subscribe();
        } else {
            this.client.onConnect = () => {
            console.log('WebSocket connected');
            subscribe();
            };
        }
    }



    sendEditSnippet(snippetId, code) {
        this.client.publish({
            destination: '/app/editSnippet',
            body: JSON.stringify({ snippetId, code }),  // Both data in a single object
        });
    }

    disconnect() {
        this.client.deactivate();
    }
}

const websocketService = new WebSocketService();
export default websocketService;