import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {

  authS = inject(Auth)
  user : any;
  isAdmin : boolean = false;
  isSupervisor : boolean = false;
  isElector : boolean = false;

  constructor(){
  }

  ngOnInit(): void {
      this.user = this.authS.getUserAuth();
      this.isAdmin = this.authS.isAdmin(JSON.stringify(this.user));
      this.isSupervisor = this.authS.isSupervisor(JSON.stringify(this.user));
      this.isElector = this.authS.isElector(JSON.stringify(this.user));
      console.log("user object "+JSON.stringify(this.user));
      console.log("isAdmin "+this.isAdmin);
      console.log("isSupervisor "+this.isSupervisor);
      console.log("isElector "+this.isElector);
  }

}
