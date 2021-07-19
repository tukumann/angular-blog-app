import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { User } from '../dashboard/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  login: any
  password: any
  user!: User

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: -1 });
  }

  signIn() {
    const user = {
      login: this.login,
      password: this.password
    }


    if (!user.login) {
      this._flashMessagesService.show('Enter your login', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }


    else if (!user.password) {
      this._flashMessagesService.show('Enter your password', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    this.authService.authUser(user).subscribe( data => {
      console.log(data)
      if (!data.succes) {
        this._flashMessagesService.show("User not found", 
        { cssClass: 'alert-danger', timeout: 3000 });     
      } else {
        this._flashMessagesService.show("You have succesfully logged in!", 
          { cssClass: 'alert-success', timeout: 3000 }); 
          this.router.navigate(['/dashboard']);
          this.authService.storeUser(data.token, data.user);
      }
    })

   return false
  }
 
}
