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
import { Router } from '@angular/router';

import {
  Election,
  User,
} from '../../services/services';

@Component({
  selector: 'app-save-bulletin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './save-bulletin.html',
  styleUrl: './save-bulletin.css'
})
export class SaveBulletin implements OnInit {

  ngOnInit(): void {
    this.loadUsers(0,10);
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

   selectedBookCover: any;
   selectedPicture: string | undefined;

  constructor() {
     this.bulletinForm = this.fb.group({
       email: [''],
       nameElection: [''],
       nameParty: [''],
      adresseParty: ['']
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
    }

}
