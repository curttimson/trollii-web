import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
    if (this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }

  }

  login() {
    this.authService.login();
  }

}
