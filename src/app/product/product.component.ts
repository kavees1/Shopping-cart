
  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {Location} from '@angular/common';
import {Global} from '../global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id;
  empList: Array<any> = [];

  constructor(private url: ActivatedRoute,private http: HttpClient,private _location: Location,private router: Router) 
  { 
	this.url.queryParams.subscribe(params =>
	{
		this.id = params['id'];
	
	});
		
  }

  ngOnInit() {
    
    console.log("The ID FORM THE CATEGORY IS"  + this.id);
   // let url = "http://red.cse.yorku.ca:41955/Product?cors";
   let url =  Global.globalVar+"/Product?cors";
    url += "&id="+this.id;
    console.log("THE URL IS" + url);
    this.http.get(url).subscribe(data => {
      let resp = JSON.parse(JSON.stringify(data));
      console.log("THE LENGTH IS " +resp.length);
      for (let i = 0; i < resp.length; i++) {
        let e = resp[i];
        this.empList.push(resp[i]);
      }
    });
  }

  backClicked(){

    this._location.back();
  }
  clicked(){
  //alert("clicked");
    var eachProduct =
    {
  
      "id": this.empList[0].id,
      "qty": 0,
      "price": this.empList[0].cost
    };
   
    let url = Global.globalVar+"/cart?cors";
    url += "&repeat=" + JSON.stringify(eachProduct);
    //alert("The url is " + url);
    this.http.get(url,{withCredentials: true}).subscribe(data => {
    //  alert("Inside  the GET request" + data);
      console.log("the product page data is " + data);
      this.router.navigateByUrl('/cart');
    });
    
    //alert("CLICKED" + this.empList[0].id);
  }

}

