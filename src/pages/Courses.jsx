import { useState } from 'react';

function Courses({ courses, onAdd, onUpdate, onDelete }) {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('3');
  const [editingId, setEditingId] = useState(null);

  function clearForm() {
    setCode('');
    setTitle('');
    setCredits('3');
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const course = { code: code.trim().toUpperCase(), title: title.trim(), credits: Number(credits) };

    if (editingId === null) onAdd(course);
    else onUpdate(editingId, course);
    clearForm();
  }

  function editCourse(course) {
    setCode(course.code);
    setTitle(course.title);
    setCredits(String(course.credits));
    setEditingId(course.id);
  }

  function removeCourse(id) {
    if (window.confirm('Remove this course and its grades?')) {
      onDelete(id);
      if (editingId === id) clearForm();
    }
  }

  return (
    <section className="page courses-page">
      <h2>Courses</h2>
      <p>Keep a list of courses offered to students.</p>

      <div className="box">
        <h3>{editingId === null ? 'Add Course' : 'Edit Course'}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label htmlFor="course-code">Code</label>
            <input id="course-code" value={code} onChange={event => setCode(event.target.value)} placeholder="CSCI426" required />
          </div>
          <div>
            <label htmlFor="course-title">Course Name</label>
            <input id="course-title" value={title} onChange={event => setTitle(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="course-credits">Credits</label>
            <input id="course-credits" type="number" min="1" max="6" value={credits} onChange={event => setCredits(event.target.value)} required />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId === null ? 'Add Course' : 'Save Changes'}</button>
            {editingId !== null && <button type="button" className="secondary" onClick={clearForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="box">
        <h3>Course List ({courses.length})</h3>
        {courses.length === 0 ? <p>No courses added yet.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Code</th><th>Course Name</th><th>Credits</th><th>Actions</th></tr></thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>{course.credits}</td>
                    <td className="actions">
                      <button type="button" className="small" onClick={() => editCourse(course)}>Edit</button>
                      <button type="button" className="small secondary" onClick={() => removeCourse(course.id)}>Delete</button>
                    </td>
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

export default Courses;
