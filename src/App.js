import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Mycarousel from './components/Mycarousel';
import SearchBar from "./components/SearchBar";
import Aboutus from './components/Aboutus';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
           <Navbar />
      </header>
    
      <Routes>
        <Route path='/' element={<Getproducts/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/addproducts' element={<Addproducts/>} />
        <Route path='/makepayment' element={<Makepayment/>} />
        <Route path='*' element={<Notfound />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
