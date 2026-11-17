import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Grades from './pages/Grades';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';

// A few sample records so the tables are not empty when the website is first opened.
const sampleStudents = [
  { id: 1, name: 'Lina Haddad', email: 'lina@example.com', major: 'Computer Science' },
  { id: 2, name: 'Omar Khalil', email: 'omar@example.com', major: 'Business' }
];
const sampleCourses = [
  { id: 1, code: 'CSCI426', title: 'Advanced Web Programming', credits: 3 },
  { id: 2, code: 'MATH201', title: 'Calculus', credits: 3 }
];
const sampleGrades = [
  { id: 1, studentId: 1, courseId: 1, score: 88 },
  { id: 2, studentId: 2, courseId: 2, score: 76 }
];

// Read data from localStorage. If it doesn't exist, use the sample data.
function loadSaved(key, sample) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : sample;
  } catch {
    return sample;
  }
}

function App() {
  // useState stores the lists. Their setter functions update the website.
  const [students, setStudents] = useState(() => loadSaved('portal-students', sampleStudents));
  const [courses, setCourses] = useState(() => loadSaved('portal-courses', sampleCourses));
  const [grades, setGrades] = useState(() => loadSaved('portal-grades', sampleGrades));

  // Save changes in this browser so a refresh doesn't erase them.
  useEffect(() => {
    localStorage.setItem('portal-students', JSON.stringify(students));
    localStorage.setItem('portal-courses', JSON.stringify(courses));
    localStorage.setItem('portal-grades', JSON.stringify(grades));
  }, [students, courses, grades]);

  function addStudent(student) {
    setStudents(oldList => [...oldList, { ...student, id: Date.now() }]);
  }

  function updateStudent(id, student) {
    setStudents(oldList => oldList.map(item => item.id === id ? { ...student, id } : item));
  }

  function deleteStudent(id) {
    setStudents(oldList => oldList.filter(item => item.id !== id));
    setGrades(oldList => oldList.filter(item => item.studentId !== id)); // Also delete this student's grades.
  }

  function addCourse(course) {
    setCourses(oldList => [...oldList, { ...course, id: Date.now() }]);
  }

  function updateCourse(id, course) {
    setCourses(oldList => oldList.map(item => item.id === id ? { ...course, id } : item));
  }

  function deleteCourse(id) {
    setCourses(oldList => oldList.filter(item => item.id !== id));
    setGrades(oldList => oldList.filter(item => item.courseId !== id)); // Remove grades from this course.
  }

  function saveGrade(newGrade) {
    // If the student already has a grade for this course, update it.
    const oldGrade = grades.find(item =>
      item.studentId === newGrade.studentId && item.courseId === newGrade.courseId
    );

    if (oldGrade) {
      setGrades(oldList => oldList.map(item =>
        item.id === oldGrade.id ? { ...newGrade, id: item.id } : item
      ));
    } else {
      setGrades(oldList => [...oldList, { ...newGrade, id: Date.now() }]);
    }
  }

  function deleteGrade(id) {
    setGrades(oldList => oldList.filter(item => item.id !== id));
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home students={students} courses={courses} grades={grades} />} />
          <Route path="/students" element={
            <Students students={students} onAdd={addStudent} onUpdate={updateStudent} onDelete={deleteStudent} />
          } />
          <Route path="/courses" element={
            <Courses courses={courses} onAdd={addCourse} onUpdate={updateCourse} onDelete={deleteCourse} />
          } />
          <Route path="/grades" element={
            <Grades students={students} courses={courses} grades={grades} onSave={saveGrade} onDelete={deleteGrade} />
          } />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="page"><h2>Page not found</h2><p>Use the menu to choose a page.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
