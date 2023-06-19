import { Component, OnInit } from '@angular/core';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-rotom-gpt',
  templateUrl: './rotom-gpt.component.html',
  styleUrls: ['./rotom-gpt.component.scss']
})
export class RotomGPTComponent implements OnInit {

  request: string = "";
  gptResponse: string = "";
  form: FormGroup;


  constructor(private pokedexApiService: PokedexApiService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      request: [null],
      response: [null]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {

    this.pokedexApiService.getApiResponseRotomGPT(this.form.value.request).subscribe((responseData) => {
      this.gptResponse = responseData.response;
      this.form.controls['response'].setValue(this.gptResponse);
    });
  }

}
