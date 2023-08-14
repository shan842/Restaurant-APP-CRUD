import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup!:FormGroup
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signup=this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      password:['']
    })
  }
  signUP(){
    this.http.post("http://localhost:3000/signup",this.signup.value).subscribe(res=>{
      console.log(res);
      alert("Registration Successfull !!");
      this.signup.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("something is Wrong!!")
    }
    )

  }

}
