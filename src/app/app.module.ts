import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StackedChartComponent } from './stacked-chart/stacked-chart.component';
import { MeterComponent } from './meter/meter.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    BarChartComponent,
    StackedChartComponent,
    MeterComponent,
    SidebarComponent,
    NavbarComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
