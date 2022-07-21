import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ActionSheetController, IonButtons } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() num: number;
  hideImage = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  openArticle() {
    Browser.open({ url: this.article.url });
  }

  async openMenu() {
    const buttons = [
      {
        text: 'Favori',
        icon: 'heart-outline',
        handler: () => this.onToggleFavorite(),
      },
      {
        text: 'Annuler',
        icon: 'close-outline',
        role: 'cancel',
        cssClass: 'danger',
      },
    ];

    if (this.platform.is('capacitor')) {
      buttons.unshift({
        //Pour placer l'élément au début de la liste et pas à la fin(cf push)
        text: 'Partager',
        icon: 'share-outline',
        handler: () => this.onShareArticle(),
      });
    }

    const actionSheet = await this.actionSheetController.create({
      // eslint-disable-next-line @typescript-eslint/quotes
      header: "Options de l'article",
      cssClass: 'action-sheet-primary',
      buttons,
    });
    await actionSheet.present();
  }

  async onToggleFavorite() {
    const test = await this.storageService.isInFavoriteStorage(this.article);
    this.storageService.setFavorite(this.article);
  }

  async onShareArticle() {
    await Share.share({
      title: this.article.title,
      text: this.article.description,
      url: this.article.url,
      dialogTitle: 'Partagé avec vos amis',
    });
  }
}
