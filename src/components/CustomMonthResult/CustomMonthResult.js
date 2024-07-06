// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const DNAME = process.env.REACT_APP_DNAME;
// function CustomMonthResult() {
//     const [games, setGames] = useState(null);
//     const [gameResult, setGameResult] = useState({
//       name: '',
//       date: new Date().toISOString().split('T')[0],  // Initialize with today's date
//       result: '',
//       gameId: '',
//       code: ''
//     });
  
//     const [results, setResults] = useState(null);
//     const [monthlyResults, setMonthlyResults] = useState(null);
  
//     useEffect(() => {
//       getGames();
//       getGameResults(gameResult.date);
//       getResultByMonth(); // Fetch results initially based on today's date
//     }, []); // This empty array ensures useEffect runs only on mount
  
//     // Fetch game results whenever gameResult.date changes
//     useEffect(() => {
//       if (gameResult.date) {
//         getGameResults(gameResult.date);
//       }
//     }, [gameResult.date]); // Add gameResult.date as a dependency
  
//     const getGames = async () => {
//       try {
//         const result = await axios.get(`${DNAME}/getgames`);
//         if (result && result.data) {
//           setGames(result.data);
//         } else {
//           setGames([]);
//         }
//       } catch (error) {
//         console.error('Error fetching games:', error);
//         toast.error("Error fetching games");
//       }
//     };
  
//     const getGameResults = async (date) => {
//       try {
//         const result = await axios.get(`${DNAME}/getgameresults`, {
//           params: { date },
//         });
//         if (result && result.data) {
//           setResults(result.data);
//         }
//       } catch (error) {
//         console.error('Error fetching game results:', error);
//         toast.error('Error fetching game results');
//       }
//     };
  
  
  
  
//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       return `${day}-${month}-${year}`;
//     };
  
  
  
//     // Organize results by date and gameId
//     const resultsByDate = monthlyResults?.reduce((acc, curr) => {
//       const date = formatDate(curr.date);
//       if (!acc[date]) {
//         acc[date] = {};
//       }
//       acc[date][curr.gameId] = curr.result;
//       return acc;
//     }, {}) || {};
  
//     // Extract unique dates and sort them
//     const dates = Object.keys(resultsByDate).sort();
  
//     const getResultByMonth = async () => {
//       try {
//         // Calculate start and end dates for the current month
//         const currentDate = new Date();
//         const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of current month
//         const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of current month
    
//         const result = await axios.get(`${DNAME}/getgameresultsbymonth`, {
//           params: {
//             startDate: startDate.toISOString(),
//             endDate: endDate.toISOString(),
//           },
//         });
//         if (result && result.data) {
//           setMonthlyResults(result.data);
//         }
//       } catch (error) {
//         console.error('Error fetching game results by month:', error);
//         toast.error('Error fetching game results by month');
//       }
//     };
  
//     const currentDate = new Date();
//   const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
//   return (
//     <div>
//       <div className="p-4 font-bold text-4xl border-2 border-black bg-yellow-400 flex justify-center items-center">
//                 <input type=''/>
//             </div>
//        <div className=''>
//         <table className='border-collapse w-full'>
//           <thead>
//             <tr className='bg-yellow-200 text-center border border-slate-400 p-2 text-2xl'>
//             <th colspan="12  ">
//                 Monthly Result Chart of {currentMonthName}
//                 </th>
//             </tr>
//             <tr>
//               <th className='bg-yellow-200 border border-slate-400 p-2'>Date</th>
//               {games?.map((game, index) => (
//                 <th key={index} className='border border-slate-400 p-2 bg-yellow-200'>{game.code}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {dates.map((date, index) => (
//               <tr key={index}>
//                 <td className='border border-slate-400 p-2 text-center bg-yellow-200'>{date}</td>
//                 {games?.map((game, idx) => (
//                   <td key={idx} className='border border-slate-400 p-2 text-center'>
//                     {resultsByDate[date] && resultsByDate[date][game._id] ? resultsByDate[date][game._id] : '-'}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default CustomMonthResult


















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DNAME = process.env.REACT_APP_DNAME;

