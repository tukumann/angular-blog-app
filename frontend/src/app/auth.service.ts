import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './dashboard/user';
import { DeletePost, Post } from './dashboard/postTypes';

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any
  user: any
  post: any

  constructor(
    private http: HttpClient
  ) { }


  
  registerUser(user: any):Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/reg', user, { headers: headers });
  }

  authUser(user: User):Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/auth', user, { headers: headers });
  }

  storeUser(token: any, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isAuthenticated() {
    return tokenNotExpired();
  }

  createPost(post:any):any {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let url = 'http://localhost:3000/account/dashboard';
    let ans =  this.http.post(url, post, { headers: headers });
    console.log("postAns : ", ans)
    return ans;
  }

  getAllPosts():Observable<Post[]> {
    let url = 'http://localhost:3000/';
    let ans = this.http.get<Post[]>(url);
    console.log("Observable: ", ans);
    return ans;
  }

  getPostById (id: any) {
    let url = `http://localhost:3000/post/${id}`;
    let ans = this.http.get<Post>(url);
    return ans;
  }

  deletePost(id: any) {
    let url = `http://localhost:3000/post/${id}`;
    let ans = this.http.delete<DeletePost>(url);
    return ans;
  }
  
}
