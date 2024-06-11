import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { GraphsComponent } from './components/graphs/graphs.component';

const routes: Routes = [
  { path: 'Graficos', component: GraphsComponent},
  { path: 'Formulario', component: FormComponent},
  { path: '', redirectTo: '/Formulario', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
