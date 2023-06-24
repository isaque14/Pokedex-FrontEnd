import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup;
  public error: boolean = false;
  public success: boolean = false;

  constructor(private pokedexApiService: PokedexApiService, private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      user: [null],
      password: [null],
      repeat: [null]
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeat: ['', Validators.required]
    })
  }

  onSubmit() {

    this.pokedexApiService.postApiCreateUser(this.form.value.user, this.form.value.password).subscribe(
      data => {
        this.success = true;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }
}
