const Card = ({project}) => {
    return(
        <div className="bg-red-100 h-64 w-48 p-4 rounded-lg overflow-auto shadow-xl hover:scale-105">
        
            <h1 className="mt-8 font-bold text-2xl">{project.name}</h1>
            <p className="mt-6 whitespace-normal font-sans">{project.description}</p>
        </div>
        
    )
}

export default Card