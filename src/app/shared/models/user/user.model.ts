import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.model.html',
  styleUrls: ['./user.model.scss']
})
export class UserModel {
  constructor(
    public login?: string,
    public password?: string
  ){}
}
