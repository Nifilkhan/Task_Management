import { Component, Output , EventEmitter} from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CardComponent,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() headerChange = new EventEmitter<string>();


  UpdateText (text:string) {
    this.headerChange.emit(text);

  }
}
