import { Component, OnInit} from '@angular/core';
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
export class HeaderComponent implements OnInit{
  constructor(
    private formVisibilityService: AddtaskServicesTsService,
    private route: ActivatedRoute
  ) {}
   headerText: string = 'All Tasks';

   ngOnInit(): void {
    this.route.params.subscribe({
      next:((params) => {
        if(params['status']) this.headerText = params['status'];
      }),
      error:(error) => {console.log(error)}
    });
  }

  toggleForm() {
    this.formVisibilityService.toggleForm();
  }
}
