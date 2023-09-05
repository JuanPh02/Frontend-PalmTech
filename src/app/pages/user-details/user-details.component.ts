import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  getUserInfo(email: string) {
    this.usersService.getUserInfo(email).subscribe(resp => {
      console.log(resp);
    })
  }

}
