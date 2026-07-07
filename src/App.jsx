
import "./App.css"
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import Login from './pages/LogIn/index.jsx';
import MyApp from "./components/MyApp.jsx";


function App() {
   

  return (
    <>
 <MyApp />
 <Routes>
    <Route path = "login" element = {<Login/>}/>
 </Routes>
 </>
  )
  }

export default App
