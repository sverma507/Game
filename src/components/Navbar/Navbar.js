import { useState, useEffect } from 'react';
import { NavLink, useLocation,useNavigate } from 'react-router-dom';

const Navbar = ({update}) => {
  const location = useLocation();
  const navigate=useNavigate()
  const [activeInfo, setActiveInfo] = useState('Home');

  useEffect(() => {
    switch (location.pathname) {
      case '/admin/home':
        setActiveInfo('Home');
        break;
      case '/admin/games':
        setActiveInfo('Games');
        break;
      case '/admin/gamesresult':
        setActiveInfo('Games Result');
        break;
      case '/admin/admanager':
        setActiveInfo('Ad Manager');
        break;
      case '/admin/logout':
        setActiveInfo('Logout');
        break;
      default:
        setActiveInfo('');
    }
  }, [location.pathname]);

  const activeClass = "text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
  const defaultClass = "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

  return (
    <>
      <div className='flex  justify-between px-28 py-6 w-5/6'>
        <NavLink className={({ isActive }) => (isActive ? activeClass : defaultClass)} to='/admin/home' end>
          <button type="button">Home</button>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeClass : defaultClass)} to='/admin/games'>
          <button type="button">Games</button>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeClass : defaultClass)} to='/admin/gamesresult'>
          <button type="button">Games Result</button>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeClass : defaultClass)} to='/admin/admanager'>
          <button type="button">Ad Manager</button>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeClass : defaultClass)} to='/'>
          <button type="button" onClick={()=>{update()}}>Logout</button>
        </NavLink>
      </div>
      <div className='mx-28 rounded p-4 border border-slate-400'>
       {activeInfo}
      </div>
    </>
  )
}

export default Navbar;
