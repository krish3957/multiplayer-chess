import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard"
import { Chess, Square } from "chess.js";
import { useSocket } from "../hooks/useSocket";



export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over"

const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [gameStarted, setGameStarted] = useState(false);
    const [name, setName] = useState("");
    const [gameHistory, setGameHistory] = useState<{ from: Square, to: Square }[]>([]);

    useEffect(() => {
        if (!socket) {
            console.log("NO socket")
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME: {
                    setChess(new Chess());
                    setBoard(chess.board());
                    setGameStarted(true);
                    break;
                }
                case MOVE: {
                    const move = message.payload;
                    chess.move(move);
                    console.log(chess);
                    setBoard(chess.board());
                    setGameHistory([...gameHistory, move]);
                    break;
                }
                case GAME_OVER: {
                    break;
                }
            }
        }
    }, [socket, board, chess, gameHistory]);

    if (!socket) {
        return <div>Connecting...</div>
    }
    return (
        <div className="h-full flex justify-center w-full">
            <div className="pt-2 flex flex-col items-center w-full">
                <div className="grid grid-cols-6 w-full gap-x-10">
                    <div className="col-span-4 w-full">
                        <ChessBoard gameHistory={gameHistory} setGameHistory={setGameHistory} setBoard={setBoard} chess={chess} socket={socket} board={board} />
                    </div>
                    <div className="self-start h-full w-80 bg-green-400">
                        <div className="flex justify-between m-4 items-center">
                            <p className="text-black text-lg mr-2">
                                Name:
                            </p>
                            <input className="w-full h-10 p-2 bg-white text-black" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        {!gameStarted && <Button
                            disabled={name === ""}
                            onClick={() => {
                                socket?.send(JSON.stringify({
                                    type: INIT_GAME,
                                    payload: {
                                        name: name + new Date().getTime()
                                    }
                                }))
                            }}>
                            Play
                        </Button>}
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">Game History</h1>
                        </div>
                        <div>
                            {gameHistory.map((move, index) => {
                                return (
                                    <div key={index} className="flex justify-between">
                                        {
                                            index % 2 === 0 ?
                                                <div>
                                                    <p className="text-white font-bold text-lg">White {move.from} -- {move.to}</p>
                                                </div>
                                                : <p className="text-black font-bold text-lg">Black: {move.from} -- {move.to} </p>
                                        }

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Game