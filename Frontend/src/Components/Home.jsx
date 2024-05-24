import { Link } from "react-router-dom"
import Card from "./Card"

const Home = () => {
    return(
        <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium">Home page</h1>
            <Link to="/addProject">
                <button className="float-right">Add Project</button>
            </Link>
        </div>
        <div className="flex flex-wrap justify-start gap-6">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
    
    )
}

export default Home