import mongoose from 'mongoose';

export interface Move {
    roomId: string;
    from: string;
    to: string;
    player: string;
    moveNumber: number;
    currBoard: string;
    timestamp: Date;
}

const moveSchema = new mongoose.Schema<Move>({
    roomId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    player: { type: String, required: true },
    moveNumber: { type: Number, required: true },
    currBoard: { type: String, required: true },  // FEN string representing the current board state
    timestamp: { type: Date, default: Date.now }
});

export const MoveModel = mongoose.models?.Move || mongoose.model('Move', moveSchema);
