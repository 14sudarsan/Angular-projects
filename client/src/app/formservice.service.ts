import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormserviceService {

  constructor() { }

  receivedname:string|null=null;

  private nameAddedSource = new BehaviorSubject<string|null>(null);

  nameAdded$ = this.nameAddedSource.asObservable();


  emitName(name:string){
    this.nameAddedSource.next(name)

    console.log("Form service activated")

  }
}
