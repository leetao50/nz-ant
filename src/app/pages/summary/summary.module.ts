import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ]
})
export class SummaryModule { }
