import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.less']
})
export class RightControlComponent implements OnInit {

  constructor(private todoList:TodoService) { }

  ngOnInit() {
  }

  add(title:string):void{
    this.todoList.add(title);
  }

}
