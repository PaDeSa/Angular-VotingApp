import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import Swal from 'sweetalert2';

import { Election } from '../../services/services';
import { ValidateOtp } from '../validate-otp/validate-otp';

@Component({
  selector: 'app-candidats',
  imports: [MatDialogModule],
  templateUrl: './candidats.html',
  styleUrl: './candidats.css'
})
export class Candidats implements OnInit {
  private dialog = inject(MatDialog);

  bulletins:any = [];
  electionService = inject(Election);

  constructor(private router: Router,private route: ActivatedRoute,private cdr: ChangeDetectorRef) { 

  }

  electionId:number | null = null;

  ngOnInit(): void {
    this.electionId = Number(this.route.snapshot.paramMap.get('electionId'));
    console.log("Candidats component initialized with electionId: ", this.electionId);
    if (this.electionId) {
      this.loadCandidatsBulletins(this.electionId);
    }
  }


  loadCandidatsBulletins(idElection:number){
    // Appel au service pour récupérer les bulletins des candidats pour l'electionId
    this.electionService.bulletinsCandidats({electionId: idElection}).subscribe((response) => {
      this.bulletins = response.data;
      this.cdr.detectChanges();
    });
  }


  voter(bulletinId:number, electionId:number){
    console.log("Vote pour le bulletinId: ", bulletinId, " dans l'electionId: ", electionId); 
   
    let object ={
      bulletinId: bulletinId,
      electionId: electionId
    }

   this.electionService.voterCandidat({
      body: object
   }).subscribe({
      next:(data:any)=>{
        Swal.fire({
          title: 'Vote !!!',
          text: 'Vote enregistré avec succès. Veuillez valider avec le code OTP envoyé.',
          icon: 'success',
        });
        
        this.openOtpDialog(bulletinId);
      },
      error:(error:any)=>{
        console.log("Erreur lors du vote: ", error);
        Swal.fire({
          title: 'Erreur de Vote !!!',
          text: error?.error?.errorDTOS[0]?.errorMessage,
          icon: 'error',
        });
      }

   })
      
  }

  openOtpDialog(bulletinId:number){
    // Ouvrir le dialogue de validation OTP ici
    this.dialog.open(ValidateOtp, {
      width: '400px',
      height: '200px',
      data: { bulletinId: bulletinId }
    });
  }

}
