const { Server } = require("socket.io");
const middleware = require("../middleware/middleware");
const commonHelper = require("../common/commonHelper");

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.use(middleware.socketToken);

    io.on("connection", async (socket) => {
        const user = socket.user;
        console.log("User Connected:", user);

        if (!user) {
            console.log("Unauthorized socket connection attempt.");
            socket.disconnect(true);
            return;
        }

        try {
            // Mark user online
            await commonHelper.onlineOffleUpdate(user.id, 1);
        } catch (error) {
            console.error("Error updating user online status:", error);
        }

        try {
            // Get active users from DB
            const activeUsersResult = await commonHelper.userActiveList();
            const activeUsers = activeUsersResult.data || [];

            console.log("Active Users:", activeUsers);

            // Find previous session and force logout
            const previousSession = activeUsers.find((u) => u.userId === user.id);
            if (previousSession?.socket_id && previousSession.socket_id !== socket.id) {
                io.to(previousSession.socket_id).emit("force-logout");
                console.log(`Forced logout of previous session for user ID: ${user.id}`);
            }
        } catch (error) {
            console.error("Error fetching active users:", error);
        }

        console.log(`User Connected: (ID: ${user.id}, Socket: ${socket.id})`);

        socket.on("disconnect", async () => {
            try {
                // Mark user offline when disconnected
                await commonHelper.onlineOffleUpdate(user.id, 0);
                console.log(`User Disconnected: ${user.name} (ID: ${user.id})`);
            } catch (error) {
                console.error("Error updating user offline status:", error);
            }
        });
    });

    return io;
};

module.exports = { initializeSocket };
