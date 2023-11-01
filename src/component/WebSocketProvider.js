import React, {createContext, useEffect, useState} from 'react';
import { Stomp } from '@stomp/stompjs';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import _ from "lodash";
import {countUnreadNotifyByAccountLogin} from "./api/NotifyService/NotifyService";
import {changeStatus, countUnreadNotify} from "../redux/actions";

export const WebSocketContext = createContext(null)
const WebSocketProvider = ({children}) => {
    const [render, setRender] = useState(true);
    const [notify, setNotify] = useState({});
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();
    let socket;
    let stompClient;
    let ws;

    useEffect(()=>{
        if (!_.isEmpty(notify))
            toast.success(`Bạn có 1 thông báo mới`, {position: "top-center"});
    }, [notify])


    const sendNotify = (notify) => {
        if (!stompClient) return;
        stompClient.send("/app/notification", {}, JSON.stringify(notify));
    }

    const onConnected = () => {
        stompClient.subscribe(`/notification/${account.id}`, onNotifyReceived);
    }




    const onNotifyReceived = (payload) => {
        const data = JSON.parse(payload.body);
        if (data.message === 'Thay đổi trạng thái'){
            dispatch(changeStatus());
        } else {
            setNotify(data);
            countUnreadNotifyByAccountLogin(account.id).then(response => {
                dispatch(countUnreadNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    if (!socket && !_.isEmpty(account)) {
        socket = new WebSocket('ws://localhost:8080/ws/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    ws = {
        sendNotify,
        render,
        setRender
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;