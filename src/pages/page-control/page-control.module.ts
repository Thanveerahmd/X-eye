import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageControlPage } from './page-control';

@NgModule({
  declarations: [
    PageControlPage,
  ],
  imports: [
    IonicPageModule.forChild(PageControlPage),
  ],
})
export class PageControlPageModule {}
