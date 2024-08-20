import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-page-notfound',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-notfound.component.html',
  styleUrl: './page-notfound.component.css'
})
export class PageNotfoundComponent {

  isPageNotFound = false;

}
