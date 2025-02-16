
import {BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom"
import HomePage from "./componets/HomePage";
import AboutUs from "./componets/AboutUs";
import ContactUs from "./componets/ContactUs";
import Login from "./componets/Login"
import ButtonAppBar from "./componets/ButtonAppBar";
import './styles.css';
import {useState} from "react";

const ProtectedRoute = ({isAuth, children}) => {
  if(isAuth){
    return children;
  }

  return <Navigate to="/login"/>
}

function App() {
  const [isAuth, setIsAuth] = useState();
  return (
    <BrowserRouter>
      {/*<div class="header">
        <Link to="/">Home Page</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/login">Login</Link>
        <Link to="/student-sys">Student System</Link>
      </div>*/}
      <Routes>
        {/*<Route path="/" element={<HomePage/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/contact-us" element={
          <ProtectedRoute isAuth={isAuth}>
              <ContactUs/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/> */}
        <Route path="/" element={<ButtonAppBar/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
