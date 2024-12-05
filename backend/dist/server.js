"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const message_socket_1 = __importDefault(require("./sockets/message.socket"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
//create
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Routes
app.use('/user', user_routes_1.default);
app.use('/api/msTree', message_route_1.default);
// Create HTTP server and attach Socket.IO
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:4321',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});
//Connect to mongoDB & Start server
const MONGO_URI = process.env.DATABASE_URL;
mongoose_1.default
    .connect(MONGO_URI, { dbName: "christmas_tree" })
    .then(() => {
    console.log('connect to MongoDB database');
    (0, message_socket_1.default)(io);
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT}`);
    });
})
    .catch((error) => {
    console.error(`Error connect to MongoDB: ${error}`);
});
