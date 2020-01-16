import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import {Global} from '../global'
import { Router } from '@angular/router';
import { ShiptoComponent} from '../shipto/shipto.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  item;
  empList: Array<any> = [];
  id;
  qty;
  price;
  extended_price;
  sum_extended_price = 0;
  addr1;
  
  name: string;
 
  addr2: string;
  city: string;
  state: string;
  zip: string;
  delivery: string;
  boolean_test = false;

  constructor(private url: ActivatedRoute, private http: HttpClient, private _location: Location,private router: Router) {
   
  }

 
  ngOnInit() {
 
    this.name = localStorage.getItem("name");
      this.addr1 = localStorage.getItem("addr1");
      this.addr2 = localStorage.getItem("addr2");
      this.city = localStorage.getItem("city");
      this.state = localStorage.getItem("state");
      this.zip = localStorage.getItem("zip");
      this.delivery = localStorage.getItem("delivery");
      

    //  let url = "http://red.cse.yorku.ca:41955/cart?cors";

    let url =  Global.globalVar+"/cart?cors";
     this.http.get(url ,{withCredentials: true} ).subscribe(data => {
     //  alert(data);
 
      let resp = JSON.parse(JSON.stringify(data));
     
      for (let i = 0; i < resp.length; i++) {
        let e = JSON.parse(resp[i]);
   
        this.extended_price = (parseFloat(e.price) * parseInt(e.qty));
  
       // e.id = this.extended_price.toFixed(2);
       
        this.sum_extended_price = this.sum_extended_price +  (parseFloat(e.price) * parseInt(e.qty));
        var test = this.sum_extended_price.toFixed(2);
        this.sum_extended_price = parseFloat(test);
       console.log("THE TEST FROM THE CHECKOUT FUNCTION IS " + test);
        // this.sum_extended_price.toFixed(2);
       // this.empList.push(JSON.parse(resp[i]));
       var eachProduct =
       {
          "name":e.name,
         "id": e.id,
         "qty": e.qty, 
         "price": e.price,
         "extented_price":this.extended_price.toFixed(2)
       };
       this.empList.push(eachProduct);
      }
    });
   
  
  
      
    }
  
    backClicked() {
      
      this._location.back();
    }
    continue_shopping(){
      this.router.navigateByUrl('/catalog');
    }

    checkout(){
      alert("checkout is clicked");

      //open('http://localhost:34443/checkout', '_self').close();
      this.boolean_test = true;
     
      //var win = window.open("http://localhost:34443/checkout", "_self" , '');
      var win = window.open("http://localhost:0/checkout", "_self" , '');
      alert("After opened is called");
      win.close();
    
      //window.location.href = 'https://www.google.ca/';
     // window.close();
        
    }

}