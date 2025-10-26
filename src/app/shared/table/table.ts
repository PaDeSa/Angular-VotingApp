import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalConstant } from '../../constants/global.constant';
import { IPagination } from '../../utils/page.data.mode';
import { MatSort } from '@angular/material/sort';
import { TableButtonAction } from '../../utils/table.button.action';
import { TableColumn } from '../../utils/table.column';
import { SelectionModel } from '@angular/cdk/collections';
import { Logger } from '../../services/logger.service';

const LOGGER = new Logger('TableComponent');

@Component({
  selector: 'app-table',
  imports: [ 
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit, AfterViewInit {

  panelOpenState = false;
  activeUser = true;
  actionButton = GlobalConstant.actionButton;

  @Input() pageData: IPagination = {
    page: GlobalConstant.pagination.defaultPage,
    size: GlobalConstant.pagination.defaultSize,
    length: GlobalConstant.pagination.defaultLength
};
@Input() pageSizeOptions = GlobalConstant.pagination.pageSizeOptions;

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatSort, { static: true }) sort!: MatSort;

@Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>();
@Output() pageChangeEvent: EventEmitter<IPagination> = new EventEmitter<IPagination>();
@Output() filterEvent?: EventEmitter<string> = new EventEmitter<string>();

@Input() columns: Array<TableColumn> = [];
actions: Array<any> = [];
@Input() dataset: Array<any> = [];

@Input() set tableData(data: any[]) {
  this.setDataSource(data);
}

@Input() set tableActions(actions: any[]) {
  this.setUserAuthorizeActions(actions);
}

@Input() hasSearchForm = false;
@Input() hasFilterInput = false;
@Input() hasActions = false;
@Input() searchForm!: FormGroup;

dataSource!: MatTableDataSource<any>;

selection = new SelectionModel<any>(true, []);
displayedColumns: string[] = [];



  ngOnInit(): void {
    LOGGER.debug(this.tableData);
    // set checkbox column
    //this.displayedColumns.push('select');
  
    // set table columns
    this.displayedColumns = this.displayedColumns.concat(this.columns.map((x: TableColumn) => x.columnDef)); // pre-fix static
  
    // add action column
    if (this.hasActions && this.actions.length > 0) {
        this.displayedColumns.push('actions');
    }
    
  }



  OnPageChange(event: any): void {
    console.log("------page change----------");
    this.pageData = { ...this.pageData, page: event.pageIndex, size: event.pageSize };
    console.log("-------------pageData------------");
    console.log(this.pageData);
      console.log("-------------event------------");
    console.log(event);
    this.pageChangeEvent.emit(this.pageData);
  }

  onTableAction(e: any, action: any, value: any, roleLabel?:any): void {
    console.log(e);
    console.log(action);
    console.log(value);
  
    this.action.emit({
        name: action,
        value,
        text: roleLabel
    });
  }
  
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  
  setDataSource(data: any): void {
    this.dataSource = new MatTableDataSource<any>(data);
  
    LOGGER.debug(this.dataSource.data);
  }
  
  setPageData(pageData: any): void {
    console.log(pageData);
  }
  
  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  setUserAuthorizeActions(actions: any[]): void {
    if (actions.length > 0) {
        this.actions = actions.filter(action => {
            const result = this.isAllowed(action?.permissions);
            console.log('result', result);
  
            return result;
        });
    }
  }

  
  
  isAllowed(permissions: any): boolean {
    // const authorizedRoles: string[] = permissions.map(
    //     (permission: any) => (permission === '*' ? permission : getKeyName(UserPermissionEnum, permission)) as string
    // );
    // const userRoles = this.crdService.permissions;
  
    // console.log(authorizedRoles);
    // console.log(userRoles);
    // if (authorizedRoles.includes('*')) {
    //     return true;
    // }
    // if (authorizedRoles.includes(userRoles[0])) {
    //     console.log(getKeyName(UserPermissionEnum, userRoles[0]));
  
    //     return true;
    // } else {
    //     return false;
    // }
    return true;
  }

 

}
