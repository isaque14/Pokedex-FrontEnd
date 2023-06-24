import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: string = "";
  form: FormGroup;
  public error: boolean = false;
  public success: boolean = false;

  constructor(private pokedexApiService: PokedexApiService, private formBuilder: FormBuilder, private router: Router) {
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

  onSubmit() {
    this.pokedexApiService.postApiLoginUser(this.form.value.user, this.form.value.password).subscribe(
      data => {
        this.token = data.token
        localStorage.setItem("token", data.token);
        this.success = true;
        this.router.navigate(['researcher']);
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }
}
