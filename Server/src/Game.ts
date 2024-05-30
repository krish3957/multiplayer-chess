import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
import { RoomModel } from "./model/roomModel";
import { MoveModel } from "./model/moveModel";
import mongoose from "mongoose";

export class Game {
    private player1: WebSocket;
    private player2: WebSocket;
    private player1Name: string;
    private player2Name: string;
    private board: Chess;
    private moveCount = 0;
    private startTime: Date;
    private roomId: string;

    constructor(player1: WebSocket, player2: WebSocket, player1Name: string, player2Name: string) {
        console.log("Starting game ..");
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
        this.roomId = "";
    }

    async saveToDatabase() {
        const room = new RoomModel({
            roomId: new Date().toISOString(),
            player1: this.player1Name,
            player2: this.player2Name,
            startTime: this.startTime
        });

        const savedRoom = await room.save();
        this.roomId = savedRoom.roomId;
    }

    async makeMove(player: WebSocket, move: { from: string; to: string; }) {
        // Validate the move and user turn
        if ((this.moveCount % 2 === 0 && player === this.player2) ||
            (this.moveCount % 2 === 1 && player === this.player1)) {
            return;
        }

        // Make the move
        try {
            this.board.move(move);
            this.moveCount++;
        } catch (error) {
            console.log(error);
            return;
        }

        // Save move to database
        const moveEntry = new MoveModel({
            roomId: this.roomId,
            from: move.from,
            to: move.to,
            player: player === this.player1 ? 'white' : 'black',
            moveNumber: this.moveCount,
            currBoard: this.board.fen()
        });
        await moveEntry.save();

        // Check if the game is over
        if (this.board.isGameOver()) {
            await RoomModel.updateOne(
                { roomId: this.roomId },
                { $set: { endTime: new Date() } }
            );
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: { winner: this.board.turn() === 'w' ? 'black' : 'white' }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: { winner: this.board.turn() === 'w' ? 'black' : 'white' }
            }));
        } else {
            const currentPlayerSocket = this.moveCount % 2 === 0 ? this.player1 : this.player2;
            currentPlayerSocket.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }
}
