import { AppProduct } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {

  formTitle: string;
  btnTitle: string;
  productId: string;
  product: AppProduct = {
    id: '',
    name: '',
    brand: '',
    price: 0,
    description: ''
  };
  brands: Brand[];

  imageUrl;
  imgSrc: string = '/assets/images/placeholder.png';
  selectedImg: any = null;
  isUpload = false;
  uploadPercent: Observable<number>;
  downloadURL;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.productService.getBrands().subscribe(list => this.brands = list);
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId && this.productId != 'new') {
      this.productService.getProductById(this.productId).subscribe(p => {
        console.log(p);
        this.product = p;
        this.formTitle = `Edit ${p.name.toUpperCase()}.`;
        this.btnTitle = `Update`;
      })
    } else {
      this.formTitle = 'Create new product.'
      this.btnTitle = 'Create'
    }
  }


  deleteProduct() {
    if (this.productId && this.productId != 'new') {
      this.productService.deleteProduct(this.productId);
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '/assets/images/placeholder.png';
      this.selectedImg = null;
    }
  }

  save(form: any) {
    const id = this.db.createId();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const imgPath = `products/${date}-${id}-${form.name}`;
    const imgRef = this.storage.ref(imgPath);

    const task = this.storage.upload(imgPath, this.selectedImg);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        imgRef.getDownloadURL().subscribe(result => {
          this.imageUrl = result;
          const data = {
            name: form.name,
            price: form.price,
            description: form.description,
            brand: form.brand,
            imageUrl: result
          }
          if (this.productId && this.productId != 'new') {
            this.productService.updateProduct(this.productId, data);
          } else {
            // console.log(data)
            this.productService.createProduct(data);
          }
        })
      })
    ).subscribe();
  }
}
