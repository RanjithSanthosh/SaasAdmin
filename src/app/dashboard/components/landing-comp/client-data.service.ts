import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';

export interface ClientDataFormate {
  id:string;
  Client_Code: string;              // max 20 chars
  Client_Name: string;              // max 50 chars
  Address: string;                  // max 200 chars
  State: string;                    // max 50 chars
  Mobile: string;                   // max 12 chars
  Alternate_Mobile?: string;        // max 12 chars (optional)
  Email: string;                    // max 50 chars
  Contact_Person: string;           // max 50 chars
  Creation_Date: string;            // ISO date (YYYY-MM-DD)
  Subscription_Start: string;       // ISO date (YYYY-MM-DD)
  Subscription_End: string;         // ISO date (YYYY-MM-DD)
  App_Login: string;                // max 20 chars
  App_Pwd: string;                  // max 20 chars
  Db_Name: string;                  // max 20 chars
  Status: 'Active' | 'Inactive';
  Version_Type: 'Standard' | 'Advanced' | 'Enterprise';
  Own_Server: 'Yes' | 'No';
}

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
private readonly endpoint = 'clients.json';
  constructor(private api: ApiService) { }

  getClients():Observable<ClientDataFormate[]> {
    return this.api.get<ClientDataFormate[]>(this.endpoint);
  }
}
