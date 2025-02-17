import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios'

function Home() {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');

    function createProject(e) {
        e.preventDefault();
        console.log("Project Name:", projectName);
        axios.post('/projects/create',{
          name:projectName
        })
        .then((res)=>{
          setIsModalOpen(false);
        })
        .catch((error)=>{
          console.log(error);
        })
    }

    return (
        <main className='p-4'>
            <div className='projects'>
                <button 
                    className='p-4 font-bold border border-slate-300 rounded-md' 
                    onClick={() => setIsModalOpen(true)}
                >
                 Project   <i className="ri-link ml-2"></i>
                </button>
            </div>
            
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <input 
                                type="text" 
                                placeholder="Enter Project Name" 
                                className="w-full p-2 border rounded mb-4"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button 
                                    type="button" 
                                    className="px-4 py-2 bg-gray-300 rounded" 
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home;
