import { Link } from 'react-router-dom'

const NavBarExam = () => {
  return (
    <div>
      <Link to="/addExam">Add New Exam</Link>
      <Link to="/list-allExam">List All Exam</Link>
    </div>
  );
};

export default NavBarExam
