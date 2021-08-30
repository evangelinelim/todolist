import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { Task } from '../../Task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = []
  constructor(private taskservice: TaskService) { }

  ngOnInit(): void {
    this.taskservice.getTasks().subscribe((tasks) => this.tasks = tasks);
  }
  deleteTask(task: Task) {
    this.taskservice.deleteTask(task).subscribe(
      () => (this.tasks = this.tasks.filter(
        (t) => t.id !== task.id)));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskservice.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskservice.addNewTask(task).subscribe((task) => (this.tasks.push(task)));
  }

}
