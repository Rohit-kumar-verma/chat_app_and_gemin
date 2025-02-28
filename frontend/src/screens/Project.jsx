import React from 'react'
import { useLocation } from 'react-router-dom';


const Project=()=>{
  const location= useLocation()

    console.log(location.state);
  return (
    <main className='h-screen w-screen flex'>
      <section className='left-section flex flex-col h-full min-w-72 bg-slate-300'>
        <header className='flex justify-end p-2 px-4 w-full bg-slate-200'>
        <button>
          <i className="ri-group-fill"></i> 
          </button>
        </header>
        <div className='coversational-area flex-grow flex flex-col'>
          <div className='message-box flex-grow flex flex-col gap-1'>
            <div className='message max-w-56 bg-slate-100 border rounded-md p-2'>
              <small className='text-xs opacity-60'>Email@gmail.com</small>
              <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className='message ml-auto max-w-56 bg-slate-100 border rounded-md p-2'>
              <small className='text-xs opacity-60'>Email@gmail.com</small>
              <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className='input-field flex w-full'>
            <input className='p-2 px-4 border-none outline-none' type='text' placeholder='Enter the text'/>
            <button type='button' className='flex-grow px-4'>
            <i className="ri-send-plane-fill"></i>
              </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Project
