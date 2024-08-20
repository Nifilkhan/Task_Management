import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { ApiResponse, Task } from '../shared/model/taskModel';

@Component({
  selector: 'app-important',
  standalone: true,
  imports: [],
  templateUrl: './important.component.html',
  styleUrl: './important.component.css'
})
export class ImportantComponent implements OnInit {


  tasks: Task[] = [];
  constructor(private taskService:TasksService) {}

  ngOnInit(): void {
    this.loadTasks('Important');
  }
  
loadTasks(status:string){
  this.taskService.getAllTasks(status).subscribe({
    next: (response: ApiResponse<Task[]>) => {
      this.tasks = response.tasks;
    },
    error: (err) => {
      console.error('Error fetching tasks', err);
    }
  });
}

deleteTask(id:string ):void{
  this.taskService.deleteTask(id).subscribe({
    next: (response: ApiResponse<Task>) => {
      this.loadTasks('In Progress');
    },
    error: (err) => {
      console.error('Error deleting task', err);
    }
  })
}
}
