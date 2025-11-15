import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import {
  Election,
  User,
} from '../../services/services';

@Component({
  selector: 'app-save-bulletin',
  imports: [CommonModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './save-bulletin.html',
  styleUrl: './save-bulletin.css'
})
export class SaveBulletin implements OnInit {

  ngOnInit(): void {
    //this.loadUsers(0,10);
    this.loadUsers2();
    this.loadElections(0,10);
      
  }
  electionData:any;

  private fb = inject(FormBuilder);
  private electionService = inject(Election);
  private userService = inject(User);
  private cdr = inject(ChangeDetectorRef);
  userData: any;
  pages: any[] = [];
  private router = inject(Router);
  errorMessage = signal('');
  bulletinForm: FormGroup;
  users:any;
  dialog = inject(MatDialog);

  dialogRef = inject(MatDialogRef<SaveBulletin>);

   selectedBookCover: any;
   selectedPicture: string | undefined;

  constructor() {
     this.bulletinForm = this.fb.group({
       email: [''],
       nameElection: [''],
       nameParty: [''],
       adressParty: ['']
     });
  }


  loadUsers(page: number, size: number): void {
      this.userService.findAllUsers(
        {
          page: page,
          size: size
        }
      ).subscribe({
        next:(datas:any)=>{
          this.userData = datas?.data?.content;     
          this.pages = Array(datas?.data?.totalPages)
           .fill(0)
           .map((x, i) => i);
            this.cdr.detectChanges();
       },
       error:(error:any)=>{
        console.log("Error")
       }
        })
      
    }

    loadUsers2(){
      this.userService.listElectors().subscribe({
        next:(datas:any)=>{
          console.log(datas);
          this.userData = datas?.data;
          this.cdr.detectChanges();
       },
       error:(error:any)=>{
        console.log("Error")
       }
        })
    }
    findOnlyElectors(data:any[]){
      for(let i=0;i<data.length;i++){
         for(let j=0;j<data[i].roles.length;j++){
            if(data[i].roles[j].roleName === 'ELECTOR'){
               this.users.push(data[i]);
            }
         }
      }

    }

  

    loadElections(page:number,size:number){
      this.electionService.findAllElections(
        {
          page: page,
          size: size
        }
      ).subscribe({
        next:(datas:any)=>{
          this.electionData = datas?.data?.content;     
          this.pages = Array(datas?.data?.totalPages)
           .fill(0)
           .map((x, i) => i);
            this.cdr.detectChanges();
       },
       error:(error:any)=>{
        console.log("Error")
       }
        })
    }


    onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

    createBulletin() {
    console.log(this.bulletinForm.value);
    this.electionService.createBulletin(
      {
        body: this.bulletinForm.value
      }
    ).subscribe({
      next:(datas:any)=>{
        console.log(datas);
        //this.router.navigate(['bulletins']);
        //call upload function here
        let id = /* The expression `datas?.data?.candidat?.id` is trying to access the `id` property of
        the `candidat` object within the `data` object within the `datas` object. */
        datas?.data?.candidat?.id;
        console.log("Candidat ID:", id);
        this.uploadUserPicture(id);
        Swal.fire('Succès', 'Bulletin créé avec succès', 'success');
        this.close();
       },
       error:(error:any)=>{
        console.log("Error")
       }
        })

    }

    uploadUserPicture(idCandidat:number){
      const formData = new FormData();
      if(this.selectedBookCover){
        formData.append('file', this.selectedBookCover);
      }
      this.userService.uploadCover(idCandidat,formData).subscribe({
        next:(datas:any)=>{
          console.log(datas);
         },
         error:(error:any)=>{
          console.log("Error")
         }
        })
    }

    close(){
      this.dialogRef.close();
    }
    

}
