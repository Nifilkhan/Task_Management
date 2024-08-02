import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtaskServicesTsService {

  constructor() { }

  private isFormVisibleSource = new BehaviorSubject<boolean>(false);
  isFormVisible$ = this.isFormVisibleSource.asObservable();


  showForm() {
    this.isFormVisibleSource.next(true);
  }

  closeForm() {
    this.isFormVisibleSource.next(false);
  }
  toggleForm() {
    this.isFormVisibleSource.next(!this.isFormVisibleSource.value);
  }
}
