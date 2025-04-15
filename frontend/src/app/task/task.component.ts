import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';
  error: string | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (err) => (this.error = 'Failed to load tasks')
    });
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todoService.addTask(this.newTask).subscribe({
        next: () => {
          this.newTask = '';
          this.loadTasks();
        },
        error: (err) => (this.error = 'Failed to add task')
      });
    }
  }
}