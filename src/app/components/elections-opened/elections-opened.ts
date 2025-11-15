import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { GlobalConstant } from '../../constants/global.constant';
import { ISearchRequestForm } from '../../services/model/search.model';
import { Election } from '../../services/services';
import { Table } from '../../shared/table/table';
import { IPagination } from '../../utils/page.data.mode';

@Component({
  selector: 'app-elections-opened',
  imports: [Table],
  templateUrl: './elections-opened.html',
  styleUrl: './elections-opened.css'
})
export class ElectionsOpened  implements OnInit {

    private electionService = inject(Election)
    electionData:any;

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
        { columnDef: 'description', header: 'Description' },
        { columnDef: 'dateStart', header: 'Date ouverture' },
        { columnDef: 'email', header: 'Email' },
        { columnDef: 'dateEnd', header: 'Date de fin' },
        { columnDef: 'isActive', header: 'Ouvert', isStatut: true },
    ];
  }


  ngOnInit(): void {
    this.onInitColumns()
    this.loadElectionsOpened();
    
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

    loadElectionsOpened(){
      this.electionService.electionOpened()
      .subscribe({
        next:(datas:any)=>{
          this.electionData = datas?.data
            this.cdr.detectChanges();
       },
       error:(error:any)=>{
        console.log("Error")
       }
        })
    }

}
