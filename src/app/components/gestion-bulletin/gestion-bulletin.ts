import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { GlobalConstant } from '../../constants/global.constant';
import { ISearchRequestForm } from '../../services/model/search.model';
import { Election } from '../../services/services';
import { Table } from '../../shared/table/table';
import { IPagination } from '../../utils/page.data.mode';
import { SaveBulletin } from '../save-bulletin/save-bulletin';

@Component({
  selector: 'app-gestion-bulletin',
  imports: [Table,MatDialogModule],
  templateUrl: './gestion-bulletin.html',
  styleUrl: './gestion-bulletin.css'
})
export class GestionBulletin implements OnInit{

  private bulletinService = inject(Election)

   bulletinData:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 columns: any[] = [];
 actions: any[] = [];
 data: any[] = [];
 pageData: IPagination = { page: 0, size: 5, length: 0 };
 pageSizeOptions = [5, 15, 30, 50];
 searchParams!: ISearchRequestForm;

 actionButton = GlobalConstant.actionButton;
 title = '';
 currentListRoute = '';
 routeTitle = '';
 pages:any = [];
 page = 0;
 pageSize = 10;
 dialog = inject(MatDialog);
 dialogRef!: MatDialogRef<SaveBulletin>;


 constructor(private cdr:ChangeDetectorRef){
    this.actions = [
      // { action: this.actionButton.view, permissions: ['*'] },
       //{ action: this.actionButton.validate, permissions:['*'] },
       //{ action: this.actionButton.cancel, permissions: ['*'] },
       { action: this.actionButton.to_modify, permissions: ['*'] },
       //{ action: this.actionButton.remove_role, permissions: ['*'] },
       { action: this.actionButton.view, permissions: ['*'] },
   ];
  }

   onInitColumns(): void {
    this.columns = [
        { columnDef: 'id', header: 'Id' },
        { columnDef: 'name', header: 'Nom' },
        { columnDef: 'email', header: 'Email' },
        { columnDef: 'election', header: 'Election' }
    ];
  }

  ngOnInit(): void {
    this.onInitColumns()
    this.loadBulletins();
   
  }


  loadBulletins(){
    this.bulletinService.getBulletins().subscribe({
      next: (response:any) => {
        this.bulletinData = response?.data;
        this.loadChangeBulletins(this.bulletinData);
        console.log(this.bulletinData);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching bulletins:', err);
      }
    });
  }

  openAddBulletinModal(){
   const dialogRef =  this.dialog.open(SaveBulletin,{
      width: '1000px',
      height: '500px',
      data: {}
     });
      dialogRef.afterClosed().subscribe(result => {
        this.loadBulletins();
      });
  }


  loadChangeBulletins(data:any){
    for(let i=0;i<data.length;i++){
      data[i].election = data[i].election?.name;
      data[i].name = data[i].candidat?.firstName + ' ' + data[i].candidat?.lastName;
      data[i].email = data[i].candidat?.email;
    }
  }

   onPageChange(event: IPagination): void {
    this.pageData = { ...this.pageData, page: event.page, size: event.size };
    //this.userService.getUsers(event.page, event.size)
    console.log("---------user manag page change-----------");
    console.log(this.pageData);
    
  }
  
  onApplyFilter(event: any): void {
    this.searchParams = { ...this.searchParams, searchText: event };
    //this.userService.getUsers(this.pageData.page, this.pageData.size)
  }

  onTableAction(event: any): void {
   
    if (event.actionName === this.actionButton.to_modify) {
     
    }

    if(event.actionName === this.actionButton.cancel){
    
    }

     if(event.actionName === this.actionButton.validate){
    
    }
    if(event.actionName === this.actionButton.view){
      console.log("view election  !!!")
    }

        
    }

}
