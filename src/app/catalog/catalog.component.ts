import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute } from '@angular/router';
import { Global } from '../global';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
 static test:string = "hello";
  list;
  empList: Array<any> = [];
data;
  constructor(private http: HttpClient,private router: Router,private ActivatedRoute : ActivatedRoute) { }

  ngOnInit() {

  //alert(Global.catalog_array.size);

    let url = Global.globalVar+"/Catalog?cors";
  
    
this.http.get(url).subscribe(data => {
  let resp = JSON.parse(JSON.stringify(data));
  console.log("THE LENGTH IS " +resp.length);
  for (let i = 0; i < resp.length; i++) {
    let e = resp[i];
    this.empList.push(resp[i]);
  }
});
if(Global.catalog_array.has("1")){
  console.log("CACHED");
}
else{
  console.log("SERVER");
  //Global.catagory_array.set()
}
Global.catalog_array.set("1",this.empList);
console.log("After the get request "+Global.catalog_array.size);

 
}



catagory_update(data){
  //Global.catagory_array.set(data.id,"ts");
  this.router.navigateByUrl('/category?id='+data.id);
  alert("clicked" + data.id);
}


 

}