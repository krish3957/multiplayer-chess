import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private pendingUserName: string;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.pendingUserName = "";
        this.users = [];
    }

    addUser(user: WebSocket) {
        this.users.push(user);
        this.addHandler(user);
    }

    removeUser(user: WebSocket) {
        // Implementation needed
    }

    private handleMessage() {
        // Implementation needed
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", async (data) => {
            const message = JSON.parse(data.toString());

            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    console.log("Starting game");
                    const game = new Game(this.pendingUser, socket, this.pendingUserName, message.payload.name);
                    await game.saveToDatabase();
                    this.games.push(game);
                    this.pendingUser = null;
                    this.pendingUserName = "";
                } else {
                    console.log("Pending user");
                    this.pendingUser = socket;
                    this.pendingUserName = message.payload.name;
                }
            }

            if (message.type === MOVE) {
                const game = this.games.find((game) => game.getPlayer1() === socket || game.getPlayer2() === socket);
                if (game) {
                    await game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
