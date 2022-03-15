import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.page.html',
  styleUrls: ['./headlines.page.scss'],
})
export class HeadlinesPage implements OnInit {
  articles: Article[] = [];
  page = 1;
  totalResults: number;
  endOfInfiniteScroll = false;


  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getSomeArticles();
  }

  getSomeArticles() {
    this.newsService.getTopHeadLines(this.page).subscribe((res) => {
      this.articles.push(...res.articles);
      this.totalResults = res.totalResults;
      this.page++;
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.getSomeArticles();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.articles.length === this.totalResults) {
        event.target.disabled = true;
        this.endOfInfiniteScroll = true;
      }
    }, 500);
  }
}
