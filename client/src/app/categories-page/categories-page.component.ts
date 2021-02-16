import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  //ст в loading = false
  // ст в categories: Category[] = []
  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    //ст в this.loading = true
    //this.categoriesService.fetch()
    //ст в .subscribe(categories => {
    //ст в this.loading = false
    //this.categories = categories
    //console.log('Categories', categories)

    // new version
    this.categories$ = this.categoriesService.fetch()
  }
}


