/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private favoriteStorageKey = environment.storageKey;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setFavorite(article: Article) {
    const storagedArticle: Article[] = await this.storage.get(
      this.favoriteStorageKey
    );
    console.log('🚀 ~ storagedArticle', storagedArticle);

    if (storagedArticle && storagedArticle.includes(article)) {
      console.log('sameArt');

      return;
    }
    if (storagedArticle) {
      await this._storage.set(this.favoriteStorageKey, [
        article,
        ...storagedArticle,
      ]);
    } else {
      await this._storage.set(this.favoriteStorageKey, [article]);
    }
  }

  async getFavorite(): Promise<Article[]> {
    let article = await this._storage.get(this.favoriteStorageKey);
    if (!article) {
      article = [];
    }
    return [...article];
  }

  async removeFavorite(article) {
    const isInFav = await this.isInFavoriteStorage(article);
    if (isInFav) {
      const favorite = await this.getFavorite();
      favorite.splice(favorite.indexOf(article), 1);
      this._storage.set(this.favoriteStorageKey, article);
    }
  }

  async isInFavoriteStorage(article: Article) {
    const favorite = await this.getFavorite();
    const itExiste = favorite.find((art) => art.title === article.title);
    return !!itExiste;
  }
}
