import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { ApiResponse, Task } from '../shared/model/taskModel';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent implements OnInit {

tasks: Task []=[];
  constructor(private getAllTask:TasksService){}

  ngOnInit(): void {
    this.loadTasks('Completed');
}

loadTasks(status:string){
  this.getAllTask.getAllTasks(status).subscribe({
    next: (response: ApiResponse<Task[]>) => {
      this.tasks = response.tasks;
    },
    error: (err) => {
      console.error('Error fetching tasks', err);
    }
  });
}
}
