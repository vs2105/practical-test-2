import { Pipe, PipeTransform } from '@angular/core';
import { Iuser } from '../model/user.interface';

@Pipe({
  name: 'filterbyname'
})
export class FilterbynamePipe implements PipeTransform {

  transform(value: Iuser[],searchtext:string): Iuser[] {
    if(!value){
      return []
    }
    if(!searchtext){
      return value
    }
    let filterarr= value.filter((obj)=>{
     return obj.name.toLowerCase().startsWith(searchtext)
    })
    return filterarr
}
}