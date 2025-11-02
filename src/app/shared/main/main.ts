import {
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  private authS = inject(Auth)
  user : any;


  constructor(){

  }

  ngOnInit(): void {
    this.user = this.authS.getUserAuth();
    console.log("user object "+JSON.stringify(this.user));
    console.log("username "+this.user?.username);

  }

  

}
