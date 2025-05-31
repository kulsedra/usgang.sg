import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from '@app/app.component'
import { DayComponent } from './day/day.component'

const routes: Routes = [
  { path: 'day/:day', component: DayComponent },
  { path: '', redirectTo: '/day/today', pathMatch: 'full' },
  { path: '**', redirectTo: '/day/today' }
];


@NgModule({
  declarations: [AppComponent, DayComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
