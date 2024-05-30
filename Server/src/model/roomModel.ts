import mongoose from 'mongoose';

export interface Room {
    roomId: string;
    player1: string;
    player2: string;
    startTime: Date;
    endTime?: Date;
}

const roomSchema = new mongoose.Schema<Room>({
    roomId: { type: String, required: true, unique: true },
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date }
});

export const RoomModel = mongoose.models?.Room || mongoose.model('Room', roomSchema);
