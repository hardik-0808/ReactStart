package com.example.contact.controller;

import com.example.contact.model.Student;
import com.example.contact.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")  // Enable for frontend requests
public class StudentController {

    @Autowired
    private StudentRepository repo;

    // GET /students
    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }

    // POST /students
    @PostMapping
    public Student add(@RequestBody Student student) {
        return repo.save(student);
    }

    // PUT /students/{id}
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return repo.findById(id)
                .map(student -> {
                    student.setName(updatedStudent.getName());
                    student.setEmail(updatedStudent.getEmail());
                    return repo.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // DELETE /students/{id}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
