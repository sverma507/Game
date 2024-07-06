import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const DNAME = process.env.REACT_APP_DNAME;
function Login({update}) {
    const navigate=useNavigate();
    const [data,setData]=useState({
        name:'',
        password:''
    })

    const handleChange=(e)=>{
        const {name,value}=e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login=>", data);

        try {
            const result = await axios.post(`${DNAME}/login`, data);
            if (result.data) {
                toast.success("Logged in");
                navigate('/admin/home')
                update()
            } else {
                toast.error("Enter valid details");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };
    return (
        <>
        <ToastContainer />
            <div className='h-screen w-screen flex justify-center items-center'>
                <div className='h-96 w-96 rounded-lg border border-slate-400 shadow-2xl flex flex-col justify-center items-center'>
                    <div className='m-4 w-36 h-36 rounded-full border border-slate-500' style={{ backgroundImage: `url(${require('./login.jpeg')})` }} ></div>
                    <div >
                        <form className='h-52 flex flex-col justify-evenly' onSubmit={handleSubmit}>
                            <div>
                                <input name='name' onChange={(e)=>{handleChange(e)}} value={data.name} type="text" id="name" className="text-center w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="login" required />
                            </div>
                            <div>
                                <input name='password' onChange={(e)=>{handleChange(e)}} value={data.password} type="password" id="password" className="text-center w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="****" required />
                            </div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login





