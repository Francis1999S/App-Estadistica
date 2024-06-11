import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        
    ],
    providers: [  DataService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HeaderComponent,
        NgChartsModule,
        FormComponent,
        CommonModule
    ]
})
export class AppModule { }
