// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// const DNAME = process.env.REACT_APP_DNAME;

// function ResultTable() {
//   const [gamename, setGameName] = useState([]);
//   const [yesterdayResults, setYesterdayResults] = useState([]);
//   const [todayResults, setTodayResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getGames();
//     getGameResults();
//   }, []);

//   const getGames = async () => {
//     try {
//       const result = await axios.get(`${DNAME}/getgames`);
//       if (result && result.data) {
//         setGameName(result.data);
//       } else {
//         setGameName([]);
//       }
//     } catch (error) {
//       console.error('Error fetching games:', error);
//       toast.error("Error fetching games");
//     }
//   };

//   const getGameResults = async () => {
//     try {
//       const [todayResult, yesterdayResult] = await Promise.all([
//         axios.get(`${DNAME}/getgameresults`, { params: { date: new Date().toISOString().split('T')[0] } }),
//         axios.get(`${DNAME}/getgameresults`, { params: { date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] } })
//       ]);

//       if (todayResult && todayResult.data) {
//         setTodayResults(todayResult.data);
//       }
//       if (yesterdayResult && yesterdayResult.data) {
//         setYesterdayResults(yesterdayResult.data);
//       }
//     } catch (error) {
//       console.error('Error fetching game results:', error);
//       toast.error('Error fetching game results');
//     }
//   };

//   const formatTime = (time) => {
//     let [hour, minute] = time.split(':');
//     let ampm = hour >= 12 ? 'PM' : 'AM';
//     hour = hour % 12 || 12; // Convert hour to 12-hour format
//     return `${hour}:${minute} ${ampm}`;
//   };

//   const getResult = (results, gameId) => {
//     const result = results.find(result => result.gameId === gameId);
//     return result ? result.result : null;
//   };

//   return (
//     <div className='snap-x'>
//       <table className='w-screen snap-center '>
//         <thead>
//           <tr className='bg-black text-white text-center'>
//             <th className='w-1/3 border border-black'>सट्टा का नाम</th>
//             <th className='w-1/3 border border-black'>कल आया था</th>
//             <th className='w-1/3 border border-black'>आज का रिज़ल्ट</th>
//           </tr>
//         </thead>
//         <tbody>
//           {gamename?.map((item, idx) => (
//             <tr className='text-center h-16' key={idx}>
//               <td className='w-1/3 border border-black bg-yellow-400'>
//                 <div onClick={() => navigate('/custommonthlychart')} className='text-xl font-bold hover:text-blue-600 hover:cursor-pointer'>
//                   {item.name}
//                 </div>
//                 <div>{formatTime(item.resultTime)}</div>
//               </td>
//               <td className='w-1/3 border border-black'>
//                 {getResult(yesterdayResults, item._id) || '-'}
//               </td>
//               <td className='flex justify-center items-center h-16 border border-black '>
//                 {getResult(todayResults, item._id) || <img className='h-10' src={require("./d.gif")}/>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <ToastContainer />
//     </div>
//   );
// }

// export default ResultTable;









import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const DNAME = process.env.REACT_APP_DNAME;

function ResultTable() {
  const [gamename, setGameName] = useState([]);
  const [yesterdayResults, setYesterdayResults] = useState([]);
  const [todayResults, setTodayResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGames();
    getGameResults();
  }, []);

  const getGames = async () => {
    try {
      const result = await axios.get(`${DNAME}/getgames`);
      if (result && result.data) {
        setGameName(result.data);
      } else {
        setGameName([]);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error("Error fetching games");
    }
  };

  const getGameResults = async () => {
    try {
      const [todayResult, yesterdayResult] = await Promise.all([
        axios.get(`${DNAME}/getgameresults`, { params: { date: new Date().toISOString().split('T')[0] } }),
        axios.get(`${DNAME}/getgameresults`, { params: { date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] } })
      ]);

      if (todayResult && todayResult.data) {
        setTodayResults(todayResult.data);
      }
      if (yesterdayResult && yesterdayResult.data) {
        setYesterdayResults(yesterdayResult.data);
      }
    } catch (error) {
      console.error('Error fetching game results:', error);
      toast.error('Error fetching game results');
    }
  };

  const formatTime = (time) => {
    let [hour, minute] = time.split(':');
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${hour}:${minute} ${ampm}`;
  };

  const getResult = (results, gameId) => {
    const result = results.find(result => result.gameId === gameId);
    return result ? result.result : null;
  };

  return (
    <div className=''>
      <table className='w-full overflow-x-auto'>
        <thead>
          <tr className='bg-black text-white text-center'>
            <th className='w-1/3 border border-black'>सट्टा का नाम</th>
            <th className='w-1/3 border border-black'>कल आया था</th>
            <th className='w-1/3 border border-black'>आज का रिज़ल्ट</th>
          </tr>
        </thead>
        <tbody>
          {gamename?.map((item, idx) => (
            <tr className='text-center h-16 snap-start' key={idx}>
              <td className='w-1/3 border border-black bg-yellow-400'>
                <div onClick={() => navigate('/custommonthlychart')} className='text-xl font-bold hover:text-blue-600 hover:cursor-pointer'>
                  {item.name}
                </div>
                <div>{formatTime(item.resultTime)}</div>
              </td>
              <td className='w-1/3 border border-black'>
                {getResult(yesterdayResults, item._id) || '-'}
              </td>
              <td className='flex justify-center items-center h-16 border border-black'>
                {getResult(todayResults, item._id) || <img className='h-10' src={require("./d.gif")} alt="Loading" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ResultTable;

