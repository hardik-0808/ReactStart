import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', id: null });

  // Fetch all students
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id
      ? `http://localhost:5000/students/${form.id}`
      : 'http://localhost:5000/students';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email })
    });

    // Refresh list
    const res = await fetch('http://localhost:5000/students');
    const data = await res.json();
    setStudents(data);

    // Reset form
    setForm({ name: '', email: '', id: null });
  };

  const handleEdit = (student) => {
    setForm({ ...student });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, {
      method: 'DELETE'
    });

    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Student Contact Form</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"

          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">{form.id ? 'Update' : 'Add'} Student</button>
      </form>

      <h3>Student List</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
