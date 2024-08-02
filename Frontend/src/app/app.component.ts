import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TasksComponent } from './tasks/tasks.component';
import { TaskformComponent } from './tasks/taskform/taskform.component';
import { AddtaskServicesTsService } from './services/addtask.services.ts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [SidebarComponent, TaskformComponent,TasksComponent]
})
export class AppComponent {
  isFormVisible = false;

  constructor(private formVisibilityService: AddtaskServicesTsService) {}

  toggleForm() {
    this.formVisibilityService.toggleForm();
  }

  closeForm() {
    this.formVisibilityService.closeForm();
  }
}
