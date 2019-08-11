import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';
/// <reference path="../typings/tsd.d.ts" />
'use strict';
declare var require: any
const fetch = require('node-fetch');

@Injectable()
export class ApiService {
  productUrl = "http://localhost:3000/produtos";
  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${this.productUrl}`).pipe(map((res: any) => {
      return this.extractData(res)
    }));
  }

  createProduct(body): Observable<Product> {
    return this.http.post(`${this.productUrl}`, body).pipe(map((res: any) => {
      return body;
    }));
  }

  async getProductById(id): Promise<Product> {
    let product: Promise<Product>;
    product = await fetch(`${this.productUrl}/${id}`)
      .then(response => response.json())
      .then(prod => {
        console.log(prod[0].nome);
        return prod[0];
      });
    return product;
  }

  updateProduct(body): Observable<Product> {
    return this.http.put(`${this.productUrl}`, body).pipe(map((res: any) => {
      return body;
    }));
  }

  removeProduct(id) {
    return this.http.delete(`${this.productUrl}/${id}`);
    }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}