const { Server } = require("socket.io");
const middleware = require("../middleware/middleware");

const activeSessions = new Map(); // Stores active user sessions

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.use(middleware.socketToken);

    io.on("connection", (socket) => {
        const user = socket.user; // Middleware attaches user data

        if (!user) {
            console.log("Unauthorized socket connection attempt.");
            socket.disconnect(true);
            return;
        }

        // ✅ Check if the user is already logged in from another session
        if (activeSessions.has(user.id)) {
            const previousSocketId = activeSessions.get(user.id);

            if (previousSocketId !== socket.id) {
                io.to(previousSocketId).emit("force-logout"); // ✅ Only log out if different session
                console.log(`Forcing logout for previous session of user: ${user.id}`);
            }
        }

        // ✅ Store new session
        activeSessions.set(user.id, socket.id);
        console.log(`User connected: ${user.name} (ID: ${user.id}, Socket: ${socket.id})`);

        socket.on("disconnect", () => {
            if (activeSessions.get(user.id) === socket.id) {
                activeSessions.delete(user.id);
                console.log(`User disconnected: ${user.name} (ID: ${user.id})`);
            }
        });
    });

    return io;
};

module.exports = { initializeSocket };
