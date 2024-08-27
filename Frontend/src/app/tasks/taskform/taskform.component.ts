import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter, signal, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../shared/model/taskModel';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css'],
})
export class TaskformComponent implements OnChanges{
  @Input() data:Task | null = null;
  @Input() showForm: boolean = false;  
  @Output() hideForm = new EventEmitter<void>();
  tasksForm: FormGroup;

  constructor(private fb:FormBuilder,private tasksService:TasksService) {
    this.tasksForm = this.fb.group({
      title: new  FormControl('',[Validators.required]),
      taskDescription: new  FormControl('',[Validators.required]),
      taskDueDate: new  FormControl('',[Validators.required]),
      status: new  FormControl('',[Validators.required])
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateForm();
    }
  }

  updateForm(): void {
    if (this.data) {
      this.tasksForm.patchValue({
        title: this.data.title,
        taskDescription: this.data.taskDescription,
        taskDueDate: this.data.taskDueDate,
        status: this.data.status
      });
    } else {
      this.tasksForm.reset();
    }
  }

  close() {
    this.hideForm.emit();
  }
  onSubmit() {
    if(this.tasksForm.valid){
      if(this.data) {
        this.tasksService.updateTask(this.data._id as string ,this.tasksForm.value).subscribe({
          next:(response) => {
            this.close();
            this.tasksForm.reset();
          }
        })
      } else {
        this.tasksService.createTask(this.tasksForm.value).subscribe({
          next:(response) => {
            this.close();
            this.tasksForm.reset();
          }
        })
      }
    }else {
      this.tasksForm.markAllAsTouched()
    }
  }
  get isEditMode(): boolean {
    return !!this.data;
  }

}
