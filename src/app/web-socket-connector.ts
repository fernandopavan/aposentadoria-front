import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export class WebSocketConnector {

    private _stompClient: any;

    constructor(private webSocketEndpoint: string,
        private topic: string,
        private onMessage: Function) {
        this.connect();
    }

    private connect(): void {
        const ws = new SockJS(this.webSocketEndpoint);
        this._stompClient = Stomp.over(ws);
        this._stompClient.connect({}, frame => {
            this._stompClient.subscribe(this.topic, message => {
                this.onMessage(message);
            });
        }, error => {
            console.log(error);
        });

    }

}