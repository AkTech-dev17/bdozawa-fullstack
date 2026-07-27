import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Search from './pages/Search';
import HowItWorks from './pages/HowItWorks';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext';

function App() {
  return (
    <Router>
      <ThemeLanguageProvider>
        <Routes>
          {/* Standalone Auth Pages (No Navbar or Footer) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* All other pages wrapped in the layout with the Navbar and Footer */}
          <Route path="*" element={
            <div className="app-container" style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
              <Navbar />
              <main style={{ width: '100%', flex: 1, boxSizing: 'border-box', padding: 0 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/lost" element={<div>This is the Lost Items Page</div>} />
                  <Route path="/found" element={<div>This is the Found Items Page</div>} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/success-stories" element={<div>Success Stories Page</div>} />
                  <Route path="/item/:id" element={<ItemDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </ThemeLanguageProvider>
    </Router>
  );
}

export default App;