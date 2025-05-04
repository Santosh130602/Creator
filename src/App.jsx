import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup'
import Home from './pages/home';
import AdminUserList from './components/adminDashbord';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashbord" element={<AdminUserList />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;