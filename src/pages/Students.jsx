import { useState } from 'react';

function Students({ students, onAdd, onUpdate, onDelete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [editingId, setEditingId] = useState(null);

  function clearForm() {
    setName('');
    setEmail('');
    setMajor('');
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the browser from refreshing.
    const student = { name: name.trim(), email: email.trim(), major: major.trim() };

    if (editingId === null) {
      onAdd(student);
    } else {
      onUpdate(editingId, student);
    }
    clearForm();
  }

  function editStudent(student) {
    // Put the chosen student's data back in the form.
    setName(student.name);
    setEmail(student.email);
    setMajor(student.major);
    setEditingId(student.id);
  }

  function removeStudent(id) {
    if (window.confirm('Remove this student and their grades?')) {
      onDelete(id);
      if (editingId === id) clearForm();
    }
  }

  return (
    <section className="page students-page">
      <h2>Students</h2>
      <p>Add students or change their basic information.</p>

      <div className="box">
        <h3>{editingId === null ? 'Add Student' : 'Edit Student'}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label htmlFor="student-name">Name</label>
            <input id="student-name" value={name} onChange={event => setName(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="student-email">Email</label>
            <input id="student-email" type="email" value={email} onChange={event => setEmail(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="student-major">Major</label>
            <input id="student-major" value={major} onChange={event => setMajor(event.target.value)} required />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId === null ? 'Add Student' : 'Save Changes'}</button>
            {editingId !== null && <button type="button" className="secondary" onClick={clearForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="box">
        <h3>Student List ({students.length})</h3>
        {students.length === 0 ? <p>No students added yet.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Major</th><th>Actions</th></tr></thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.major}</td>
                    <td className="actions">
                      <button type="button" className="small" onClick={() => editStudent(student)}>Edit</button>
                      <button type="button" className="small secondary" onClick={() => removeStudent(student.id)}>Delete</button>
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

export default Students;
