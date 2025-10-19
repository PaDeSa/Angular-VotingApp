import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';  
import { Candidats } from './components/candidats/candidats';
import { Maininfo } from './components/maininfo/maininfo';
import { Home } from './home/home';
import { GestionCandidats } from './components/gestion-candidats/gestion-candidats';
import { GestionElection } from './components/gestion-election/gestion-election';
import { GestionRole } from './components/gestion-role/gestion-role';
import { GestionUser } from './components/gestion-user/gestion-user';
import { GestionBulletin } from './components/gestion-bulletin/gestion-bulletin';
import { ElectionsOpened } from './components/elections-opened/elections-opened';
import { Scrutin } from './components/scrutin/scrutin';
import { Registration } from './registration/registration';
import { authGuard } from './auth/guards/auth-guard';



export const routes: Routes = [
    {path: '', component:Home},
    {path:"registration", component: Registration},
    {path: "login", component: Login},
    {path: "dashboard", component: Dashboard,


    children: [
        {path: "", component: Maininfo},
        //{path: "candidats", component: Candidats},
        {path:"gestion-candidats", component: GestionCandidats},
        {path:"gestion-election", component: GestionElection},
        {path:"gestion-role", component: GestionRole},
        {path:"gestion-user", component: GestionUser},
        {path:"gestion-bulletin", component: GestionBulletin},
        {path:"election-opened", component: ElectionsOpened},
        {path:"scrutin", component: Scrutin},
    ],
      canActivate: [authGuard]
    },
    

];
