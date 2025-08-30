import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';  
import { Candidats } from './candidats/candidats';
import { Home } from './home/home';
import { NgModel } from '@angular/forms';



export const routes: Routes = [
    {path: "login", component: Login},
    {path: "dashboard", component: Dashboard},
    {path: "candidats", component: Candidats},
    {path: "", component: Home},
    {path: "**", redirectTo: ""} //wildcard route

];
