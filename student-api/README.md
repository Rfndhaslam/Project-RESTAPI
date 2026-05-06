# RESTAPI untuk mengakalkulasikan data nilai murid

# Students

GET http://localhost:3000/students
GET http://localhost:3000/students/grades ← semua siswa + rata2 + grade
GET http://localhost:3000/students/1 ← 1 siswa + rata2 + grade
GET http://localhost:3000/students/class/XII IPA 1 ← filter by kelas

POST http://localhost:3000/students
{
"name": "Andi Wijaya",
"class": "XII IPA 1",
"gender": "L"
}

PUT http://localhost:3000/students/1
{
"name": "Budi Santoso",
"class": "XII IPA 2",
"gender": "L"
}

DELETE http://localhost:3000/students/1

# Grades

GET http://localhost:3000/grades/student/1 ← nilai by student
GET http://localhost:3000/grades/top/Matematika ← nilai tertinggi by mapel

POST http://localhost:3000/grades
{
"student_id": 1,
"subject": "Fisika",
"score": 88
}

PUT http://localhost:3000/grades/1
{
"subject": "Matematika",
"score": 95
}

DELETE http://localhost:3000/grades/1
