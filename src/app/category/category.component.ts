import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {Global} from '../global';
import {Location} from '@angular/common';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  id;
  empList: Array<any> = [];

  constructor(private url: ActivatedRoute,private http: HttpClient,private _location: Location) 
  { 
	this.url.queryParams.subscribe(params =>
	{
		this.id = params['id'];
	
	});
		
  }
  backClicked(){

    this._location.back();
  }
  ngOnInit() {
    
    console.log("The ID FORM THE CATEGORY IS"  + this.id);
    let url = Global.globalVar+"/list?cors";
 // let url =  GLOBALS.globalVar+"/list?cors"
    url += "&id="+this.id;
   
 

    if(Global.catagory_array.has(this.id)){
      console.log("CACHED_CATEGORY" + Global.catagory_array.get(this.id));
      this.empList = Global.catagory_array.get(this.id);
    }
    else{
      console.log("SERVER");
      console.log("THE URL IS" + url);
      this.http.get(url).subscribe(data => {
        let resp = JSON.parse(JSON.stringify(data));
        console.log("THE LENGTH IS " +resp.length);
        for (let i = 0; i < resp.length; i++) {
          let e = resp[i];
          this.empList.push(resp[i]);
        }
      });
      Global.catagory_array.set(this.id,this.empList);
    }
  }

}