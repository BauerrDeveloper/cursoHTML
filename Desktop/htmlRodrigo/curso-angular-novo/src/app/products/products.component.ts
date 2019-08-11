import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ApiService } from '../api.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'quantidade'];
  isLoadingResults = true;
  data: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  statusCode: number;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.apiService.getProducts()
      .subscribe(
        data => {
          if (data) {
            this.data = new MatTableDataSource<Product>(data);
          }
          this.isLoadingResults = false;
        },
        errorCode => this.statusCode = errorCode);
  }
}