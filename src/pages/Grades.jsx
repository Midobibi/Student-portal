import { useState } from 'react';

// Change a number into a letter grade.
function getLetter(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function Grades({ students, courses, grades, onSave, onDelete }) {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [score, setScore] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Convert text from the dropdowns into numbers before saving.
    onSave({ studentId: Number(studentId), courseId: Number(courseId), score: Number(score) });
    setStudentId('');
    setCourseId('');
    setScore('');
  }

  function findStudent(id) {
    return students.find(student => student.id === id)?.name || 'Unknown';
  }

  function findCourse(id) {
    return courses.find(course => course.id === id)?.code || 'Unknown';
  }

  const average = grades.length > 0
    ? (grades.reduce((total, item) => total + item.score, 0) / grades.length).toFixed(1)
    : '-';

  return (
    <section className="page grades-page">
      <h2>Grades</h2>
      <p>Save each student's grade for a course. Adding the same student and course again updates the grade.</p>

      <div className="box">
        <h3>Add or Update Grade</h3>
        {students.length === 0 || courses.length === 0 ? (
          <p>Add a student and a course first.</p>
        ) : (
          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label htmlFor="grade-student">Student</label>
              <select id="grade-student" value={studentId} onChange={event => setStudentId(event.target.value)} required>
                <option value="">Choose student</option>
                {students.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="grade-course">Course</label>
              <select id="grade-course" value={courseId} onChange={event => setCourseId(event.target.value)} required>
                <option value="">Choose course</option>
                {courses.map(course => <option key={course.id} value={course.id}>{course.code}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="grade-score">Grade (0-100)</label>
              <input id="grade-score" type="number" min="0" max="100" step="1" value={score} onChange={event => setScore(event.target.value)} required />
            </div>
            <div className="form-buttons"><button type="submit">Save Grade</button></div>
          </form>
        )}
      </div>

      <div className="box">
        <div className="section-heading">
          <h3>Grade List ({grades.length})</h3>
          <span>Average: {average}</span>
        </div>
        {grades.length === 0 ? <p>No grades added yet.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Course</th><th>Score</th><th>Letter</th><th>Action</th></tr></thead>
              <tbody>
                {grades.map(grade => (
                  <tr key={grade.id}>
                    <td>{findStudent(grade.studentId)}</td>
                    <td>{findCourse(grade.courseId)}</td>
                    <td>{grade.score}</td>
                    <td>{getLetter(grade.score)}</td>
                    <td><button type="button" className="small secondary" onClick={() => onDelete(grade.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Grades;
