import { Server } from "socket.io"

export function POST(req, res) {
    if (res.socket.server.io) {
        console.log('Emitting event to all clients')
        res.end()
        return res.socket.server.io.emit('message', req.body)

    }

    const io = new Server(res.socket.server);

    res.socket.server.io = io;

    io.on("connection", (socket) => {
        console.log('Client connected')
        socket.broadcast.emit("message", {
            user: "Info",
            message: "A new user has joined the chat"
        }
        );

        socket.on('chat_message', (data) => {
            console.log('New message', data)
            io.emit('message', data)
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected')
        })
    });

    console.log("Setting up socket");
    res.end()
}