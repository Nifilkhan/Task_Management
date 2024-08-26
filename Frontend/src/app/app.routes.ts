import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    {path:'', redirectTo:'all-tasks', pathMatch:'full'},
    {path:'all-tasks', component:TasksComponent},
    {path:'all-tasks/:status', component:TasksComponent}
];
