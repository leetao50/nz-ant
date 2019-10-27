import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { Todo, List } from 'src/domain/entities';
import { ListService } from 'src/app/services/list/list.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { takeUntil } from 'rxjs/operators';
import { floorToDate, getTodayTime } from 'src/utils/time';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {

  private destory$ = new Subject();

  todos:Todo[]=[];
  lists:List[]=[];

  currentContextTodo:Todo;

  constructor(
    private listService:ListService,
    private todoService:TodoService
  ) { }

  ngOnInit() {
    this.listService.lists$
    .pipe(takeUntil(this.destory$))
    .subscribe(
      lists=>{this.lists=lists
      });

      combineLatest(this.listService.currentUuid$,this.todoService.todo$)
      .pipe(takeUntil(this.destory$))
      .subscribe(
        source =>{this.processTodos(source[0],source[1]);
      });

      this.todoService.getAll();
      this.listService.getAll();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destory$.next();
  }

  processTodos(listUUID: string, todos: Todo[]):void {
    const filteredTodos=todos
    .filter(todo=>{
      return ((listUUID === 'today' && todo.planAt && floorToDate(todo.planAt) <= getTodayTime())
          || (listUUID === 'todo' && (!todo.listUUID || todo.listUUID === 'todo'))
          || (listUUID === todo.listUUID));
    })
    .map(todo=> {
      Object.assign({},todo) as Todo
    });

    this.todos=[].concat(filteredTodos);
  }

  add(title:string):void{
    this.todoService.add(title);
  }
  

}
