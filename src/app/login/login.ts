import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

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

  login() {
    if (this.email() === 'admin@ad.sn' && this.password() === '1234') {
      this.errorMessage.set('');
      alert('Connexion réussie ✅');
      this.router.navigate(['/dashboard']);
    } else if (this.email() === 'psarr@vote.sn' || this.password() === 'Voting2026@') {
      this.errorMessage.set('');
      alert('Connexion réussie ✅');
      this.router.navigate(['/candidats']);
    }
    else {
      this.errorMessage.set('Nom d’utilisateur ou mot de passe incorrect ❌');
    }
  }
}
