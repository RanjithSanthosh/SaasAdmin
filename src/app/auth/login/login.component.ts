import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Username: string = '';
  Password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  Login(): void {
    if (this.Username == 'Admin' && this.Password == 'admin') {
      console.log("auth");

      this.router.navigate(['dashboard'])
    }
  }
}
