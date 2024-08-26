import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskformComponent } from './taskform/taskform.component';
import { AddtaskServicesTsService } from '../services/addtask.services.ts.service';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from '../services/tasks.service';
import { ApiResponse, Task } from '../shared/model/taskModel';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskformComponent, HttpClientModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'], 
})
export class TasksComponent implements OnInit, OnDestroy {
 status: 'Completed' | 'In-Progress' | 'Important'|null=null;
  isFormVisible: boolean = false;
  tasks: Task[] = []; 
  task!: Task;
  isButtonVisible: boolean = false;

  toggleButton(taskId: string | undefined ,newState: 'Completed' | 'In-Progress' | 'Important',event:Event) {
    if(taskId){
      const task = this.tasks.find(task => task._id === taskId);
    if(task) {
      task.status = newState;
        console.log(task);
        this.taskService.updateTaskStatus(taskId, task.status).subscribe({
          next: (response: ApiResponse<Task>) => {
            console.log('Task updated successfully');
          },
          error: (err) => {
            console.error('Error updating task', err);
          }
      });
      }
  
  }
  }

  private formVisibilitySubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription(); 


  constructor(
    private formVisibilityService: AddtaskServicesTsService,
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.status = params['status']; 
      this.loadTasks();
     });
        this.formVisibilitySubscription = this.formVisibilityService.isFormVisibleChange.subscribe((isVisible) => (this.isFormVisible = isVisible));
  }

  ngOnDestroy(): void {
    this.formVisibilitySubscription.unsubscribe();
  }

  loadTasks(): void {
    this.taskService.getAllTasks(this.status).subscribe({
      next: (response: ApiResponse<Task[]>) => {
        this.tasks = response.tasks
        ;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }

  deleteTask(id:string ):void{
    this.taskService.deleteTask(id).subscribe({
      next: (response: ApiResponse<Task>) => {
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error deleting task', err);
      }
    })
  }

  getTask(data:Task) {
    this.task = data;
    this.isFormVisible = true;
  }



  toggleFormVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.formVisibilityService.toggleForm();
  }

  closeForm(): void {
    this.formVisibilityService.setFormVisibility(false);
    this.loadTasks();
  }

  getStatusColor(status: 'Completed' | 'In-Progress' | 'Important'): string {
    switch (status) {
      case 'Completed':
        return '#4CAF50';
      case 'In-Progress':
        return '#FFC107'; 
      case 'Important':
        return '#F44336'; 
    }
  }
}
