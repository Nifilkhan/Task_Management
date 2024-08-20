import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddtaskServicesTsService } from '../services/addtask.services.ts.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(private formVisibilityService: AddtaskServicesTsService) {}


  toggleForm() {
    this.formVisibilityService.toggleForm();
  }

  @Input() headerText: string = '';


}
