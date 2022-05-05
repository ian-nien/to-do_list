import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo {
    item: string;
    description: string;
    check: boolean;
}

export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
    {
        item: { type: String, required: true },
        description: { type: String, required: false },
        check: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
