import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TasksComponent } from './tasks/tasks.component';
import { TaskformComponent } from './tasks/taskform/taskform.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from "./shared/card/card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [SidebarComponent, TaskformComponent, RouterModule, PageNotfoundComponent, HeaderComponent, CardComponent, RouterOutlet, TasksComponent]
})
export class AppComponent {
  headerText: string = 'All Tasks';
  
  onHeaderChange(newHeaderText: string) {
    this.headerText = newHeaderText;
  }
}
