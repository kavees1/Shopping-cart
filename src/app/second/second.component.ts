import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
      num;
  constructor(private http: HttpClient,private url: ActivatedRoute) {
    this.url.queryParams.subscribe(params =>
      {
        this.num = params['num'];
      
      });
   }
  url_get;
  ngOnInit() {
   this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => 
      {
        this.url_get = JSON.stringify(data);
      }); 
    /*   let url =  "http://localhost:44918/RT?cors&num="+this.num;
      this.http.get(url,{withCredentials: true, responseType: 'text'}).subscribe(data => 
      {
        console.log("THe data is " + data);
       this.url_get = data;
      }); */
  }

}
