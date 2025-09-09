import { Link } from 'react-router-dom'
import LogoutButton from '../logout';
const NavBarSuper = () => {
  return (
    <div>
      <Link to="/super-addAdmin">Admins</Link>
      <Link to="/super-addStudent">Student</Link>
       <Link to="/list-allUser">Users</Link>
       <Link to="/logout">Logout</Link>
   <LogoutButton/>
    </div>
  );
};

export default NavBarSuper
