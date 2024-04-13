import { Injectable } from '@angular/core';
import { Apiurl } from './ApiRoutepath';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http:HttpClient) { }

  get(): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.http.get(Apiurl.routePath).subscribe((response:any)=>{
        resolve(response);
      },(err: any)=>{
        reject(err);
      })
    })
  }

  post(url: string, params: any): Promise<any> {
    return new Promise(async (resolve, reject) =>
        this.http.post(Apiurl.routePath + url, params).subscribe((response: any) => {
            resolve(response);
        },
            (error: any) => {
                console.log('error: ', error);
                reject(error);
            })
    );
}

// getDataById(id: number): Promise<any> {

//   const login_token = localStorage.getItem('token_key');

//   if (login_token !== null) {
//       var header = new HttpHeaders().set("Authorization", `Bearer ${login_token}`);
//   }


//   return new Promise(async (resolve, reject) =>
//         this.http.get(`http://localhost:33333/api/shopping/add/product/${id}`, { headers: header }).subscribe((response) => {
//             resolve(response);
//         },
//             (error) => {
//                 console.log('error: ', error);
//                 reject(error);
//             })
//     );
// }
delete(url: string): Promise<any> {
  return new Promise(async (resolve, reject) =>
      this.http.delete(Apiurl.routePath + url).subscribe((data: any) => {
          resolve(data);
      }, (error: any) => {
          reject(error);
      })
  );
}

put(url: string, params: any): Promise<any> {
  return new Promise(async (resolve, reject) =>
      this.http.put(Apiurl.routePath + url, params).subscribe((data: any) => {
          resolve(data);
      },
          (error: any) => {
              reject(error);
          })
  );
}
}
