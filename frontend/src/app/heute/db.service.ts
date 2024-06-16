import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client, Account, Storage, Query, Databases } from 'appwrite';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly client = new Client();

  private readonly account = new Account(this.client);

  private readonly storage = new Storage(this.client);

  private databases = new Databases(this.client);

  private days = [new Date(new Date().setUTCHours(0,0,0,0)), new Date(new Date().setUTCHours(0,0,0,0)), new Date(new Date().setUTCHours(0,0,0,0))]
  private formattedDays = ["", "", ""];


  private selectionSubject = new BehaviorSubject<string>('heute');
  selection$ = this.selectionSubject.asObservable();

  setSharedVariable(value: string) {
    this.selectionSubject.next(value);
  }

  public async getEvents(i: number): Promise<any> {
    return this.databases.listDocuments(
      'usgang.sg', 
      'event', 
      [
        Query.equal('event_date', this.formattedDays[i])
      ]
    );
  }
  
  public async getClubs(): Promise<any> {
    return this.databases.listDocuments(
      'usgang.sg',
      'club', 
      [] 
    );
  
  }


  constructor() {
    this.client
      .setEndpoint(environment.APPWRITE_API_ENDPOINT)
      .setProject(environment.APPWRITE_PROJECT_ID);

    
    this.days[1].setDate(this.days[0].getDate() + 1);
    this.days[2].setDate(this.days[0].getDate() + 2);
    this.formattedDays = this.days.map(day => day.toUTCString());

  }

  
}
