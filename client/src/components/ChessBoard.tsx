import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";
import { name } from "../assets/assets_names";

const ChessBoard = ({ chess, board, socket, setBoard, gameHistory, setGameHistory }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],
    socket: WebSocket,
    chess: any,
    setBoard: any,
    gameHistory: any,
    setGameHistory: any

}) => {
    const [from, setFrom] = useState<null | Square>(null);
    return (
        <div className="w-full">
            {board.map((row, i) => {
                return (
                    <div key={i} className="flex w-full">
                        {row.map((square, j) => {
                            return (
                                <div
                                    onClick={() => {
                                        const sq = String.fromCharCode((97 + (j % 8))) + "" + ((8 - Math.floor(i)).toString()) as Square;
                                        console.log(sq);
                                        console.log(square);
                                        if (!from) {
                                            setFrom(sq);
                                        } else {
                                            try {

                                                socket.send(JSON.stringify({
                                                    type: MOVE,
                                                    payload: {
                                                        move: {
                                                            from: from,
                                                            to: sq,
                                                        }
                                                    }
                                                }));
                                                chess.move({
                                                    from: from,
                                                    to: sq
                                                })
                                                setBoard(chess.board());
                                                setGameHistory([...gameHistory, {
                                                    from: from,
                                                    to: sq
                                                }]);
                                                setFrom(null);

                                            }
                                            catch {
                                                setFrom(null);
                                            }
                                        }
                                    }}
                                    key={j}
                                    className={`w-20 h-20 flex justify-center items-center ${(i + j) % 2 === 0 ? "bg-green-600" : "bg-slate-200"
                                        }`}
                                >
                                    {square ? (
                                        <div
                                            className={`text-2xl ${square.color === "w" ? "text-white" : "text-black"
                                                }`}
                                        >
                                            <img src={square.color === "b" ? `/${name[square.type]}.png` : `/${name[square.type]}_white.png`} alt={square.type} />
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default ChessBoard