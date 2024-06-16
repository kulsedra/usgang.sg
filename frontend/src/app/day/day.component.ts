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
  events: any[] = [];
  clubs: any[] = [];
  selection: number;
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
      this.selection = this.dayMapping[this.day] ?? this.selection;
      this.db.setSharedVariable(this.dayMappingString[this.day]);
      this.fetchClubs();
    });
  }

  async fetchEvents(): Promise<void> {
    try {
      const response = await this.db.getEvents(this.selection);
      this.events = response.documents; 

      this.mapEventsToClubs();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  async fetchClubs(): Promise<void> {
    try {
      const response = await this.db.getClubs();
      this.clubs = response.documents; 
      await this.fetchEvents();
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  }

  private mapEventsToClubs(): void {
    if (this.events.length > 0 && this.clubs.length > 0) {
      this.clubs.forEach(club => {
        club.event = this.events.find(event => event.club.$id === club.$id);
      });
    }
  }

  public open(club: any): void {
    window.location.href = club.event ? club.event.event_link : club.club_link;
  }
}
