import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _loaderservice:LoaderService) { }

  // intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
  
  //   const authToken = `Bearer token`
  //   this._loaderservice.loaderstatus$.next(true)
  //   const authRequest = req.clone({
  //     setHeaders:{Authorization:authToken}
  //   })
  //   return next.handle(authRequest).pipe(finalize(()=>this._loaderservice.loaderstatus$.next(false)))
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = `Berer token `  
    this._loaderservice.loaderstatus$.next(true) 
    const authRequest = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    })
  
  
    return next.handle(authRequest)
      .pipe(
        delay(500),
        finalize(() => this._loaderservice.loaderstatus$.next(false))
      )
}

}