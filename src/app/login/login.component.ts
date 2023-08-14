import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.login=this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  loginForm(){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      // console.log(res);
      const user=res.find((a:any)=>{
        return a.email===this.login.value.email && a.password===this.login.value.password
      })
      if(user){
      alert("Login Successful !!!")
      this.login.reset();
      this.router.navigate(['restaurant']);
      }else{
        alert("user not found");
      }
    },err=>{
      alert("something is wrong !!");
    }
    )
  }

}
