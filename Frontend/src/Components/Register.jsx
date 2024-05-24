import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        const user = {
            username : name,
            email : email,
            password : password
        };
        try{
            await axios.post('http://127.0.0.1:8000/api/register/',user)
            navigate('/');
        }catch(error){
            console.log("error while registering ", error);
        }
    }
    return(
        <div className="flex justify-center items-center">
        <div className="w-6/12 bg-gray-50 py-14 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-medium">Sign Up</h1>
            <p className="text-lg font-medium text-gray-600 mt-4">Please register your account</p>
            <div className="mt-8">
                <form onSubmit={submit}>
            <div>
                    <label className="text-lg font-medium block mr-56">Name</label>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-72 border-2 border-gray-100 rounded p-3 mt-1" required/>
                </div>
                <div>
                    <label className="text-lg font-medium block mr-56">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="w-72 border-2 border-gray-100 rounded p-3 mt-1" required/>
                </div>
                <div>
                    <label className="text-lg font-medium block mr-48">Password</label>
                    <input className="w-72 border-2 border-gray-100 rounded p-3 mt-1" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required/>
                </div>
                <button type="submit" className="bg-blue-700 text-white rounded w-28 mt-4 h-10 hover:bg-blue-500">Sign Up</button>
                <p className="mt-2">Already have an account? <Link to={'/'} className="font-medium text-base text-blue-500">Sign In</Link></p>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Register