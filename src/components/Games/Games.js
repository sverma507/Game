import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DNAME = process.env.REACT_APP_DNAME;

function Games() {
  const [submit, setSubmit] = useState(true);
  const [gameInfo, setGameInfo] = useState({
    name: '',
    code: '',
    resultTime: '',
    showNumber: ''
  });

  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    try {
      const result = await axios.get(`${DNAME}/getgames`);
      if (result && result.data) {
        console.log("games=>", result.data);
        setGames(result.data);
      } else {
        setGames([]);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error("Error fetching games");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${DNAME}/addgame`, gameInfo);
      if (result) {
        toast.success("Game added successfully");
        getGames();  // Refresh games list after adding
      } else {
        toast.error("Failed to add game");
      }
      console.log("info=>", gameInfo);
      setGameInfo({
        name: '',
        code: '',
        resultTime: '',
        showNumber: ''
      });
    } catch (error) {
      console.error('Error adding game:', error);
      toast.error("Error adding game");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${DNAME}/deletegame`, { data: { id } });
      if (result) {
        toast.success("Deleted");
        getGames();
      } else {
        toast.error("Error!!");
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error("Error deleting game");
    }
  };

  const handleUpdate = (idx) => {
    setSubmit(!submit);
    setGameInfo(games[idx]);
  };

  const submitUpdate = async () => {
    try {
      const result = await axios.put(`${DNAME}/updategame`, gameInfo);
      if (result) {
        toast.success("Updated");
        getGames();
      } else {
        toast.error("Failed to update game");
      }
    } catch (error) {
      console.error('Error updating game:', error);
      toast.error("Error updating game");
    }
  };

  const formatTime = (time) => {
    let [hour, minute] = time.split(':');
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={submit ? handleSubmit : submitUpdate}>
        <div className='flex my-6 mx-28 rounded p-4 border border-slate-400 items-end'>
          <div className='mr-6'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input value={gameInfo.name} onChange={handleChange} name='name' type="text" id="name" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div className='mr-6'>
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
            <input value={gameInfo.code} onChange={handleChange} name='code' type="text" id="code" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="JKLM" required />
          </div>
          <div className='mr-6'>
            <label htmlFor="result_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result Time</label>
            <input value={gameInfo.resultTime} onChange={handleChange} name='resultTime' type="time" id="result_time" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className='mr-6'>
            <label htmlFor="show_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Show Number</label>
            <input value={gameInfo.showNumber} onChange={handleChange} name='showNumber' type="number" id="show_number" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0..." required />
          </div>
          <button type="submit" className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{submit ? "Submit" : "Update"}</button>
        </div>
      </form>

      <div className='mx-28 border border-slate-400 py-4 px-2'>
        <table className='border-collapse'>
          <thead>
            <tr>
              <th className='w-56 border border-slate-400'>Name</th>
              <th className='w-36 border border-slate-400'>Code</th>
              <th className='w-52 border border-slate-400'>Result Time</th>
              <th className='w-28 border border-slate-400'>Show Number</th>
              <th className='w-32 border border-slate-400'>Status</th>
              <th className='w-56 border border-slate-400'>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((item, idx) => (
              <tr key={idx}>
                <td className='w-56 text-center border border-slate-300'>{item.name}</td>
                <td className='w-36 text-center border border-slate-300'>{item.code}</td>
                <td className='w-52 text-center border border-slate-300'>{formatTime(item.resultTime)}</td>
                <td className='w-28 text-center border border-slate-300'>{item.showNumber}</td>
                <td className='w-32 text-center border border-slate-300'>Active</td>
                <td className='w-56 flex justify-evenly text-center border border-slate-300'>
                  <div className='hover:text-green-400 hover:cursor-pointer' onClick={() => handleUpdate(idx)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                  <div className='hover:text-red-400 hover:cursor-pointer' onClick={() => handleDelete(item._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Games;
