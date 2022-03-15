import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesPageModule
          ),
      },
      {
        path: 'headlines',
        loadChildren: () =>
          import('./headlines/headlines.module').then(
            (m) => m.HeadlinesPageModule
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/categories',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}