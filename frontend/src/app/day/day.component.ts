import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '@app/heute/db.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.pug',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {
  public day: string;
  events: any;
  clubs: any;
  selection: any;
  dayMapping: { [key: string]: number } = {
    'today': 0,
    'tomorrow': 1,
    'dayafter': 2,
  };
  dayMappingString: { [key: string]: string } = {
    'today': 'heute',
    'tomorrow': 'morgen',
    'dayafter': 'übermorgen',
  };
  
  sharedVariable: string;

  constructor(private route: ActivatedRoute, private db: DbService) { }
  
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {

      this.day = params.get('day')!;
      
      this.selection = this.dayMapping[this.day] !== undefined ? this.dayMapping[this.day] : this.selection;
      this.db.setSharedVariable(this.dayMappingString[this.day])

      this.fetchClubs();
    });

    
  }

  async fetchEvents() {
    try {
      const response = await this.db.getEvents(this.selection);
      this.events = response.documents; 
      if(this.events){
        this.clubs.forEach((club: any) => {
          this.events.forEach((event: any) => {
            if(club.$id === event.club.$id) {
              club.event = event;
            }
          })
        });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }

    
  }

  async fetchClubs() {
    try {
      const response = await this.db.getClubs();
      this.clubs = response.documents; 
      this.fetchEvents();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
}


  public open(club: any){
    window.location.href = club.event ? club.event.event_link : club.club_link;
  }
}