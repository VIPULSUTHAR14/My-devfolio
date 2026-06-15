import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        name: {
            type: String,
            required: [true, "Sender name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Sender email is required"],
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: [true, "Message content is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Message: Model<IMessage> =
    mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
