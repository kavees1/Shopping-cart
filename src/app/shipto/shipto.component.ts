
  
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import {CatalogComponent} from'../catalog/catalog.component';
@Component({
  selector: 'app-shipto',
  templateUrl: './shipto.component.html',
  styleUrls: ['./shipto.component.css']
})
export class ShiptoComponent implements OnInit {


  name: string;
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  zip: string;
  delivery: string;
x:string;
username: string;
static show:boolean;
 ca = new RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i);
 postalCode;
  constructor(private location: Location) { }

  ngOnInit() {
    ShiptoComponent.show = false;
    alert("from static catalog" + CatalogComponent.test );
    //alert("Locall stored is " + localStorage.getItem("name"));
  }

  onSubmit()
  {
     //this.sum = parseInt(this.x) + parseInt(this.y);
    
     ShiptoComponent.show = true;
      localStorage.setItem("name", this.name);
      localStorage.setItem("addr1", this.addr1);
      localStorage.setItem("addr2", this.addr2);
      localStorage.setItem("city",this.city);
      localStorage.setItem("state",this.state);
      localStorage.setItem("zip",this.zip);
      localStorage.setItem("delivery",this.delivery);
      this.location.back();
     
    
     
  
     
   //  alert("SUBMIT CLICKED" + this.name);

  }

}

