import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams,Link } from "react-router-dom"

const EditProjects = () => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('projectid');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [todoName, setToDoName] = useState('');
    const date = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/handleProject/${projectId}`,{
                    headers:{
                        'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
              console.log(response);
              setProjectName(response.data['project data'].name)
              setDescription(response.data['project data'].description)
              setTodos(response.data['Todo data'])

            }catch(error){
                console.log("Error while fetching ",error);
            }
        }
        fetchData();
    },[projectId])
   
    const handleAddTodo = () => {
      setTodos([...todos, {id:null, name:todoName, completed:false, date:date}]);
      setToDoName('');
    };

    const deleteToDo = async (id) => {
        try{
            setTodos(todos.filter(todo => todo.id !== id))
            await axios.delete(`http://127.0.0.1:8000/api/handleProject/${id}`,{
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            
        }catch (error) {
            console.log("error while deleting", error);
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try{
          const projectData = {
            name:projectName,
            description:description
          };
      
        const todosData = todos.map(todo => ({
            id: todo.id || null, 
            name: todo.name,
            completed: todo.completed,
            date: todo.date
          }));
          console.log(todosData);
          const response = await axios.put(`http://127.0.0.1:8000/api/handleProject/${projectId}/`,{
            project : projectData,
            todos : todosData
          },{
            headers:{
              'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type' : 'application/json'
            }
          });
          console.log(response.data);
         
        }catch (error) {
          console.log('error while updating ',error);
        }
      };

    return(
        <div className="bg-gray-200 min-h-screen p-8">
        <form onSubmit={handleSubmit}>
        <Link to={'/home'}>
            <button className="float-right text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Home</button>
            </Link>
      <div className="mb-8">
        <label className="text-2xl font-medium block mb-2">Project Name</label>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="abc" className="h-12 w-full max-w-md p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="flex justify-between mt-12 relative">
        <div className="w-1/3">
          <label className="text-lg font-medium block mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter your description here" className="w-full h-36 p-2 border border-gray-300 rounded-md resize-none"/>
        </div>
        <div className="absolute top-0 bottom-0 left-1/2 border-l border-gray-500"></div>
        <div className="w-1/3 max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-2">
            <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
          </div>
          <form className="w-full max-w-sm mx-auto px-4 py-2">
            <div className="flex items-center border-b-2 border-teal-500 py-2">
              <input onChange={(e) => setToDoName(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" placeholder="Add a task"
              />
              <button onClick={handleAddTodo}
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button">
                Add
              </button>
            </div>
          </form>
          <ul className="divide-y divide-gray-200 px-4">
            {todos.map((todo, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center">
                <input type="checkbox"  checked={todo.completed} onChange={(e) => {
                    const updatedTodos = [...todos];
                    updatedTodos[index].completed = e.target.checked;
                    setTodos(updatedTodos);
                  }}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="todo1" className="ml-3 block text-gray-900">
                  <span className="text-lg font-medium">{todo.name} </span>
                  <span className="text-sm font-light text-gray-500">{todo.date}</span>
                  <span onClick={() => deleteToDo(todo.id)}>❌</span>
                </label>
              </div>
            </li>
         ))}
          </ul>
        </div>
      </div>
      <button type="submit" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save Project
         </button>
      </form>
    </div>
    )
}
export default EditProjects