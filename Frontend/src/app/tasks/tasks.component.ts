import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskformComponent } from './taskform/taskform.component';
import { AddtaskServicesTsService } from '../services/addtask.services.ts.service';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from '../services/tasks.service';
import { ApiResponse, Task } from '../shared/model/taskModel';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PageNotfoundComponent } from '../page-notfound/page-notfound.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskformComponent,
    HttpClientModule,
    CommonModule,
    PageNotfoundComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  status: 'Completed' | 'In-Progress' | 'Important' | null = null;
  isFormVisible: boolean = false;
  tasks: Task[] = [];
  task: Task | null = null;
  characterlength: number = 24;
  taskLoaded: boolean = false;

  private formVisibilitySubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();

  constructor(
    private formVisibilityService: AddtaskServicesTsService,
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}

  toggleButton(
    taskId: string | undefined,
    newState: 'Completed' | 'In-Progress' | 'Important',
    event: Event
  ) {
    if (taskId) {
      const task = this.tasks.find((task) => task._id === taskId);
      if (task) {
        this.upadteTaskStatus(task, newState);
      }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.status = params['status'];
      this.loadTasks();
    });
    this.formVisibilitySubscription =
      this.formVisibilityService.isFormVisible$.subscribe((isVisible) => {
        this.isFormVisible = isVisible;
      });
  }

  ngOnDestroy(): void {
    this.formVisibilitySubscription.unsubscribe();
  }

  loadTasks(): void {
    this.taskService.getAllTasks(this.status).subscribe({
      next: (response: ApiResponse<Task[]>) => {
        this.tasks = response.tasks.map((task) => ({
          ...task,
          isTextHidden: true,
        }));
        this.taskLoaded = true;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      },
    });
  }

  upadteTaskStatus(
    task: Task,
    newState: 'Completed' | 'In-Progress' | 'Important'
  ): void {
    task.status = newState;
    this.taskService
      .updateTaskStatus(task._id as string, task.status)
      .subscribe({
        next: (response: ApiResponse<Task>) => {
          Swal.fire(
            'Success',
            `Task status updated to "${newState}".`,
            'success'
          );
          console.log('Task status updated successfully');
        },
        error: (err) => {
          console.error('Error updating task status', err);
          Swal.fire('Error', 'Failed to update task status.', 'error');
        },
      });
  }
  deleteTask(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe({
          next: (response: ApiResponse<Task>) => {
            this.loadTasks();
            Swal.fire('success', 'Task deleted successfully!', 'success');
          },
          error: (err) => {
            console.error('Error deleting task', err);
            Swal.fire('Error', 'Failed to delete task!', 'error');
          },
        });
      }
    });
  }

  getTask(data: Task) {
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
    this.task = null;
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

  toggleTextContent(task: Task): void {
    if (task.taskDescription.length > this.characterlength) {
      task.showMore = !task.showMore;
    }
  }
}
