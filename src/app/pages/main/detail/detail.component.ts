import { Component, OnInit, Output, HostBinding } from '@angular/core';
import { EventEmitter } from 'events';
import { Todo } from 'src/domain/entities';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TodoService } from 'src/app/services/todo/todo.service';
import { NzMessageService } from 'ng-zorro-antd';
import { first } from 'rxjs/operators';
import { lessThanADay, floorToDate, getTodayTime, getCurrentTime, floorToMinute } from 'src/utils/time';
import { detailTransition } from './detail.animation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  animations: [ detailTransition ]
})
export class DetailComponent implements OnInit {

  @Output() changeTodo =new EventEmitter();
  @HostBinding('@detailTransition') state = 'activated';

  private trueSource:Todo;
  currentTodo:Todo;
  dueDate:Date;
  planDate:Date;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private todoService:TodoService,
    private message:NzMessageService
  ) { }



  ngOnInit() {
    this.route.paramMap.pipe(first()).subscribe((paramsMap:ParamMap)=>{
      const id=paramsMap.get('id');
      const todo=this.todoService.getByUuid(id);
      this.trueSource=todo;
      this.currentTodo = Object.assign({},todo) as Todo;

      if(todo.dueAt){
        this.dueDate= new Date(todo.dueAt);
      }

      if(todo.planAt){
        this.planDate = new Date(todo.planAt);
      }
    });
  }

  goBack(){
    this.router.navigateByUrl('main');
  }

  handlePlanDateChange(date:Date):void{
    const t = date?date.getDate():undefined;
    if(!t){
      this.currentTodo.notifyMe=false;
    }

    this.currentTodo.planAt = t;
    this.checkDate();
  }

  handleDueDateChange(date:Date):void{
    const dueAt = date ? date.getTime() : undefined;
    this.currentTodo.dueAt = dueAt;
    if (dueAt && lessThanADay(dueAt)) {
      this.message.warning('项目将会在 24 小时内到期', {
        nzDuration: 6000
      });
    }
    this.checkDate();
  }

  checkDate() {
    throw new Error("Method not implemented.");
  }

  dueDisabledDate = (d: Date): boolean => floorToDate(d) < getTodayTime();
  planDisabledDate = (d: Date): boolean => floorToMinute(d) < getCurrentTime();

  clickSwitch(): void {
    if (this.currentTodo.completedFlag) { return; }
    if (!this.currentTodo.planAt) {
      this.message.warning('尚未设置计划日期');
      return;
    }
    this.currentTodo.notifyMe = !this.currentTodo.notifyMe;
  }

  confirm(): void {
    this.todoService.update(this.currentTodo);
    this.goBack();
  }

  delete(): void {
    this.todoService.delete(this.currentTodo._id);
    this.goBack();
  }
}
