import { Link } from 'react-router-dom'

const NavBarSuper = () => {
  return (
    <div>
      <Link to="/super-addAdmin">Admins</Link>
      <Link to="/super-addStudent">Student</Link>
       <Link to="/list-allUser">Users</Link>
    </div>
  );
};

export default NavBarSuper
