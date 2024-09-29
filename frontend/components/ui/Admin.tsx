import React from 'react'

const Admin = () => {
  return (
    <div className='w-[18%] min-h-screen border border-gray-500'>
    <div className='py-5 px-7'>Admin</div>
    <ul className='text-sm px-7'>
        <li className='py-2 pl-2 hover:border-gray-500 hover:border rounded-md cursor-pointer'>Blog</li>
        <li className='py-2 pl-2 hover:border-gray-500 hover:border rounded-md cursor-pointer'>Member</li>
        <li className='py-2 pl-2 hover:border-gray-500 hover:border rounded-md cursor-pointer'>Events</li>
        <li className='py-2 pl-2 hover:border-gray-500 hover:border rounded-md cursor-pointer'>Contact</li>
    </ul>
    </div>
  )
}

export default Admin