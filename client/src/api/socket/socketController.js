import socketIoClient from 'socket.io-client';
import {toast} from 'react-toastify';
import Notification from '../../components/Notification/Notification';
import ChatNotification from '../../components/ChatNotification/ChatNotification';
import { ROLE_RECEIVER } from '../../constants/constants';
import React from 'react';
import {baseURL} from '../baseURL';

export let controller;

class Controller {
    constructor(dispatch) {
        this.dispatch = dispatch;
        this.socket = socketIoClient(baseURL, {origins: "localhost:*"});
        this.listen();
    }

    listen = () => {
        this.socket.on('connect', () => {
            this.onShowNewEntry();
            this.onShowToWinner();
            this.onNewChatMessage();
            this.onUserOnline();
            this.onUserDisconnect();
            this.onConnect();
            this.onEntryReviewed();
        });
    };

    onConnect= () =>{
        this.socket.on('onlineUsers', (onlineUsers) => {
            this.dispatch({ type: 'CHAT_ONLINE_USERS', data:onlineUsers });
        });
    };

    onUserOnline = () =>{
        this.socket.on('userJoinedOnline', (id) => {
            console.log('user with id: ', id, ' joined website');
            this.dispatch({ type: 'CHAT_LIST_ONLINE', id });
        });
    };
    onUserDisconnect = () =>{
        this.socket.on('userDisconnected', (id) => {
            console.log('user with id: ', id, ' left website');
            this.dispatch({ type: 'CHAT_LIST_OFFLINE', id });
        });
    };

    onShowNewEntry = () => {
        this.socket.on('showNewEntry', (contest_id) => {
            toast(<Notification message={`New entry in contest #${contest_id}`} contestId={contest_id}/>);
        });
    };

    onShowToWinner = () => {
        this.socket.on('ShowToWinner', (contestId) => {
            toast(<Notification message={`Your entry won in contest #${contestId}`} contestId={contestId}/>);
        });
    };
    onNewChatMessage = () => {
        this.socket.on('newChatMessage', (data) => {
            const { role, sender, roomId, /*id,*/ message:{body} } = data;
            console.log('new message', data);
            this.dispatch({ type: 'GET_MESSAGE', data });
            if (role === ROLE_RECEIVER) {
                toast(<ChatNotification message={`${sender}: ${body}`} _id={roomId} />);
            }
        });
    };

    onEntryReviewed= () =>{
        this.socket.on('entryReviewResult', (data) => {
            toast(<Notification message={`Entry ${data.answer} review result: ${data.status}`}/>);
        });
    };

    subscribe = (id) => {
        console.log('subscribed', id);
        this.socket.emit('subscribe', id);
    };

    unsubscribe = (id) => {
        this.socket.emit('unsubscribe', id);
    };
}

export const initSocket = (store) => {
    controller = new Controller(store.dispatch);
    return store;
};

