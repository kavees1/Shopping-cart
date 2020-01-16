import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
 static test_vairabe_in_parent:string;
 vairabe_in_parent:string;
 username;
  constructor() { 


  }

  ngOnInit() {
    console.log("THe value is  " + this.username); 
    this.vairabe_in_parent = "POPULATING VARUABLE IN PARENT TS CLASS";
    ParentComponent.test_vairabe_in_parent = this.vairabe_in_parent;
    console.log("FROM PARENT CLASS" + ParentComponent.test_vairabe_in_parent );
  }
  input_submit(){
    alert("the user name is " + this.username.length);
    if(Number(this.username)){
      alert("This is a number");
    }
    ParentComponent.test_vairabe_in_parent = this.username;
  }

  

}
