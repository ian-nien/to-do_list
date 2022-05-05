import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo {
    item: string;
    description: string;
    check: boolean;
    order: number;
}

export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
    {
        item: { type: String, required: true },
        description: { type: String, required: false },
        check: { type: Boolean, required: true },
        order: { type: Number, required: true }
    },
    {
        timestamps: false,
        versionKey: false
    }
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
