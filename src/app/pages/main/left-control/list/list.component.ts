import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, ViewContainerRef, TemplateRef } from '@angular/core';
import { List } from 'src/domain/entities';
import { NzModalService} from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { ListService } from 'src/app/services/list/list.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { takeUntil } from 'rxjs/operators';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit,OnDestroy {
  @Input() isCollapsed: boolean;
  @ViewChild('listRenameInput',{static: false}) private listRenameInput: ElementRef;
  @ViewChild('listInput',{static: false}) private listInput: ElementRef;

  lists: List[];
  currentListUuid: string;
  contextListUuid: string;
  addListModalVisible = false;
  renameListModalVisible = false;

  private destroy$ = new Subject();

  constructor(
    private nzContextMenuService:NzContextMenuService,
    private listService: ListService,
    private todoService: TodoService,
    private modal: NzModalService
  ) { }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }


  ngOnInit() {
    this.listService.lists$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lists => {
        this.lists = lists;
      });

    this.listService.currentUuid$
      .pipe(takeUntil(this.destroy$))
      .subscribe(uuid => {
        this.currentListUuid = uuid;
      });

    this.listService.getAll();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  closeAddListModal(): void {
    this.addListModalVisible = false;
  }

  closeRenameListModal(): void {
    this.renameListModalVisible = false;
  }

  openAddListModal(): void {
    this.addListModalVisible = true;
    setTimeout(() => {
      this.listInput.nativeElement.focus();
    });
  }

  openRenameListModal(): void {
    this.renameListModalVisible = true;
    setTimeout(() => {
      const title = this.lists.find(l => l._id === this.contextListUuid).title;
      console.log(title);
      this.listRenameInput.nativeElement.value = title;
      this.listRenameInput.nativeElement.focus();
    });
  }
/*
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, uuid: string): void {
    this.nzContextMenuService.create($event, menu);
    this.contextListUuid = uuid;
  }
*/
  click(uuid: string): void {
    this.listService.setCurrentUuid(uuid);
  }

  rename(title: string): void {
    this.listService.rename(this.contextListUuid, title);
    this.closeRenameListModal();
  }

  add(title: string): void {
    this.listService.add(title);
    this.closeAddListModal();
  }

  delete(): void {
    const uuid = this.contextListUuid;
    this.modal.confirm({
      nzTitle: '确认删除列表',
      nzContent: '该操作会导致该列表下的所有待办事项被删除',
      nzOnOk: () =>
        new Promise((res, rej) => {
          this.listService.delete(uuid);
          this.todoService.deleteInList(uuid);
          res();
        }).catch(() => console.error('Delete list failed'))
    });
  }
/*
  close(): void {
    this.dropdown.close();
  }*/
}
