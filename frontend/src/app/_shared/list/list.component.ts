import { Component, OnInit } from '@angular/core';
import { DbService } from '@app/heute/db.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.sass']
})

export class ListComponent implements OnInit {
  clubs: any;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.db.getClubs()
      .then(response => {
        this.clubs = response.documents;
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }
}