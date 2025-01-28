import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Software from './pages/Software';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Courses from './pages/Courses';
import FomoBanner from './components/FomoBanner';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/software" element={<Software />} />
            <Route path="/products/courses" element={<Courses />} />
            <Route path="/products/software/:id" element={<ProductPage />} />
            <Route path="/products/courses/:id" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
        <FomoBanner />
      </div>
    </Router>
  );
}

export default App;