import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './pages/main-layout/main-layout.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {ReverseCalcComponent} from './pages/reverse-calc/reverse-calc.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'reverse-calc', component: ReverseCalcComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
