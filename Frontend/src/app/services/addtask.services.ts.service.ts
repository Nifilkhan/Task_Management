import { Injectable,EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtaskServicesTsService {

  private formVisibilitySubject = new BehaviorSubject<boolean>(false);

  isFormVisible$ = this.formVisibilitySubject.asObservable();

  //managing the form visibility
  toggleForm() {
    const currentVisiblility = this.formVisibilitySubject.value;
    this.formVisibilitySubject.next(!currentVisiblility);
  }

  //setting the initial form visibility
  setFormVisibility(isVisible: boolean) {
    this.formVisibilitySubject.next(isVisible);
  }
}
