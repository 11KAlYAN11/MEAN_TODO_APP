import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(filter: string = 'all') {
    return this.http.get(`${this.apiUrl}?filter=${filter}`).pipe(
      catchError(this.handleError)
    );
  }

  toggleTaskCompletion(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/toggle`, {}).pipe(
      catchError(this.handleError)
    );
  }

  addTask(title: string, dueDate?: Date | null) {
    return this.http.post<{ _id: string, title: string, completed: boolean, dueDate?: Date }>(
      this.apiUrl, 
      { title, dueDate }
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
