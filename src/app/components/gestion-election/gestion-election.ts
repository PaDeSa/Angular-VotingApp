import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IPagination } from '../../utils/page.data.mode';
import { GlobalConstant } from '../../constants/global.constant';
import { ISearchRequestForm } from '../../services/model/search.model';
import { Election } from '../../services/services';
import { Table } from '../../shared/table/table';

@Component({
  selector: 'app-gestion-election',
  imports: [Table],
  templateUrl: './gestion-election.html',
  styleUrl: './gestion-election.css'
})
export class GestionElection implements OnInit {

  private electionService = inject(Election);
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
       { action: this.actionButton.validate, permissions:['*'] },
       { action: this.actionButton.cancel, permissions: ['*'] },
       { action: this.actionButton.to_modify, permissions: ['*'] },
       { action: this.actionButton.remove_role, permissions: ['*'] },
       { action: this.actionButton.view, permissions: ['*'] },
   ];
  }


  ngOnInit(): void {
    this.onInitColumns()
    this.loadElections(this.page,this.pageSize);
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
    console.log("action activate")
  
    if (event.name === this.actionButton.to_modify) {
        //console.log("for activate username "+username)
        //this.userService.activateUser(username)
    }

    if(event.name === this.actionButton.cancel){
     // console.log("for deactivate username "+username)
      //this.userService.deactivateUser(username)
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



}
