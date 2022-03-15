import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { HeadlinesPageRoutingModule } from './headlines-routing.module';

import { HeadlinesPage } from './headlines.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadlinesPageRoutingModule,
    ComponentsModule,
    ScrollingModule
  ],
  declarations: [HeadlinesPage]
})
export class HeadlinesPageModule {}
