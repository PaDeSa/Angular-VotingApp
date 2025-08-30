import  { NgModule } from '@angular/core';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';   // 👈 obligatoire

import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],  // 👈 obligatoire
  standalone: true, // 👈 Add standalone: true
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('VotingApp');
  
  imports: [RouterOutlet, FormsModule, Login] | undefined // 👈 Add FormsModule and Login to imports
}