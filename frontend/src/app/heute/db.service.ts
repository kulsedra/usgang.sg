import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client, Account, Storage, Query, Databases } from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly client = new Client();

  private readonly account = new Account(this.client);

  private readonly storage = new Storage(this.client);

  private databases = new Databases(this.client);

  private clubs: string;

  
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
  }

  
}
