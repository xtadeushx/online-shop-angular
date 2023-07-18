import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    year: new FormControl(''),
    chip: new FormControl(''),
    ssd: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ProductsService: ProductsService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  handelForm() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/images/macbook.jpeg",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    };

    this.dialogRef.close(this.data);
  }
}
