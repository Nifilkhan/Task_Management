import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { AddtaskServicesTsService } from '../services/addtask.services.ts.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent{
  constructor(
    private formVisibilityService: AddtaskServicesTsService,
    private route: ActivatedRoute
  ) {}
  @Input() headerText: string = 'All Tasks';
   isSidebarVisible: boolean = false;

   handleSidebarToggle(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }

  handleItemSelected(text: string) {
    this.headerText = text; // Update header text
    this.isSidebarVisible = false; // Hide sidebar after selection
  }

  toggleForm() {
    this.formVisibilityService.toggleForm();
  }
}
