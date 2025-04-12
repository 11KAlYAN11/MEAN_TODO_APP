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

  addTask(title: string) {
    return this.http.post(this.apiUrl, { title }).pipe(
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
