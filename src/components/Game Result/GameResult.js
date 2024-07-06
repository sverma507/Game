// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const DNAME = process.env.REACT_APP_DNAME;

// function GameResult() {
//   const [games, setGames] = useState(null);
//   const [gameResult, setGameResult] = useState({
//     name: '',
//     date: new Date().toISOString().split('T')[0],  // Initialize with today's date
//     result: '',
//     gameId: '',
//     code: ''
//   });

//   const [results, setResults] = useState(null);
//   const [monthlyresults, setMonthlyResults] = useState(null);

//   useEffect(() => {
//     getGames();
//     getGameResults(gameResult.date);
//     getResultByMonth(); // Fetch results initially based on today's date
//   }, []); // This empty array ensures useEffect runs only on mount

//   // Fetch game results whenever gameResult.date changes
//   useEffect(() => {
//     if (gameResult.date) {
//       getGameResults(gameResult.date);
//     }
//   }, [gameResult.date]); // Add gameResult.date as a dependency

//   const getGames = async () => {
//     try {
//       const result = await axios.get(`${DNAME}/getgames`);
//       if (result && result.data) {
//         setGames(result.data);
//       } else {
//         setGames([]);
//       }
//     } catch (error) {
//       console.error('Error fetching games:', error);
//       toast.error("Error fetching games");
//     }
//   };

