import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Task } from '../shared/model/taskModel';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private apiUrl = environment.tasksUrl; //task url from the environment

  constructor(private http: HttpClient ) {}

  //get all tasks api
  getAllTasks(status: 'Completed' | 'In-Progress' | 'Important' |null): Observable<ApiResponse<Task[]>> {
    const url = `${this.apiUrl}/alltasks`;
    console.log('Sending request with status:', status); 
    return this.http.post<ApiResponse<Task[]>>( url ,{status}
    );
  }

  //get task by id api
  getTask(id: string): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/tasks/${id}`);
  }

  //create task api
  createTask(task: Task): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(`${this.apiUrl}/task`, task);
  }

  //update task api
  updateTask(id: string, task: Task): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(
      `${this.apiUrl}/edittask/${id}`,
      task
    );
  }

  //delete task api
  deleteTask(id: string): Observable<ApiResponse<Task>> {
    return this.http.delete<ApiResponse<Task>>(`${this.apiUrl}/tasks/${id}`);
  }

  //change task status api
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
