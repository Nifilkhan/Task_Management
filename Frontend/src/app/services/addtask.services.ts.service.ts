import { Injectable,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddtaskServicesTsService {

  isFormVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isFormVisible = false;
  
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    this.isFormVisibleChange.emit(this.isFormVisible);
  }

  setFormVisibility(isVisible: boolean) {
    this.isFormVisible = isVisible;
    this.isFormVisibleChange.emit(this.isFormVisible);
  }
}
