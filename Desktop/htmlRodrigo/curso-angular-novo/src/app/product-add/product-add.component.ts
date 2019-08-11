import { Product } from './../product';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  nome: string = '';
  descricao: string = '';
  quantidade: number = null;
  isLoadingResults = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'nome': [null, Validators.required],
      'descricao': [null, Validators.required],
      'quantidade': [null, Validators.required],
    });
  }

  async onFormSubmit(form: Product) {
    await this.apiService.createProduct(form)
      .subscribe(successCode => {
        this.router.navigate(['/products']);
      }
      );
  }

}