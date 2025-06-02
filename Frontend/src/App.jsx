import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

function App() {


  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [ isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null); 

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim()) return; // avoid empty input

  try {
    if (isUpdate && currentId) {
      // 🛠 UPDATE existing todo
      const res = await axios.put(`/api/update/${currentId}`, { title });
      if (res.status === 200) {
        console.log('Todo updated successfully');
      }
    } else {
      // ➕ CREATE new todo
      const res = await axios.post('/api/save', { title });
      if (res.status === 201) {
        console.log('Todo created successfully');
      }
    }

    // Reset form
    setTitle('');
    setIsUpdate(false);
    setCurrentId(null);
    fetchTodos(); // refresh

  } catch (error) {
    console.error('Error submitting todo:', error.response?.data || error.message);
  }
};



  const fetchTodos = async () => {
  try {
    const res = await axios.get('/api/');
    setTodos(res.data);
    console.log('Todos fetched successfully:', res.data);

  } catch (error) {
    console.log('Error fetching todos:', error);
  }
}

useEffect(()=>{
   fetchTodos();
},[])

const deleteTodo = async (id) => {
   console.log('deleteTodo called with id:', id); 
   const res = await axios.delete(`/api/delete/${id}`);
   console.log(res);
   
    if (res.status === 200) {
      console.log('Todo deleted successfully:', res.data);
      fetchTodos(); // Refresh the todo list after deletion
    } else {
      console.error('Error deleting todo:', res.statusText);
    }
 }


const startEditing = (todo) => {
  setTitle(todo.title);
  setIsUpdate(true);
  setCurrentId(todo._id); // 🧠 now we know which todo to update
};
  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen bg-gray-700 '>
      <h1 className='text-3xl font-bold mb-8'>Todo App</h1>
      <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center gap-4'>
      <input type="text" placeholder="Today's Task" name='title' value ={title} className="input input-md w-[400px] input-success" onChange={(e)=>setTitle(e.target.value)} />

      <button className="btn btn-success btn-soft" type='submit'>
        {isUpdate ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
      </form>


<div className='mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-2 p-4'>
    {
          todos.map((todo) => (
            <div key={todo._id} className='flex justify-between items-center bg-zinc-900 p-4 mb-2 rounded-lg'>
              <h2>{todo.title}</h2>
                <div className='flex gap-3'>
              <button
              className='btn btn-success btn-soft'
              onClick={() => startEditing(todo)}>
<RiEdit2Fill className='text-xl' /></button>
              <button className='btn btn-error btn-soft' onClick={() => deleteTodo(todo._id)}>
<MdDelete className='text-xl' /></button>
</div>
            </div>
          ))
        
      }
    
</div>
    
    </div>
   
    </>
  )
}

export default App
