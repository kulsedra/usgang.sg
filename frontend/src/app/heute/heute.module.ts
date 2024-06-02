import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeuteRoutingModule } from './heute-routing.module';
import { ListComponent } from '../_shared/list/list.component';
import { SharedModule } from '@shared/module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeuteRoutingModule,
  
    RouterModule.forChild([
      { path: 'heute', component: ListComponent },
    ]),
  ]
})



export class HeuteModule {

}


 
