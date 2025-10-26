import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../auth/auth'; // ton service Auth
import { RegisterRequest } from '../services/model/register-request';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(Auth);

  registerForm: FormGroup;
  errorMessage = signal('');

  constructor() {
    // Définition du formulaire avec validators
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Soumission du formulaire
  register() {
    if (this.registerForm.invalid) {
      Swal.fire('Erreur', 'Veuillez corriger les champs invalides', 'error');
      return;
    }

    const object: RegisterRequest = this.registerForm.value;

    this.authService.register({ body: object })
      .subscribe({
        next: (data: any) => {
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Votre compte a été créé avec succès 🎉',
            icon: 'success'
          });
          this.registerForm.reset();
          this.router.navigate(['/login']); // Redirige vers login après inscription
        },
        error: (error: any) => {
          // Utilise les messages d'erreur de ton backend
          const backendError = error?.error?.errorDTOS?.[0]?.errorMessage || 'Échec de l’inscription';
          Swal.fire({
            title: 'Erreur',
            text: backendError,
            icon: 'error'
          });
        }
      });
  }
}
