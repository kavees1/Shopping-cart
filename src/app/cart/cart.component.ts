import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {Global} from '../global'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  item;
  new_qty;
  empList: Array<any> = [];
  constructor(private url: ActivatedRoute, private http: HttpClient, private _location: Location,private router: Router) {
    this.url.queryParams.subscribe(params => {
      //this.item = params['item'];
      this.item = params['repeat'];
    });

  }

  ngOnInit() {
    let url = Global.globalVar+"/cart?cors";
    this.http.get(url ,{withCredentials: true} ).subscribe(data => {
        let e = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < e.length; i++) {
            let e1 = JSON.parse(e[i]);
            this.empList.push(e1);
            
            console.log("e1" + e1.name);
        }

    });

  }

  update(data){
   var eachProduct =
    {
  
      "id": data.id,
      "qty":(<HTMLInputElement> document.getElementById(data.id+"Ka")).value,
      "price": data.price
    }; 

   
   // alert("The json is" +  JSON.stringify(eachProduct));
    let url = Global.globalVar+"/cart?cors";
    url += "&item=" + JSON.stringify(eachProduct);
    this.http.get(url,{withCredentials: true}).subscribe(data => {
     // alert(data);
      console.log("the update is " + data);
      location.reload();
    });

    
    //alert("the data is " +JSON.stringify(data.id));
 
  }

  backClicked() {
    
    this._location.back();
  }

  checkout(){
    if(localStorage.getItem("name") != undefined){
      this.router.navigateByUrl('/checkout');
    }
    else{
      this.router.navigateByUrl('/shipto');
    }
    
  }

}
