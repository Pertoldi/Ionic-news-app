import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  constructor(private storageService: StorageService) {
    this.loadFavorite();
  }

  ngOnInit() {}

  async loadFavorite() {
    return await this.storageService.getFavorite();
  }
}
