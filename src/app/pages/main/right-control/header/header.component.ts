import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list/list.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { RankBy } from 'src/domain/type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private listTitle$:Subscription;

  listTitle="";

  constructor(
    private listService:ListService,
    private todoService:TodoService
  ) { }

  ngOnInit() {
    this.listTitle$ = this.listService.current$.subscribe(
      list=>{this.listTitle=list?list.title:"";}
    )
  }

  switchRankType(e: RankBy): void {
    this.todoService.toggleRank(e);
  }

}
