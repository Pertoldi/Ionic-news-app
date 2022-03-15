import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

const components = [HeaderComponent, ArticlesComponent]

@NgModule({
  declarations: [...components, ArticleComponent],
  imports: [CommonModule, IonicModule],
  exports: [...components],
})
export class ComponentsModule {}
