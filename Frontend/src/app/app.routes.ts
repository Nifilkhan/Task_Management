import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { CompletedComponent } from './completed/completed.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { ImportantComponent } from './important/important.component';

export const routes: Routes = [
    {path:'', redirectTo:'all-tasks', pathMatch:'full'},
    {path:'all-tasks', component:TasksComponent},
    {path:'completed',component:CompletedComponent},
    {path:'in-progress',component:InProgressComponent},
    {path:'important',component:ImportantComponent}
];
