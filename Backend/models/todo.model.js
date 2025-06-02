import mongoose from "mongoose";

const userTodoSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            
        }
    }
,{timestamps: true});

const UserTodo = mongoose.model("UserTodo", userTodoSchema);

export default UserTodo;