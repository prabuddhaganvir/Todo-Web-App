import mongoose from "mongoose";
import UserTodo from "../models/todo.model.js";


export const getTodos = async(req, res) => {
  try {
    const allTodos = await UserTodo.find({});
    res.send(allTodos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching todos'});
  }
}

export const saveTodos = async(req, res) => {
    
    try {

        const {title} = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newTodo = new UserTodo({
            title,
        });
        const saveTodo = await newTodo.save();
        res.status(201).json(saveTodo);
    } catch (error) {
        
    }
}

export const updateTodo = async(req, res) => {

    
    try {
       const { id } = req.params;
       const { title } = req.body;

       if(!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ message: 'Invalid ID format' });
       }

         if (!title) {
              return res.status(400).json({ message: 'title are required' });
         }

       const todo = await UserTodo.findByIdAndUpdate( id, {title}, {new: true});
         res.status(200).json({ message: 'Todo updated successfully', todo });
       // Log the updated todo for debugging  
       console.log(todo);
       
    
   } catch (error) {
    console.log("Error in updateTodo Controller:", error);
    
         res.status(500).json({ message: 'Error updating todo', error: error.message });
   }
}

export const delTodo = async(req, res) => {

try {
     const {id} = req.params;
    //  const {title} = req.body;
    //  if (!title) {
    //      return res.status(400).json({ message: 'Title is required' });
    //  }
     if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: 'Invalid ID format' });
     }
      const todo = await UserTodo.findByIdAndDelete(id);
     if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' }); 

} catch (error) {

  console.error('Error deleting todo Controller:', error);
  res.status(500).json({ message: 'Internal Server Error', error: error.message });
    
}
 
}