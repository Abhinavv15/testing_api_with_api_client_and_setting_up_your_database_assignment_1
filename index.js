// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.




const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;


app.use(express.static('static'));
app.use(express.json());


const students = [
  { student_id: "1", name: "Abhinav", marks: { math: 85, science: 90, english: 78, history: 88, geography: 92 }, total: 433 },
  { student_id: "2", name: "Shebin", marks: { math: 75, science: 80, english: 70, history: 85, geography: 100 }, total: 410 },
  { student_id: "3", name: "Sangeeth", marks: { math: 65, science: 70, english: 68, history: 75, geography: 80 }, total: 358 },
  { student_id: "4", name: "Thameem", marks: { math: 85, science: 90, english: 78, history: 88, geography: 92 }, total: 433 },

];


app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number' || threshold < 0) {
    return res.status(400).json({ error: 'Invalid threshold. Please provide a positive number.' });
  }

  const filteredStudents = students.filter(student => student.total > threshold);


  const response = {
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({ name: student.name, total: student.total }))
  };


  res.json(response);
});


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});


