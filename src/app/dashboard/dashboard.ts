import { Component } from '@angular/core';
import { Nav } from '../shared/nav/nav';
import { RouterOutlet } from '@angular/router';
import { Main } from '../shared/main/main';

@Component({
  selector: 'app-dashboard',
  imports: [Main,Nav, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
