import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.modal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup
  allRestaurantData: any;
  showAdd!:boolean;
  showBtn!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) {}
  restaurantModelObject:RestaurantData=new RestaurantData;

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
    });
    this.getAllData();
  }

  //Now subscribing our data mapped by services
  addRestaurant(){
    this.restaurantModelObject.name=this.formValue.value.name
    this.restaurantModelObject.email=this.formValue.value.email
    this.restaurantModelObject.mobile=this.formValue.value.mobile
    this.restaurantModelObject.address=this.formValue.value.address
    this.restaurantModelObject.service=this.formValue.value.service

    this.api.postRestaurant(this.restaurantModelObject).subscribe(res=>{
      console.log(res);
    //  this.formValue.reset();
    alert("Restaurant Record Added successfully||");
    let ref=document.getElementById('clear');
    ref?.click();
    this.formValue.reset()
    this.getAllData();
    },
    error=>{
      alert("something is wrong!!")
    }
    )
  }
  clickAddRest(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res;
    })
  }
  deleteRest(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Record deleted successfully!!");
      this.getAllData();
    })
  }

  onEditRest(data:any){
    this.showAdd=false;
    this.showBtn=true;

    this.restaurantModelObject.id=data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }

  updateRest(){
    this.restaurantModelObject.name=this.formValue.value.name;
    this.restaurantModelObject.email=this.formValue.value.email;
    this.restaurantModelObject.mobile=this.formValue.value.mobile;
    this.restaurantModelObject.address=this.formValue.value.address;
    this.restaurantModelObject.service=this.formValue.value.service;

    this.api.updateRestaurant(this.restaurantModelObject,this.restaurantModelObject.id).subscribe(res=>{
      alert("Restaurant Record Updated");

    let ref=document.getElementById('clear');
    ref?.click();
    this.formValue.reset();
    this.getAllData();
  })
  }




}
