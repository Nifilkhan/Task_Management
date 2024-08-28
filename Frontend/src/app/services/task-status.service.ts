import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor() { }

  private statusSubject = new BehaviorSubject<string>('All Tasks');
  status$ = this.statusSubject.asObservable();

  setStatus(status: string): void {
    this.statusSubject.next(status);
  }
}
