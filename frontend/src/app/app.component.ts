import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./dark-theme.css', './app.component.css']
})
export class AppComponent implements OnInit {
  newTask = '';
  dueDate: Date | null = null;
  tasks: any[] = [];
  isLoading = false;
  error: string | null = null;
  currentFilter: string = 'all';

  today = new Date();

  // Add this method to fix the error
  isOverdue(dueDate: string | Date): boolean {
    const due = new Date(dueDate);
    return due < this.today;
  }

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(filter: string = 'all') {
    this.isLoading = true;
    this.error = null;
    this.currentFilter = filter;
    this.todoService.getTasks('all').subscribe({ // Always get all tasks
      next: (tasks) => {
        // Apply filter locally as fallback
        this.tasks = (tasks as any[]).filter(task => {
          if (filter === 'active') return !task.completed;
          if (filter === 'completed') return task.completed;
          return true; // 'all' filter
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        this.isLoading = false;
      }
    });
  }

  addTask() {
    if (this.newTask.trim()) {
      this.isLoading = true;
      this.error = null;
      
      // Convert dueDate to proper format if exists
      const formattedDueDate = this.dueDate ? new Date(this.dueDate) : null;
      
      this.todoService.addTask(this.newTask.trim(), formattedDueDate).subscribe({
        next: () => {
          this.newTask = '';
          this.dueDate = null;
          this.loadTasks(this.currentFilter);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to add task';
          this.isLoading = false;
        }
      });
    }
  }

  toggleTaskCompletion(id: string) {
    this.isLoading = true;
    this.error = null;
    this.todoService.toggleTaskCompletion(id).subscribe({
      next: () => {
        this.loadTasks(this.currentFilter);
      },
      error: (err) => {
        this.error = 'Failed to update task';
        this.isLoading = false;
      }
    });
  }

  deleteTask(id: string) {
    this.isLoading = true;
    this.error = null;
    this.todoService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks(this.currentFilter);
      },
      error: (err) => {
        this.error = 'Failed to delete task';
        this.isLoading = false;
      }
    });
  }
}
