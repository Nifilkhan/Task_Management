import { Injectable,EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtaskServicesTsService {

  private formVisibilitySubject = new BehaviorSubject<boolean>(false);

  isFormVisible$ = this.formVisibilitySubject.asObservable();
  
  toggleForm() {
    const currentVisiblility = this.formVisibilitySubject.value;
    this.formVisibilitySubject.next(!currentVisiblility);
  }

  setFormVisibility(isVisible: boolean) {
    this.formVisibilitySubject.next(isVisible);
  }
}
