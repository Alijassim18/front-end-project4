import { Link } from 'react-router-dom';
import LogoutButton from '../logout';
import './NavBarExam.css'; 

const NavBarExam = () => {
  return (
    <div className="navbar-exam">
      <div className="nav-links">
          <Link to="/admin" className="nav-link">Home</Link>
        <Link to="/addExam" className="nav-link">Add New Exam</Link>
        <Link to="/list-allExam" className="nav-link">List All Exam</Link>
      </div>
      <LogoutButton/>
    </div>
  );
};

export default NavBarExam;
