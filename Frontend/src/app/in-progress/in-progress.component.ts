import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { ApiResponse, Task } from '../shared/model/taskModel';

@Component({
  selector: 'app-in-progress',
  standalone: true,
  imports: [],
  templateUrl: './in-progress.component.html',
  styleUrl: './in-progress.component.css'
})
export class InProgressComponent implements OnInit {
task!: Task;
tasks : Task []= [];
isFormVisible: boolean = false;

  constructor(private taskService:TasksService) { }

  ngOnInit(): void {
    this.loadTasks('In Progress');
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