//   const getGameResults = async (date) => {
//     try {
//       const result = await axios.get(`${DNAME}/getgameresults`, {
//         params: { date },
//       });
//       if (result && result.data) {
//         setResults(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching game results:', error);
//       toast.error('Error fetching game results');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setGameResult((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await axios.post(`${DNAME}/addgameresult`, gameResult);
//       if (result) {
//         toast.success('Result added successfully');
//         getGameResults(gameResult.date); // Fetch results after adding new result
//       } else {
//         toast.error('Failed to add result');
//       }
//       setGameResult({
//         name: '',
//         date: new Date().toISOString().split('T')[0],  // Reset to today's date
//         result: '',
//         gameId: '',
//         code: ''
//       });
//     } catch (error) {
//       console.error('Error adding result:', error);
//       toast.error('Error adding result');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const result = await axios.delete(`${DNAME}/deletegameresult`, { data: { id } });
//       if (result) {
//         toast.success('Result Deleted');
//         getGameResults(gameResult.date); // Fetch results after deleting a result
//       } else {
//         toast.error('Error!!');
//       }
//     } catch (error) {
//       console.error('Error deleting result', error);
//       toast.error('Error deleting result');
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${day}-${month}-${year}`;
//   };

//   const setGameId = (item) => {
//     setGameResult((prev) => ({
//       ...prev,
//       gameId: item._id,
//       code: item.code,
//     }));
//   };

//   // Organize results by date and gameId
//   const resultsByDate = monthlyresults?.reduce((acc, curr) => {
//     const date = formatDate(curr.date);
//     if (!acc[date]) {
//       acc[date] = {};
//     }
//     acc[date][curr.gameId] = curr.result;
//     return acc;
//   }, {}) || {};

//   // Extract unique dates
//   const dates = Object.keys(resultsByDate);

//   const getResultByMonth = async () => {
//     try {
//       // Calculate start and end dates for the current month
//       const currentDate = new Date();
//       const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of current month
//       const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of current month
  
//       const result = await axios.get(`${DNAME}/getgameresultsbymonth`, {
//         params: {
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString(),
//         },
//       });
//       if (result && result.data) {
//         setMonthlyResults(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching game results by month:', error);
//       toast.error('Error fetching game results by month');
//     }
//   };
  
//   return (
//     <>
//       <ToastContainer />
//       <form onSubmit={handleSubmit}>
//         <div className='flex my-6 mx-28 rounded p-4 border border-slate-400 items-end'>
//           <div className='mr-6'>
//             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Game</label>
//             <select
//               name="name"
//               value={gameResult.name}
//               onChange={(e) => {
//                 handleChange(e);
//                 const selectedGame = games.find(game => game.name === e.target.value);
//                 setGameId(selectedGame);
//               }}
//               className='w-60 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//               required
//             >
//               <option>--Select--</option>
//               {games?.map((item, idx) => (
//                 <option key={idx} value={item.name}>{item.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className='mr-6'>
//             <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
//             <input
//               name='date'
//               value={gameResult.date}
//               onChange={handleChange}
//               type="date"
//               id="date"
//               className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder=""
//               required
//             />
//           </div>
//           <div className='mr-6'>
//             <label htmlFor="result" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result</label>
//             <input
//               name='result'
//               value={gameResult.result}
//               onChange={handleChange}
//               type="number"
//               id="result"
//               className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Result"
//             />
//           </div>
//           <button type="submit" className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//         </div>
//       </form>
//       <div className='mx-28 border border-slate-400 py-4 px-2'>
//         <table className='border-collapse w-full'>
//           <thead>
//             <tr>
//               <th className='w-1/4 border border-slate-400'>Name</th>
//               <th className='w-1/4 border border-slate-400'>Date</th>
//               <th className='w-1/4 border border-slate-400'>Result</th>
//               <th className='w-1/4 border border-slate-400'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results?.map((item, idx) => (
//               <tr key={idx}>
//                 <td className='w-1/4 text-center border border-slate-300'>{item.name}</td>
//                 <td className='w-1/4 text-center border border-slate-300'>{formatDate(item.date)}</td>
//                 <td className='w-1/4 text-center border border-slate-300'>{item.result}</td>
//                 <td className='w-1/4 text-center border border-slate-300'>
//                   <div onClick={() => handleDelete(item._id)}>
//                     <i className="fa-solid fa-trash hover:text-red-400 hover:cursor-pointer"></i>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className='mx-28 border border-slate-400 py-4 px-2 mt-4'>
//         <table className='border-collapse w-full'>
//           <thead>
//             <tr>
//               <th className='w-1/4 border border-slate-400'>Date</th>
//               {games?.map((game, index) => (
//                 <th key={index} className='w-1/4 border border-slate-400'>{game.code}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {dates.map((date, idx) => (
//               <tr key={idx}>
//                 <td className='w-1/4 text-center border border-slate-300'>{date}</td>
//                 {games?.map((game, index) => (
//                   <td key={index} className='w-1/4 text-center border border-slate-300'>
//                     {resultsByDate[date]?.[game._id] !== undefined ? resultsByDate[date][game._id] : 'N/A'}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default GameResult;

















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DNAME = process.env.REACT_APP_DNAME;

function GameResult() {
  const [games, setGames] = useState(null);
  const [gameResult, setGameResult] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],  // Initialize with today's date
    result: '',
    gameId: '',
    code: ''
  });

  const [results, setResults] = useState(null);
  const [monthlyResults, setMonthlyResults] = useState(null);

  useEffect(() => {
    getGames();
    getGameResults(gameResult.date);
    getResultByMonth(); // Fetch results initially based on today's date
  }, []); // This empty array ensures useEffect runs only on mount

  // Fetch game results whenever gameResult.date changes
  useEffect(() => {
    if (gameResult.date) {
      getGameResults(gameResult.date);
    }
  }, [gameResult.date]); // Add gameResult.date as a dependency

  const getGames = async () => {
    try {
      const result = await axios.get(`${DNAME}/getgames`);
      if (result && result.data) {
        setGames(result.data);
      } else {
        setGames([]);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error("Error fetching games");
    }
  };

  const getGameResults = async (date) => {
    try {
      const result = await axios.get(`${DNAME}/getgameresults`, {
        params: { date },
      });
      if (result && result.data) {
        setResults(result.data);
      }
    } catch (error) {
      console.error('Error fetching game results:', error);
      toast.error('Error fetching game results');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameResult((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${DNAME}/addgameresult`, gameResult);
      if (result) {
        toast.success('Result added successfully');
        getGameResults(gameResult.date);
        getResultByMonth() // Fetch results after adding new result
      } else {
        toast.error('Failed to add result');
      }
      setGameResult({
        name: '',
        date: new Date().toISOString().split('T')[0],  // Reset to today's date
        result: '',
        gameId: '',
        code: ''
      });
    } catch (error) {
      console.error('Error adding result:', error);
      toast.error('Error adding result');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${DNAME}/deletegameresult`, { data: { id } });
      if (result) {
        toast.success('Result Deleted');
        getGameResults(gameResult.date);
        getResultByMonth() // Fetch results after deleting a result
      } else {
        toast.error('Error!!');
      }
    } catch (error) {
      console.error('Error deleting result', error);
      toast.error('Error deleting result');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const setGameId = (item) => {
    setGameResult((prev) => ({
      ...prev,
      gameId: item._id,
      code: item.code,
    }));
  };

  // Organize results by date and gameId
  const resultsByDate = monthlyResults?.reduce((acc, curr) => {
    const date = formatDate(curr.date);
    if (!acc[date]) {
      acc[date] = {};
    }
    acc[date][curr.gameId] = curr.result;
    return acc;
  }, {}) || {};

  // Extract unique dates and sort them
  const dates = Object.keys(resultsByDate).sort();

  const getResultByMonth = async () => {
    try {
      // Calculate start and end dates for the current month
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of current month
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of current month
  
      const result = await axios.get(`${DNAME}/getgameresultsbymonth`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      if (result && result.data) {
        setMonthlyResults(result.data);
      }
    } catch (error) {
      console.error('Error fetching game results by month:', error);
      toast.error('Error fetching game results by month');
    }
  };
  
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className='flex my-6 mx-28 rounded p-4 border border-slate-400 items-end'>
          <div className='mr-6'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Game</label>
            <select
              name="name"
              value={gameResult.name}
              onChange={(e) => {
                handleChange(e);
                const selectedGame = games.find(game => game.name === e.target.value);
                setGameId(selectedGame);
              }}
              className='w-60 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            >
              <option>--Select--</option>
              {games?.map((item, idx) => (
                <option key={idx} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='mr-6'>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input
              name='date'
              value={gameResult.date}
              onChange={handleChange}
              type="date"
              id="date"
              className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className='mr-6'>
            <label htmlFor="result" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result</label>
            <input
              name='result'
              value={gameResult.result}
              onChange={handleChange}
              type="number"
              id="result"
              className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Result"
            />
          </div>
          <button type="submit" className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
      <div className='mx-28 border border-slate-400 py-4 px-2'>
        <table className='border-collapse w-full'>
          <thead>
            <tr>
              <th className='w-1/4 border border-slate-400'>Name</th>
              <th className='w-1/4 border border-slate-400'>Date</th>
              <th className='w-1/4 border border-slate-400'>Result</th>
              <th className='w-1/4 border border-slate-400'>Action</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((item, idx) => (
              <tr key={idx}>
                <td className='w-1/4 text-center border border-slate-300'>{item.name}</td>
                <td className='w-1/4 text-center border border-slate-300'>{formatDate(item.date)}</td>
                <td className='w-1/4 text-center border border-slate-300'>{item.result}</td>
                <td className='w-1/4 text-center border border-slate-300'>
                  <div onClick={() => handleDelete(item._id)}>
                    <button className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mx-28 border border-slate-400 py-4 px-2 mt-6'>
        <table className='border-collapse w-full'>
          <thead>
            <tr>
              <th className='border border-slate-400 p-2'>Date</th>
              {games?.map((game, index) => (
                <th key={index} className='border border-slate-400 p-2'>{game.code}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => (
              <tr key={index}>
                <td className='border border-slate-400 p-2 text-center'>{date}</td>
                {games?.map((game, idx) => (
                  <td key={idx} className='border border-slate-400 p-2 text-center'>
                    {resultsByDate[date] && resultsByDate[date][game._id] ? resultsByDate[date][game._id] : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GameResult;






