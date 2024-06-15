import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DbService } from './heute/db.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit  {
  dropdownOpen = false;
  public selection: string;
  subscription: Subscription;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.subscription = this.db.selection$.subscribe(value => {
      this.selection = value;
      this.cdr.detectChanges(); 
    });;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}