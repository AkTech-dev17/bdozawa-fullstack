import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReportItem from './pages/ReportItem';
import Feed from './pages/Feed'; // <-- Add this import
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: '3rem 5%' }}>
          <Routes>
            <Route path="/" element={<h1 style={{textAlign: 'center'}}>Welcome to Bdozawa</h1>} />
            <Route path="/feed" element={<Feed />} /> {/* <-- Add this route */}
            <Route path="/report" element={<ReportItem />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;