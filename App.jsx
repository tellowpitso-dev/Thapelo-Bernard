import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved? JSON.parse(saved) : [
      { id: 1, name: "Teboho", marks: 20 },
      { id: 2, name: "Relebohile", marks: 12 },
      { id: 3, name: "Ntsoaki", marks: 80 },
      { id: 4, name: "Reaboka", marks: 73 },
    ];
  });

  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || marks === '') return alert("Fill all fields");

    if(editId) {
  
      setStudents(students.map(s => s.id === editId? {...s, name, marks: Number(marks) } : s));
      setEditId(null);
    } else {
    
      const newStudent = { id: Date.now(), name, marks: Number(marks) };
      setStudents([...students, newStudent]);
    }
    setName(''); setMarks('');
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setMarks(student.marks);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id!== id));
  };

  return (
    <div className="container">
      <h1>STUDENT'S ATTENDANCE</h1>

      <form onSubmit={handleSubmit} className="form">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Student Name" />
        <input type="number" value={marks} onChange={e=>setMarks(e.target.value)} placeholder="Marks" max="100" />
        <button type="submit">{editId? "Update Marks" : "Add Student"}</button>
      </form>

      <table>
        <thead>
          <tr><th>Student Name</th><th>Marks</th><th>Action</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.marks}</td>
              <td>
                <button onClick={()=>handleEdit(s)}>Edit</button>
                <button onClick={()=>handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App
