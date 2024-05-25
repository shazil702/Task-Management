import { Link, useNavigate } from "react-router-dom"
import Card from "./Card"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    useEffect(()=> {
        const fetchProjects = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/getProjects/',{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setProjects(response.data);
            }catch(error){
                console.log("Error while fetching ",error);
            }
        };
        fetchProjects();
    },[])
    const check = projects.length > 0? true : false;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-medium">Home page</h1>
                <div className="float-right">
                    <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Log out</button>
                    <Link to="/addProject">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">Add Project</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap justify-start gap-6 mt-8">
                {check && projects.map((project) => (
                    <Link to={`/editProject?projectid=${project.id}`} key={project.id}>
                        <Card project={project} />
                    </Link>
                ))}
                {!check && (
                    <p className="text-lg font-semibold text-gray-600 mt-8">You don't have any projects. Please add some.</p>
                )}
            </div>
        </div>
    );
}

export default Home