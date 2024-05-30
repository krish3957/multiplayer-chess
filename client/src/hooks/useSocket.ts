import { useEffect, useState, useRef } from "react";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
        setSocket(ws);
    }

    return socket;
};
