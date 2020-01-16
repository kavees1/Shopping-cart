import { Component, OnInit ,Input } from '@angular/core';
import {ParentComponent} from '../parent/parent.component';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() fromParent: string;
  data;
constructor() {

}

  parentfrom;
  ngOnChanges() {
           
         console.log("On te onchange" + this.fromParent);         
    
  }
  ngOnInit() {
    this.parentfrom = ParentComponent.test_vairabe_in_parent;
    console.log("the from parent value is " + this.parentfrom);
    console.log("Dec 6" + this.fromParent);
  }

}
