import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { LeftControlComponent } from './left-control/left-control.component';
import { ListComponent } from './left-control/list/list.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RightControlComponent } from './right-control/right-control.component';
import { HeaderComponent } from './right-control/header/header.component';
import { QuickAddComponent } from './right-control/quick-add/quick-add.component';
import { TodoComponent } from './right-control/todo/todo.component';

@NgModule({
  declarations: [MainComponent, LeftControlComponent, ListComponent, RightControlComponent, HeaderComponent, QuickAddComponent, TodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NzDropDownModule,
    MainRoutingModule
  ]
})
export class MainModule { }
