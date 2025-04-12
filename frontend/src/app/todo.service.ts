import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(filter: string = 'all') {
    return this.http.get<any[]>(`${this.apiUrl}?filter=${filter}`).pipe(
      map(tasks => tasks.map(task => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null // Ensure dueDate is converted to Date
      }))),
      catchError(this.handleError)
    );
  }

  toggleTaskCompletion(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/toggle`, {}).pipe(
      catchError(this.handleError)
    );
  }

  addTask(title: string, dueDate?: Date | null) {
    // Convert to ISO string if date exists
    const payload = {
      title,
      dueDate: dueDate ? dueDate.toISOString() : null
    };
    return this.http.post<{ _id: string, title: string, completed: boolean, dueDate?: string }>(
      this.apiUrl, 
      payload
    ).pipe(
      catchError(this.handleError)
    );
  }

  getUpcomingTasks() {
    return this.http.get<any[]>(`${this.apiUrl}/upcoming`).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