function CustomMonthResult() {

  const [games, setGames] = useState(null);
  const [monthlyResults, setMonthlyResults] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getGames();
    getResultByMonth(selectedDate);
  }, [selectedDate]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const resultsByDate = monthlyResults?.reduce((acc, curr) => {
    const date = formatDate(curr.date);
    if (!acc[date]) {
      acc[date] = {};
    }
    acc[date][curr.gameId] = curr.result;
    return acc;
  }, {}) || {};

  const dates = Object.keys(resultsByDate).sort();

  const getResultByMonth = async (date) => {
    try {
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
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

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split('-');
    setSelectedDate(new Date(year, month - 1));
  };



  return (
    <div>
      <div className="p-4 font-bold text-4xl border-2 border-black bg-yellow-400 flex justify-center items-center">
        <input
          type="month"
          value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
          onChange={handleDateChange}
          className="text-black p-2 rounded"
        />
      </div>
      <div>
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-yellow-200 text-center border border-slate-400 p-2 text-2xl">
              <th colSpan="20">
                Monthly Result Chart
              </th>
            </tr>
            <tr>
              <th className="bg-yellow-200 border border-slate-400 p-2">Date</th>
              {games?.map((game, index) => (
                <th key={index} className="border border-slate-400 p-2 bg-yellow-200">{game.code}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => (
              <tr key={index}>
                <td className="border border-slate-400 p-2 text-center bg-yellow-200">{date}</td>
                {games?.map((game, idx) => (
                  <td key={idx} className="border border-slate-400 p-2 text-center">
                    {resultsByDate[date] && resultsByDate[date][game._id] ? resultsByDate[date][game._id] : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CustomMonthResult;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const DNAME = process.env.REACT_APP_DNAME;

// function CustomMonthResult() {
//   const [games, setGames] = useState(null);
//   const [results, setResults] = useState(null);
//   const [monthlyResults, setMonthlyResults] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     getGames();
//     getResultByMonth(selectedDate);
//   }, [selectedDate]);

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

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${day}-${month}-${year}`;
//   };

//   const resultsByDate = monthlyResults?.reduce((acc, curr) => {
//     const date = formatDate(curr.date);
//     if (!acc[date]) {
//       acc[date] = {};
//     }
//     acc[date][curr.gameId] = curr.result;
//     return acc;
//   }, {}) || {};

//   const dates = Object.keys(resultsByDate).sort();

//   const getResultByMonth = async (date) => {
//     try {
//       const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
//       const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
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

//   const handleDateChange = (event) => {
//     const [year, month] = event.target.value.split('-');
//     setSelectedDate(new Date(year, month - 1));
//   };

//   const currentDate = new Date();
//   const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

//   return (
//     <div>
//       <div className="p-4 font-bold text-4xl border-2 border-black bg-yellow-400 flex justify-center items-center">
//         <input
//           type="month"
//           value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
//           onChange={handleDateChange}
//           className="text-black p-2 rounded"
//         />
//       </div>
//       <div>
//         <table className="border-collapse w-full">
//           <thead>
//             <tr className="bg-yellow-200 text-center border border-slate-400 p-2 text-2xl">
//               <th colSpan="12">
//                 Monthly Result Chart of {currentMonthName}
//               </th>
//             </tr>
//             <tr>
//               <th className="bg-yellow-200 border border-slate-400 p-2">Date</th>
//               {games?.map((game, index) => (
//                 <th key={index} className="border border-slate-400 p-2 bg-yellow-200">{game.code}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {dates.map((date, index) => (
//               <tr key={index}>
//                 <td className="border border-slate-400 p-2 text-center bg-yellow-200">{date}</td>
//                 {games?.map((game, idx) => (
//                   <td key={idx} className="border border-slate-400 p-2 text-center">
//                     {resultsByDate[date] && resultsByDate[date][game._id] ? resultsByDate[date][game._id] : '-'}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default CustomMonthResult;
