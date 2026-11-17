import { Link } from 'react-router-dom';

function Home({ students, courses, grades }) {
  return (
    <section className="page home-page">
      <h2>Home</h2>
      <p>Welcome to the Student Portal. You can view students, courses, and their grades here.</p>

      <div className="summary">
        <div className="summary-box"><strong>{students.length}</strong><span>Students</span></div>
        <div className="summary-box"><strong>{courses.length}</strong><span>Courses</span></div>
        <div className="summary-box"><strong>{grades.length}</strong><span>Grades</span></div>
      </div>

      <h3>Quick links</h3>
      <div className="quick-links">
        <Link to="/students">Manage Students</Link>
        <Link to="/courses">Manage Courses</Link>
        <Link to="/grades">View Grades</Link>
      </div>
    </section>
  );
}

export default Home;
