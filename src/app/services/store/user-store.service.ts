import { Injectable } from '@angular/core';

import { User } from '../../models/user';

@Injectable()
export class UserStoreService {

  constructor() { }

  user: User;

  public clear(){
    this.user = null;
  }

}
