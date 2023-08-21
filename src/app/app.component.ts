import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrudService } from './shared/service/crud.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AdduserformComponent } from './shared/component/adduserform/adduserform.component';
import { Iuser } from './shared/model/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from './shared/component/delete/delete.component';
import { LoaderService } from './shared/service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{


  constructor( private _matdialog: MatDialog, private _crudservice:CrudService, private _loaderservice:LoaderService){}

  // displayedColumns: string[] = [ 'Action','CompanyName', 'Code', 'name', 'Address','country', 'state', 'city', 'mobile','email','GSTNo','PANNo'];
  // dataSource! :  MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  usersArr: Array<Iuser> = [];
  searchbyname!:string
  loadingstatus!:boolean
  ngOnInit(): void {
     this.getallusers()
     this._loaderservice.loaderstatus$.subscribe((res)=>{
      this.loadingstatus = res
     })
  }

  getallusers(){
    this._crudservice.getalluserData().subscribe((res) => {
      this.usersArr=res
      console.log(res);
    });
  }

  onaddUser() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '100%';
    matDialogConfig.disableClose = true;
    this._matdialog.open(AdduserformComponent, matDialogConfig).afterClosed()
    .subscribe(res => {
      console.log(res);  
      if(res){
        setTimeout(() => {
          this._crudservice.getalluserData()
          .subscribe((res) => {
            this.usersArr=res
            console.log(res);
          });
        }, 500);
      }
    })
  }

  onEdituser(id:string){

    this._crudservice.getSingleUser(id)
  .subscribe(res => {
  console.log(res);
  
  const matDialogConfig = new MatDialogConfig();
  matDialogConfig.width = '100%';
  matDialogConfig.disableClose = true;
  matDialogConfig.data = res;
  
  this._matdialog.open(AdduserformComponent, matDialogConfig).afterClosed()
  .subscribe(res => {
    if(res){
      setTimeout(() => {
        this._crudservice.getalluserData()
        .subscribe((res) => {
          this.usersArr=res
          console.log(res);
        });
      }, 500);
    }
  })
  })
  
  
  }

  onDeleteUser(id:string){
    // let confirmation = confirm('Are You Sure You Want to Delete')
    // console.log(id);
    this._matdialog.open(DeleteComponent).afterClosed().subscribe((res)=>{
      // console.log(res);
      if(res){
        this._crudservice.deleteuser(id).subscribe((res)=>{
         console.log((res));
         this.getallusers()
        })
       }
    })
   
  
  }
  
}
