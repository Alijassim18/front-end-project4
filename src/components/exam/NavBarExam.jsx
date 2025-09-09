import { Link } from 'react-router-dom'
import LogoutButton from '../logout';
const NavBarExam = () => {
  return (
    <div>
      <Link to="/addExam">Add New Exam</Link>
      <Link to="/list-allExam">List All Exam</Link>
    <LogoutButton/>
    </div>
  );
};

export default NavBarExam
