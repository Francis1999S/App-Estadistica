import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements OnInit {

  canvas: any;
  ctx: any;

  Masa_Registros: any[] = [];
  Edad_Registros: any[] = [];

  ///////Filtros Intervalos///////

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    var data_1: number = 0;
    var data_2: number = 0;
    var data_3: number = 0;
    var data_4: number = 0;
    var data_5: number = 0;

    this.dataService.Get_Masa_Edad_Data().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.Masa_Registros.push(parseInt(data[i].masa));
        this.Edad_Registros.push(parseInt(data[i].edad));

        if (data[i].masa > 40 && data[i].masa <= 60) {
          data_1 += 1;
        }
        if (data[i].masa > 60 && data[i].masa <= 80) {
          data_2 += 1;
        }
        if (data[i].masa > 80 && data[i].masa <= 100) {
          data_3 += 1;
        }
        if (data[i].masa > 100 && data[i].masa <= 120) {
          data_4 += 1;
        }
        if (data[i].masa > 120 && data[i].masa <= 140) {
          data_5 += 1;
        }
      }
      this.Iniciar_Grafico(data_1, data_2, data_3, data_4, data_5);
    })
  }

  @ViewChild('mychart') mychart: any;

  Iniciar_Grafico(data_1:number, data_2:number, data_3:number, data_4: number, data_5: number): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['40-60 Kg', '60-80 Kg', '80-100 Kg', '100-120 Kg', '120-140 Kg'],
        datasets: [{
          label: 'Cantidad de Registros de Masa',
          data: [data_1, data_2, data_3, data_4, data_5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
        }]
      },
      options: {


        scales: {

        }
      }
    })
  }
}

