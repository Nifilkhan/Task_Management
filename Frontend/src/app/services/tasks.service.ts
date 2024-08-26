import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Task } from '../shared/model/taskModel';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:9001'; // Base URL for API

  constructor(private http: HttpClient) {}

  getAllTasks(status: 'Completed' | 'In-Progress' | 'Important' |null): Observable<ApiResponse<Task[]>> {
    const url = `${this.apiUrl}/alltasks`;
    console.log('Sending request with status:', status); 
    return this.http.post<ApiResponse<Task[]>>( url ,{status}
    );
  }

  getTask(id: string): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(task: Task): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(`${this.apiUrl}/task`, task);
  }

  updateTask(id: string, task: Task): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(
      `${this.apiUrl}/edittask/${id}`,
      task
    );
  }

  deleteTask(id: string): Observable<ApiResponse<Task>> {
    return this.http.delete<ApiResponse<Task>>(`${this.apiUrl}/tasks/${id}`);
  }

  updateTaskStatus(
    taskId: string,
    status: string
  ): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(
      `${this.apiUrl}/tasks/${taskId}`,
      { status }
    );
  }
}
