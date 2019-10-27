import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';




@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class SetupModule { }
