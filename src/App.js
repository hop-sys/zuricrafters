import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OurStory from './components/OurStory';
// import FloatingButtons from "./components/FloatingButtons";
import ContactUs from './components/ContactUs';
// import Mycarousel from './components/Mycarousel';
import SearchBar from "./components/SearchBar";
import Aboutus from './components/Aboutus';
import Checkout from './components/Checkout';
import ChatBot from './components/ChatBot';

function App() {

  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

const toggleDarkMode = () => {
  const newTheme = darkMode ? "light" : "dark";
  setDarkMode(!darkMode);
  localStorage.setItem("theme", newTheme);
};

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <header className="App-header">
           <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
           {/* <Ratings/> */}
      </header>
    
      <Routes>
        <Route path='/' element={<Getproducts darkMode={darkMode}/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/addproducts' element={<Addproducts darkMode={darkMode}/>} />
        <Route path='/makepayment' element={<Makepayment darkMode={darkMode}/>} />
        <Route path='*' element={<Notfound />}/>
        <Route path='/aboutus' element={<Aboutus />}/>
        <Route path='/ourstory' element={<OurStory />}/>
        <Route path='/contactus' element={<ContactUs />}/>
        <Route path='/checkout' element={<Checkout />}/>
        <Route path='/chatbot' element={<ChatBot darkMode={darkMode}/>}/>
        <Route path='/search' element={<SearchBar />}/>
      </Routes>
      <ChatBot />
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
