import { Component, Output , EventEmitter} from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CardComponent,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarVisible: boolean = false; 

  @Output() headerChange = new EventEmitter<string>();
  @Output() sideBarToggle = new EventEmitter<boolean>();


  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sideBarToggle.emit(this.isSidebarVisible);
  }

  UpdateText (text:string) {
    this.headerChange.emit(text);
    this.isSidebarVisible = false
    this.sideBarToggle.emit(this.isSidebarVisible)
  }

  
}
