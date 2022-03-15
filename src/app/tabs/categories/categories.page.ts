/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

enum Category {
  BUSINESS = 'business',
  ENTERTAINMENT = 'divertissement',
  GENERAL = 'général',
  HEALTH = 'santé',
  SCIENCE = 'science',
  SPORTS = 'sports',
  TECHNOLOGY = 'technologie',
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [
    Category.BUSINESS,
    Category.ENTERTAINMENT,
    Category.GENERAL,
    Category.HEALTH,
    Category.SCIENCE,
    Category.SPORTS,
    Category.TECHNOLOGY,
  ];
  selected: string = this.categories[0];
  articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  private getCategoryValue(value: string) {
    const category = Object.keys(Category).find(
      (key) => Category[key] === value
    );
    return category.toLowerCase();
  }

  ngOnInit() {
    const selected = this.getCategoryValue(this.selected);
    this.newsService
      .getTopHeadLinesByCategory(selected)
      .subscribe((articles) => (this.articles = articles));
  }

  segmentChanged(e: any) {
    const selected = this.getCategoryValue(e.detail.value);
    this.newsService
      .getTopHeadLinesByCategory(selected)
      .subscribe((articles) => {
        this.articles = articles;
      });
  }
}
