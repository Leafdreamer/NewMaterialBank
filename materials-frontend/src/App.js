import './App.css';
import Materials from './components/Materials';
import Login from './components/Login';
import Update from './components/Update';
import Create from './components/Create';
import ChangelogsID from './components/ChangelogsID';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/changelogs/:id" element={<ChangelogsID />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
