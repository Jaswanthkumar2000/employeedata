import { HttpClientModule } from '@angular/common/http';
import { ReadPropExpr } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeedashboardComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
