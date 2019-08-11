import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
declare var $ : any;

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    isLoadingResults = true;

    constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

    async ngOnInit() {
        await this.getProductDetails(this.route.snapshot.params['id']);
    }

    async getProductDetails(id) {
        this.product = await this.apiService.getProductById(id).then(prod => prod);
        this.isLoadingResults = false;
    }

    async deleteProduct(id) {
        await this.apiService.removeProduct(id)
            .subscribe(successCode => {
                $('#myModal').modal('hide');
                this.router.navigate(['/products']);
            }
            );
    }

}