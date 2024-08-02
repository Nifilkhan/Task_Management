import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { AddtaskServicesTsService } from '../../services/addtask.services.ts.service';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css'],
})
export class TaskformComponent {
  @Input() showForm: boolean = false;  
  constructor(private formVisibilityService:AddtaskServicesTsService){}

  ngOnInit() {
    this.formVisibilityService.isFormVisible$.subscribe(visible => 
      this.showForm = visible
    );
  }

  close() {
    this.formVisibilityService.closeForm();
  }
}
