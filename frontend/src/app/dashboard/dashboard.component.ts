import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { User } from './user';
import { Post } from './postTypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: any
  category: any
  photo: any
  text: any 
  author: any

 

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  createPost():any {
    const user: User = JSON.parse(localStorage.getItem('user') || "{}");
    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: user.login,
      date: new Date()
    }

    if (!post.category) {
      this._flashMessagesService.show('Enter category', 
      { cssClass: 'alert-danger', timeout: 2100 });
      // return false
    }

    else if (!post.title) {
      this._flashMessagesService.show('Enter your title', 
      { cssClass: 'alert-danger', timeout: 2100 });
      // return false
    }

    else if (!post.photo) {
      this._flashMessagesService.show('Attach your photo', 
      { cssClass: 'alert-danger', timeout: 2100 });
      // return false
    }

    else if (!post.text) {
      this._flashMessagesService.show('Enter your text', 
      { cssClass: 'alert-danger', timeout: 2100 });
      // return false
    }

    console.log(post);

    this.authService.createPost(post).subscribe( (data:any) => {
      console.log("data: ", data)
      if (!data.success) {
        this._flashMessagesService.show(data.msg, 
        { cssClass: 'alert-danger', timeout: 2100 });       
      } else {
        this._flashMessagesService.show(data.msg, 
          { cssClass: 'alert-success', timeout: 2100 }); 
          this.router.navigate(['/'])   
      }
    })

  //  return false
  }

}
