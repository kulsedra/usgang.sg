import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { AppComponent } from '@app/app.component'
import { TestComponent } from './test/test.component'
import { HeuteModule } from './heute/heute.module';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/heute', pathMatch: 'full' },
      { path: '**', redirectTo: '/404' },
    ]),
    HeuteModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
