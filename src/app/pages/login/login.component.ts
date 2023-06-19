import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  token: string = "";
  form: FormGroup;

  constructor(private pokedexApiService: PokedexApiService, private formBuilder: FormBuilder, private router: Router){
    this.form = formBuilder.group({
      user: [null],
      password: [null]
    });
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        user: ['', [Validators.required, Validators.email]], 
        password: ['', [Validators.required]]  
      })
  }

  onSubmit(){
    this.pokedexApiService.postApiLoginUser(this.form.value.user, this.form.value.password).subscribe(
      token =>
      {
        var newToken = token
        console.log("Token: Bearer " + token.token)
      },
      erro => {

      }
    );
    
    
    
    
    //.subscribe((responseData) => {
      // this.token = responseData.token;
      // console.log("Logado, Token: " + responseData.token);
    // })
  }
}
