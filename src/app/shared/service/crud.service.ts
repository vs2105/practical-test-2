import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iuser } from '../model/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private _httpclient:HttpClient, private _snackbar:MatSnackBar,private _dialog:MatDialog) { }

  senduserdata(data:any):Observable<any>{
    let url:string=`${environment.firebasedb}data.json`
   return  this._httpclient.post(url,data)
  }

  getalluserData():Observable<Iuser[]>{
   let url:string=`${environment.firebasedb}data.json`
   return this._httpclient.get<Iuser[]>(url).pipe(
     map((res) => {
       let arr = [];
       for (let key in res) {
         let obj: Iuser = {
           Address: res[key].Address,
           Code: res[key].Code,
           CompanyName: res[key].CompanyName,
           CompanymobileNo: res[key].CompanymobileNo,
           GSTNo: res[key].GSTNo,
           PANNo: res[key].PANNo,
           city: res[key].city,
           companyemail: res[key].companyemail,
           country: res[key].country,
           currency: res[key].currency,
           dept: res[key].dept,
           desgination: res[key].desgination,
           email: res[key].email,
           lattitude: res[key].lattitude,
           longitude: res[key].longitude,
           mobile: res[key].mobile,
           name: res[key].name,
           pincode: res[key].pincode,
           state: res[key].state,
           id: key,
         };
         arr.unshift(obj)
       }
       return arr
     })
   )
  }

  getSingleUser(id:string):Observable<Iuser>{
   return this._httpclient.get<Iuser>(environment.firebasedb+'data/'+id+'.json')
  }

  deleteuser(id:string){
   let deleteurl:string=`${environment.firebasedb}data/${id}/.json`
   return this._httpclient.delete(deleteurl)
  }

  
  updateUser(id:string, obj: Iuser):Observable<Iuser>{
   return this._httpclient.patch<Iuser>(environment.firebasedb+'data/'+id+'.json', obj)
  }

  openSnackBar(msg:string,action:string){
    this._snackbar.open(msg,action,{
      duration:5000,
      horizontalPosition:'start',
      verticalPosition:'top'
    })
  }

  openConfirmdialog(){
    this._dialog.open(AppComponent,{
      width:'400px',
      disableClose:true
    })
  }

}
