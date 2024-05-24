import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        const user = {
            email : email,
            password : password,
        };
        try{
            const {data} = await axios.post('http://127.0.0.1:8000/api/token/',user,{
                headers:
                {'Content-Type' : 'application/json'},
            });
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            navigate('/home');
        }catch(error){
            console.log("Error while Logging in ", error);
        }
    }
    return(
       
        <div className="flex justify-center items-center">
    <div className="w-6/12 bg-gray-50 py-14 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-semibold">Welcome</h1>
        <p className="text-lg font-medium text-gray-600 mt-4">Please enter your details</p>
        <div className="mt-8">
            <form onSubmit={submit}>
            <div>
                <label className="text-lg font-medium block mr-56">Email</label>
                <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-72 border-2 border-gray-100 rounded p-3 mt-1" required/>
            </div>
            <div>
                <label className="text-lg font-medium block mr-48">Password</label>
                <input className="w-72 border-2 border-gray-100 rounded p-3 mt-1" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required/>
            </div>
            <button type="submit" className="bg-blue-700 text-white rounded w-28 mt-4 h-10 hover:bg-blue-500">Sign in</button>
            <p className="mt-2">Don't have an account? <Link to={'/register'} className="font-medium text-base text-blue-500">Sign Up</Link></p>
            </form>
        </div>
    </div>
</div>

    )
}

export default Login