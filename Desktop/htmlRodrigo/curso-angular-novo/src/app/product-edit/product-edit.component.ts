import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'nome': [null, Validators.required],
      'descricao': [null, Validators.required],
      'quantidade': [null, Validators.required]
    });
  }

  async getProduct(id) {
    const product = await this.apiService.getProductById(id).then(prod => {
      this.productForm.controls['id'].setValue(prod.id);
      this.productForm.controls['nome'].setValue(prod.nome);
      this.productForm.controls['descricao'].setValue(prod.descricao);
      this.productForm.controls['quantidade'].setValue(prod.quantidade);
      return prod;
    });
    this.isLoadingResults = false;
  }

  async onFormSubmit(form: NgForm) {
    await this.apiService.updateProduct(form)
      .subscribe(successCode => {
        this.router.navigate(['/products']);
      }
      );
  }

  productDetails() {
    this.router.navigate(['/product-details', this.route.snapshot.params['id']]);
  }

}