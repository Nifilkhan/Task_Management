export interface ApiResponse<T> {
    message?:string;
    tasks:T;
}

export interface Task {
    _id?:string,
    title:string,
    taskDescription:string,
    taskDueDate:string,
    status: 'Completed' | 'In-Progress' | 'Important',
    buttonVisibility:boolean,
    isTextHidden?: boolean,
    showMore? :boolean
}