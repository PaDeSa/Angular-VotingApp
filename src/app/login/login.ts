import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth } from '../auth/auth';
import Swal from 'sweetalert2';
import { AuthRequest } from '../services/model/auth-request';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor ( private router : Router ) {}

    email = signal('');
    password = signal('');
    errorMessage = signal('');

    authService = inject(Auth);


  login() {
    const object:AuthRequest ={
      "usernameOrEmail": this.email(),
      "password": this.password()
    }
    this.authService.login(
      {
        body: object
      }
     )
    .subscribe({
      next:(data:any)=>{

        let jwtResponse = data?.data
        this.authService.store(jwtResponse?.accessToken,jwtResponse?.user)
        Swal.fire({
          title: 'Session !!!',
          text: 'Authentification réussie',
          icon: 'success',
          //confirmButtonText: 'OK'
        });
        console.log("succeed logged !!!")
        this.router.navigate(['/dashboard']);
      },
      error:(error:any)=>{
        Swal.fire({
          title: 'Session !!!',
          text: error?.error?.errorDTOS[0]?.errorMessage,
          icon: 'error',
          //confirmButtonText: 'OK'
        });
      }
    })
  }
}
