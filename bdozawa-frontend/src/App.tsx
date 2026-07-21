import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // <-- New import
import ReportItem from './pages/ReportItem';
import Feed from './pages/Feed'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: '3rem 5%' }}>
          <Routes>
            <Route path="/" element={<Home />} /> {/* <-- Updated route */}
            <Route path="/feed" element={<Feed />} /> 
            <Route path="/report" element={<ReportItem />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;