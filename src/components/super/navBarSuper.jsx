import { Link } from 'react-router-dom';
import LogoutButton from '../logout';
import './NavBarSuper.css'; 

const NavBarSuper = () => {
  return (
    <div className="navbar-super">
      <div className="nav-links">
        <Link to="/super-addAdmin" className="nav-link">Admins</Link>
        <Link to="/super-addStudent" className="nav-link">Students</Link>
        <Link to="/list-allUser" className="nav-link">Users</Link>
        <Link to="/logout" className="nav-link">Logout</Link>
      </div>
      <LogoutButton />
    </div>
  );
};

export default NavBarSuper;
