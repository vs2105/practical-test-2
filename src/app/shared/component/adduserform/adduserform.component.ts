import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from '../../service/crud.service';
import { Iuser } from '../../model/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from '../../const/validation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adduserform',
  templateUrl: './adduserform.component.html',
  styleUrls: ['./adduserform.component.scss']
})
export class AdduserformComponent implements OnInit {

  constructor(
    private _crudService:CrudService,
    private _dialogref : MatDialogRef<AdduserformComponent>,
    @Inject(MAT_DIALOG_DATA) public resObj: Iuser
    ) { }

  signupform!:FormGroup

   CountryArr:Array<any>=['India'];
   stateArr:Array<any>=['Gujarat','Goa','Kerala',"Maharashtra"];
   CityArr:Array<any>=['Ahmedabad','Mumbai','Kochi','Panji'];
   currancyArr:Array<any>=['USD','CAD','GBP','AUD','EUR','INR','LKR']


  ngOnInit(): void {
   
     this.allformcontrol()
    // if(localStorage.getItem('persondetails')){
    //   this.detailsArray=JSON.parse(localStorage.getItem('persondetails') as any)
    //   // console.log(localStorage.getItem('persondetails'));  
    // }

    if(this.resObj){
      console.log(this.resObj);
      this.signupform.patchValue(this.resObj)
    }

    
  }


  allformcontrol(){
    this.signupform= new FormGroup({
      GSTNo:new FormControl(null,[Validators.required]),
      PANNo:new FormControl(null,[Validators.required]),
      Code:new FormControl(null,[Validators.required]),
    CompanyName:new FormControl(null,[Validators.required]),
    Address:new FormControl(null),
    pincode:new FormControl(null),
    country:new FormControl(null,[Validators.required]),
    state:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
    CompanymobileNo:new FormControl(null),
    companyemail:new FormControl(null,[Validators.required]),
    lattitude:new FormControl(null),
    longitude:new FormControl(null),
    currency:new FormControl(null),
      name: new FormControl(null,Validators.required),
      mobile: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)]),
      dept: new FormControl(null,[Validators.required]),
      desgination: new FormControl(null,[Validators.required]),    
    })
  }
 

  onsignup(){
    if(this.signupform.valid){
      this._crudService.senduserdata(this.signupform.value)
      .subscribe(res => {
        //   alert(`employee was added sucessfully`)
        // console.log(res);
        this.signupform.reset()
        this._dialogref.close()
      })
      console.log(this.signupform);
    } 
  }

  opensnackbar(msg:string,action:string){
   this._crudService.openSnackBar(msg,action)
  }

  detailsArray:Array<any>=[]

  getPersonlDetails(){
    
    let {name, mobile, email, dept, desgination} = this.signupform.value
    let obj ={
      name: name,
      mobile:mobile,
      email:email,
      dept:dept,
      desgination:desgination
    }
    this.detailsArray.push(obj)
    // localStorage.setItem('persondetails',JSON.stringify(this.detailsArray))
    console.log(this.detailsArray);
    this.getallformcontrol['name'].reset()
    this.getallformcontrol['mobile'].reset()
    this.getallformcontrol['email'].reset()
    this.getallformcontrol['dept'].reset()
    this.getallformcontrol['desgination'].reset()
  }

  get getallformcontrol(){
     return this.signupform.controls
  }

 get getcompanynamecontrol(){
     return this.signupform.get('CompanyName') as FormControl
  }

  ondeleteperson(i:number){
    this.detailsArray.forEach((ele,index)=>{
      console.log(index,i);  
      if(i === index){
        this.detailsArray.splice(i,1)
      }
    })
  }

  onUpdateData(){
    if(this.resObj && this.signupform.valid){
      console.log(this.signupform.value);
      this._crudService.updateUser(this.resObj.id, this.signupform.value)
    .subscribe(res => {
      console.log(res);
      this.signupform.reset()
      this._dialogref.close()
    })
    }
  }

}
