import { Link } from 'react-router-dom';
import LogoutButton from '../logout';
import './NavBarSuper.css'; 

const NavBarSuper = () => {
  return (
    <div className="navbar-super">
      <div className="nav-links">
            <Link to="/super" className="nav-link">Home</Link>
        <Link to="/super-addAdmin" className="nav-link">New Admin</Link>
        <Link to="/super-addStudent" className="nav-link">New Student</Link>
        <Link to="/list-allUser" className="nav-link">Users</Link>
      </div>
      <LogoutButton />
    </div>
  );
};

export default NavBarSuper;
