import React, { useEffect, useState } from 'react';
import ResultTable from '../ResultTable/ResultTable';
import ResultByMonth from '../ResultByMonth/ResultByMonth';
import axios from 'axios'; // Assuming you are using axios to make API calls
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DNAME = process.env.REACT_APP_DNAME;

function IstPage() {
  const [todayResult, setTodayResults] = useState([]);
  const [yesterdayResult, setYesterdayResults] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gameResults, setGameResults] = useState({
    sumit: { yesterday: null, today: null },
    zonty: { yesterday: null, today: null },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    // Replace with your API endpoint to fetch game results
    const fetchGameResults = async () => {
      try {
        const response = await axios.get('/api/game-results');
        console.log('API response:', response.data); // Debugging step
        setGameResults(response.data);
      } catch (error) {
        console.error('Error fetching game results:', error);
      }
    };

    fetchGameResults();
  }, []);

  useEffect(() => {
    console.log('Updated game results:', gameResults); // Debugging step
  }, [gameResults]);

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
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

  useEffect(() => {
    getGameResults();
  }, []);

  const filteredResults = (results, names) => {
    return names.map(name => results.find(result => result.name === name) || { name, result: <img src={require("./d.gif")}/> });
  };

  const yt = filteredResults(yesterdayResult, ['Desawar', 'Faridabad']);
  const td = filteredResults(todayResult, ['Desawar', 'Faridabad']);

  return (
    <div>
      <ToastContainer />
      <div className="h-32 flex justify-center items-center flex-col bg-stone-700">
        <div className="">
          <div className="text-xl font-bold mb-4 text-yellow-500">{currentTime.toDateString()} {formatTime(currentTime)}</div>
        </div>
        <h1 className="text-white text-2xl font-bold">हा भाई यही आती हे सबसे पहले खबर रूको और देखो</h1>
      </div>

      <div className='flex justify-center items-center flex-col bg-yellow-300 h-32'>
        <div className='font-bold text-white text-4xl'>Desawar</div>
        <div className='flex justify-between  items-center w-40'>
          <span className='font-bold text-white text-3xl'>{yt[0].result}</span>
          <span className='text-red-600'> <img src={require("./teer.gif")} className="h-6"/></span>
          <span className='font-bold text-white text-3xl'>{td[0].result}</span>
        </div>
      </div>

      <div className='bg-stone-700 h-32 text-4xl font-bold flex justify-center items-center flex-col text-white '>
        <div className='font-bold text-white text-4xl'>Faridabad</div>
        <div className='flex justify-between items-center w-40'>
          <span className='font-bold text-white text-3xl'>{yt[1].result}</span>
          <span className='text-red-600'><img src={require("./teer.gif")} className="h-6"/></span>
          <span className='font-bold text-white text-3xl'>{td[1].result}</span>
        </div>
      </div>

      

      <div className='bg-yellow-300 p-4 flex flex-col justify-center items-center'>
        <p><strong>--सीधे सट्टा कंपनी का No 1 खाईवाल--</strong></p>
        <p><strong>♕♕&nbsp;<span id="kname">Deva Bhai online khaiwal </span>&nbsp; ♕♕</strong></p>
        <p><strong>⏰ तिलक बाज़ार ------------ 01:00 PM</strong></p>
        <p><strong>⏰ कनाट पैलेस ------------ 02:00 M</strong></p>
        <p><strong>⏰ चावला --------------- 04:00 PM</strong></p>
        <p><strong>⏰ श्री गणेश ------------ 04:45 PM</strong></p>
        <p><strong>⏰ फ़रीदाबा ----------- 06:00 PM</strong></p>
        <p><strong>⏰ लाजपत नगर --------------- 07:00 PM</strong></p>
        <p><strong>⏰ वसंत विहार --------------- 08:00 PM</strong></p>
        <p><strong>⏰ गाज़ियाबाद-------------- 08:55 PM</strong></p>
        <p><strong>⏰ द्वारका दिश ------------- 10:00 PM</strong></p>
        <p><strong>⏰ गली ------------- 11:50 PM</strong></p>
        <p><strong>⏰ दिसावर ----------------- 05:20 PM</strong></p>
        <p>
          =====================================<br />
          =====================================
        </p>
        <p>
          <strong>🤑 Rate list 💸</strong><br />
          <strong>जोड़ी रेट 10-------970</strong><br />
          <strong>हरूफ रेट 100-----970</strong>
        </p>
        <p>♕♕ &nbsp;<strong id="kname1">Deva bhai online khaiwal </strong>♕♕</p>
      </div>

      <div>
        <ResultTable />
      </div>

      <div>
        <div className="p-4 font-bold text-4xl border-2 border-black bg-yellow-400 flex justify-center items-center">
          <h1>MONTHLY RESULT CHART</h1>
        </div>
        <ResultByMonth />
      </div>

      <div className="p-4 font-bold text-4xl border-2 border-black bg-yellow-400 flex justify-center items-center">
        <h1>A1 Satta - World's #1 Website for Satta Bazar results</h1>
      </div>

      <div className="p-4 text-xl border-2 border-black bg-yellow-400 flex justify-center items-center">
        <h5>Get to know about A1 Satta?</h5>
      </div>

      <div className='p-6 bg-white text-lg'>
        <h6>You've likely come across the name A1 Satta often. In India, this name holds significant importance. A1 Satta is a lottery game that utilizes numbers spanning from 00 to 99. This game is famously known as Satta Matka, (Satta King, Satta Market) where "Satta" denotes betting or gambling, and "Matka" refers to a pot. In the Satta Matka game, individuals place bets on numbers within the range of 00 to 99. A draw is then conducted to select a winning number from the pot. The individual whose chosen number matches the drawn one claims the prize and earns the title of the Satta King. It's important to note that the title "Satta King" is bestowed upon the winner of the Satta Matka game, rather than the game itself.</h6>
      </div>

      <div className="p-4 text-xl border-t-2 border-black bg-yellow-400 flex justify-center items-center">
        <h5>Way to play and win A1 Satta?</h5>
      </div>

      <div className='p-6 bg-white text-lg'>
        <h6>In A1 Satta, participants can place bets on any number from 0 to 99, with their chances of winning varying depending on the chosen number. To assist them in this process, individuals can seek guidance from a Khaiwal residing in their area. Acting as intermediaries, Khaiwals facilitate communication between players and the game operators. Within their respective regions, players submit both money and chosen numbers to the corporation, adhering to the game's regulations. Once a winner is determined, the Khaiwal proceeds to collect the winnings and distribute them among the victors. Winners are chosen randomly by the Satta firm and announced at a predetermined time. Those who successfully wager on the winning number receive a payout of ninety times their initial bet.</h6>
      </div>

      <div className="p-4 text-xl border-t-2 border-black bg-yellow-400 flex justify-center items-center">
        <h5>Way to play and win A1 Satta online?</h5>
      </div>

      <div className='p-6 bg-white text-lg'>
        <h6>Engaging in Satta King online games is a straightforward process. Participants begin by selecting numbers and placing their bets. They then await the results of the draw. If their chosen number is drawn, they emerge as winners and receive the corresponding prize. The specifics of the prize vary based on the type of bet and the game's regulations. For instance, the reward for correctly predicting a single number ranges from nine hundred to 1,970 rupees, while the prize for a Panna bet ranges from 1,400 to 4,200 rupees. The amount won depends on the particular game and the player's bet. For example, if a participant wagers 10 rupees and their selected number is drawn, they will win 970 rupees, meaning the payout is 90 times the amount bet. For example, if you bet 10 rupees on a number and it is drawn, you will receive 970 rupees, and if you bet 10 rupees on a Panna and it is drawn, you will receive 1,400 rupees. Similarly, if you bet 100 rupees and your number is drawn, you will receive 90,000 rupees.</h6>
      </div>
    </div>
  );
}

export default IstPage;
