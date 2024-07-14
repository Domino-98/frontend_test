import { Routes } from '@angular/router';

import { HomeComponent } from "./pages/home/home.component";
import { ManageComponent } from './pages/manage/manage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'manage',
    component: ManageComponent,
  },
];
