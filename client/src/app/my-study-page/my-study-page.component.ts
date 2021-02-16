import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-my-study-page',
  templateUrl: './my-study-page.component.html',
  styleUrls: ['./my-study-page.component.css']
})
export class MyStudyPageComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }


}
