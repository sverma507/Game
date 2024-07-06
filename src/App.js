
// import { BrowserRouter,Routes,Route } from "react-router-dom";
// import Login from "./components/Login/Login";
// import Home from "./components/Home/Home"
// import Games from "./components/Games/Games"
// import GameResult from "./components/Game Result/GameResult"
// import AdManager from "./components/AdManager/AdManager"
// import Navbar from "./components/Navbar/Navbar"
// import { ToastContainer} from 'react-toastify';
// import { useEffect, useState } from "react";
// import IstNavbar from "./components/IstNavbar/IstNavbar";
// import IstPage from "./components/IstPage/IstPage";
// // import { useNavigate } from "react-router-dom";
// function App() {
//   const [loggedin,setLoggedin]=useState(false);
//   // const navigate=useNavigate();
//   const updatelogin=()=>{
//     setLoggedin(!loggedin)
//   }

//   return<>
//   <BrowserRouter>
//   <ToastContainer />
//   <IstNavbar/>
  
//   {loggedin &&<Navbar update={updatelogin}/>}
//   <Routes>
//     <Route path="/" element={<IstPage/>}></Route>
//     <Route path="/admin" element={<Login update={updatelogin}/>}></Route>
//     { loggedin && <>
//       <Route path="/home" element={<Home/>}></Route>
//     <Route path="/games" element={<Games/>}></Route>
//     <Route path="/gamesresult" element={<GameResult/>}></Route>
//     <Route path="/admanager" element={<AdManager/>}></Route>
//     </>
//     }

//   </Routes>
//   </BrowserRouter>
  
//   </>
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login/Login";
// import Home from "./components/Home/Home";
// import Games from "./components/Games/Games";
// import GameResult from "./components/Game Result/GameResult";
// import AdManager from "./components/AdManager/AdManager";
// import Navbar from "./components/Navbar/Navbar";
// import { ToastContainer } from 'react-toastify';
// import { useEffect, useState } from "react";
// import IstNavbar from "./components/IstNavbar/IstNavbar";
// import IstPage from "./components/IstPage/IstPage";
// // import { useNavigate } from "react-router-dom";

// function App() {
//   const [loggedin, setLoggedin] = useState(false);
//   // const navigate = useNavigate();
//   const updatelogin = () => {
//     setLoggedin(!loggedin);
//   }

//   //  useEffect(()=>{
//   //   if(!loggedin){
//   //     navigate('/')
//   //   }
//   //  })

//   return (
//     <>
//       <BrowserRouter>
//         <ToastContainer />
//         <IstNavbar />
//         {loggedin && <Navbar update={updatelogin} />}
//         <Routes>
//           <Route path="/" element={<IstPage />} />
//           <Route path="/admin" element={<Login update={updatelogin} />} />
//           {loggedin && (
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route path="home" element={<Home />} />
//               <Route path="games" element={<Games />} />
//               <Route path="gamesresult" element={<GameResult />} />
//               <Route path="admanager" element={<AdManager />} />
//             </Route>
//           )}
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// const AdminLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="home" element={<Home />} />
//         <Route path="games" element={<Games />} />
//         <Route path="gamesresult" element={<GameResult />} />
//         <Route path="admanager" element={<AdManager />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import GameResult from "./components/Game Result/GameResult";
import AdManager from "./components/AdManager/AdManager";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import IstNavbar from "./components/IstNavbar/IstNavbar";
import IstPage from "./components/IstPage/IstPage";
import CustomMonthResult from "./components/CustomMonthResult/CustomMonthResult";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
// import { useNavigate } from "react-router-dom";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  // const navigate = useNavigate();
  const updatelogin = () => {
    setLoggedin(!loggedin);
  }

  const location = useLocation();

  //  useEffect(()=>{
  //   if(!loggedin){
  //     navigate('/')
  //   }
  //  })

  return (
    <>
      {/* <BrowserRouter> */}
        <ToastContainer />
        {!location.pathname.startsWith("/admin") && <IstNavbar />}
        {loggedin && <Navbar update={updatelogin} />}
        <Routes>
          <Route path="/" element={<IstPage />} />
          <Route path="/custommonthlychart" element={<CustomMonthResult/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/admin" element={<Login update={updatelogin} />} />
          {loggedin && (
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="games" element={<Games />} />
              <Route path="gamesresult" element={<GameResult />} />
              <Route path="admanager" element={<AdManager />} />
            </Route>
          )}
        </Routes>
        {!location.pathname.startsWith("/admin") && <Footer />}
      {/* </BrowserRouter> */}
    </>
  );
}

const AdminLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="games" element={<Games />} />
        <Route path="gamesresult" element={<GameResult />} />
        <Route path="admanager" element={<AdManager />} />
      </Routes>
    </div>
  );
}

export default App;
