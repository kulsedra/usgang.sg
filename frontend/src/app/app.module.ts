import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from '@app/app.component'
import { TestComponent } from './test/test.component'
import { HeuteModule } from './heute/heute.module';
import { DayComponent } from './day/day.component'

const routes: Routes = [
  { path: 'day/:day', component: DayComponent },
  { path: '', redirectTo: '/day/today', pathMatch: 'full' },
  { path: '**', redirectTo: '/day/today' }
];


@NgModule({
  declarations: [AppComponent, DayComponent, TestComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HeuteModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
