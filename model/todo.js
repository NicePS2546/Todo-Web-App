import mongoose, { Schema, model, models } from "mongoose";

const todo_list = new Schema({
    userId:{
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description:{
        type: String,
        require:true,
    }

}, {timestamps:true});

const Todo = models.Todo || mongoose.model("todo lists", todo_list);
export default Todo;