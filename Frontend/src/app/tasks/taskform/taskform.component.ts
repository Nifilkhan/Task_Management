import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter, signal, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../shared/model/taskModel';
import Swal from 'sweetalert2';

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

  //handle the form data and its validation
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

  //updating the form values when the component receives a new input data
  updateForm(): void {
    if (this.data) {
      this.tasksForm.patchValue({
        title: this.data.title,
        taskDescription: this.data.taskDescription,
        taskDueDate: this.data.taskDueDate,
        status: this.data.status || ''
      });
    } else {
      this.tasksForm.reset({
        status:'Select'
      });
    }
  }
  


  close() {
    this.hideForm.emit();
  }

  //method for submitting the form data for the task creation and update
  onSubmit() {
    if(this.tasksForm.valid){
      if(this.data) {
        //updating the task  with the id  _id as string  from the data object  passed to the component
        this.tasksService.updateTask(this.data._id as string ,this.tasksForm.value).subscribe({
          next:(response) => {
            this.close();
            this.tasksForm.reset(); //after the task has been created the form is reset
            Swal.fire('success','Task UpdatedSuccessfully!','success');
          }
        })
      } else {
        //creating the task
        this.tasksService.createTask(this.tasksForm.value).subscribe({
          next:(response) => {
            this.close();
            this.tasksForm.reset(); //after the task has been created the form is reset
            Swal.fire('success','Task Created Successfully!','success');
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
