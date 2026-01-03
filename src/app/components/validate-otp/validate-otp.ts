import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Election } from '../../services/services';

@Component({
  selector: 'app-validate-otp',
  imports: [CommonModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './validate-otp.html',
  styleUrl: './validate-otp.css'
})
export class ValidateOtp implements OnInit {

  private electionService = inject(Election);

  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ValidateOtp>)
  private data = inject(MAT_DIALOG_DATA)

  otpForm = inject(FormBuilder).group({
    otp: ['',Validators.required],
  });

  constructor() { }
  ngOnInit(): void {
    console.log("Data reçue dans ValidateOtp:", this.data.bulletinId);
  }

  submitOtp(){
    if(this.otpForm.valid){
      const otpValue = this.otpForm.get('otp')?.value;
      console.log("OTP soumis:", otpValue);

      let object ={
        bulletinId: this.data.bulletinId,
        code: this.otpForm.value.otp ?? ''
      }

      this.electionService.submitOtp({
        body: object
      }).subscribe({
        next:(data:any)=>{
          console.log(data);
          Swal.fire({
            title: 'Vote !!!',
            text: 'Vote validé avec succès.',
            icon: 'success',
          });
          this.dialogRef.close(data);

          this.router.navigate(['/dashboard/election-opened']);

        },
        error:(error:any)=>{
          console.log("Erreur lors de la soumission de l'OTP:", error);
          Swal.fire({
            title: 'Erreur de validation OTP !!!',
            text: error?.error?.errorDTOS[0]?.errorMessage,
            icon: 'error',
          });
        }
      }) 
  }

}

}

