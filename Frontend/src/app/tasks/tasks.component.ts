import { Component} from '@angular/core';
import { TaskformComponent } from './taskform/taskform.component';
import { AddtaskServicesTsService } from '../services/addtask.services.ts.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskformComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers:[AddtaskServicesTsService] 
})
export class TasksComponent {


  constructor(private formVisibilityService:AddtaskServicesTsService){}

  toggleButton() {
    this.formVisibilityService.toggleForm();
  }
}
