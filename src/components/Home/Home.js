import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DNAME = process.env.REACT_APP_DNAME;
function Home() {
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    phoneNo: ''
  });

  useEffect(()=>{
    getData();
  },[])

  const getData=async()=>{
    const result=await axios.get(`${DNAME}/getowner`)
    if(result){
      console.log("result=>",result.data);
      if(result.data.length<=0){
        setOwnerInfo({
          name:'',
          phoneNo:''
        })
      }
      else{
        const {name,phoneNo}=result.data[0]
        setOwnerInfo({
          name,phoneNo
        })
      }
      // if(result.data.length>1)
      //   {
      //     await axios.post(`${DNAME}/deletemany`)
      //   }
    }
    else{
      console.log("data");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(`${DNAME}/addowner`,ownerInfo);
    if (result) {
      toast("Success");
    } else {
      toast("Error");
    }
    console.log("info=>", ownerInfo);
    setOwnerInfo({
      name: '',
      phoneNo: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='flex my-6 mx-28 rounded p-4 border border-slate-400 items-end'>
        <div>
          <div className='mr-6'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input name='name' value={ownerInfo.name} onChange={(e) => handleChange(e)} type="text" id="first_name" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
        </div>
        <div className='mr-6'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
          <input name='phoneNo' value={ownerInfo.phoneNo} onChange={(e) => handleChange(e)} type="number" id="first_name" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>

        <button type="submit" className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
    </form>
  );
}

export default Home;
