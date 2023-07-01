export default function useWebsocket(url: string) {
    const socket = new WebSocket(url);

    socket.addEventListener("open", (event) => {
        socket.send("Hello Server!");
    });

    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
    });
}