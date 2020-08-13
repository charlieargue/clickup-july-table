import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// NOTE: this should be in a core module, keeping it simple here
import { NzLayoutModule } from 'ng-zorro-antd/layout';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StateModule,
    BrowserAnimationsModule,
    FormsModule,
    NzLayoutModule,
    

  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class AppModule {}
