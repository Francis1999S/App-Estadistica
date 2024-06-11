import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  Encuesta: any;
  Mensaje_Form: string = "¡Haz tu encuesta ahora!";
  datos: any[] = [];
  Nro_Registros: number = 0;

  Array_Registros: any[] = [];
  Conteo_Registros: any[] = [];

  Suma_Total_Valores: number = 0;
  Suma_Total_Frecuencias: number = 0;

  Xmin: number = 0;
  Xmax: number = 0;

  IntervalosK: number = 0;

  Amplitud_Intervalo: number = 0;

  Array_Frecuencias_Intervalo: any[] = [];
  Array_Intervalos: any[] = [];

  Array_Unido: any[] = [];
  Array_Unido_Intervalos: any[] = [];

  ///////Bandera de Captura de Datos en Array
flag_1: boolean = false;

  constructor(private dataService: DataService, public fb: FormBuilder) {
    this.Encuesta = this.fb.group({
      masa: [''],
     edad: [''],
    });
  }
  ngOnInit(): void {
    var flag: boolean = false;
    var Loader_1 = document.getElementById('Loader_Data');
    var Loader_2 = document.getElementById('Loader_Data_2');
    setInterval(() => {
      this.dataService.Get_Masa_Edad_Data().subscribe(data => {
        this.datos = data;
        this.Nro_Registros = data.length;
        if (this.flag_1 === true) {
          const array: any[] = [];
          for (let i = 0; i < data.length; i++) {
            array.push(parseFloat(data[i].masa));
          }
          const masas: any[] = _.sortBy(array);

          const arrayMasas: any[] = [];
          const arrayTemp: any[] = [];
          for (let i = 0; i < masas.length; i++) {
            arrayTemp.push(parseFloat(masas[i]));
            var masita = masas[i];
            var flag_j = 0;
            console.log("valor: ", masita);
            for (let j = 0; j < arrayTemp.length; j++) {
              if (arrayTemp[j] === masita) {
                flag_j += 1;
              }
            }
            console.log("veces: ", flag_j);
            if (flag_j === 1) {
              arrayMasas.push(parseFloat(masas[i]));
              var counter = 0;
              var masita_2 = masas[i];
              for (let j = 0; j < masas.length; j++) {
                if (masas[j] === masita_2) {
                  counter += 1;
                }
              }
              this.Conteo_Registros.push(counter);
            }
          }
          this.Array_Registros = _.sortBy(arrayMasas);
          var acumulador_v: number = 0;
          var acumulador_f: number = 0;
          for (let g = 0; g < this.Array_Registros.length; g++) {
            acumulador_f += this.Conteo_Registros[g];
          }
          for (let g = 0; g < masas.length; g++) {
            acumulador_v +=  masas[g];
          }
          this.Suma_Total_Frecuencias = acumulador_f;
          this.Suma_Total_Valores = acumulador_v;

          this.Xmin = this.Array_Registros[0];
          this.Xmax = this.Array_Registros[this.Array_Registros.length - 1];

          this.IntervalosK = Math.ceil(1 + 3.322 * Math.log10(this.Nro_Registros));

          this.Amplitud_Intervalo = Math.ceil((this.Xmax - this.Xmin)/this.IntervalosK);
          
          var interval_acumulador = this.Xmin;
          for (let i = 0; i < this.IntervalosK; i++) {
            this.Array_Intervalos.push(interval_acumulador);
            interval_acumulador += this.Amplitud_Intervalo;
          }
          for (let i = 0; i < this.IntervalosK; i++) {
            var Frecuencia_Clase = 0;
            for (let g = 0; g < masas.length; g++) {
              if (masas[g] >= this.Array_Intervalos[i] && masas[g] < (this.Array_Intervalos[i] + this.Amplitud_Intervalo)) {
                Frecuencia_Clase += 1;
              }
            }
            this.Array_Frecuencias_Intervalo.push(Frecuencia_Clase);
          }
this.Array_Unido_Intervalos = this.Array_Intervalos.map((valor, indice) => ({ intervalo: valor, n: this.Array_Frecuencias_Intervalo[indice] }));
this.Array_Unido = this.Array_Registros.map((valor, indice) => ({ masa: valor, n: this.Conteo_Registros[indice] }));
          this.flag_1 = false;
        }

        if (flag === false) {
          if (Loader_1 && Loader_2) {
            Loader_1.style.display = 'none';
            Loader_2.style.display = 'none';
          }
          flag = true;
        }
       })
    }, 5000);
  }

  Enviar_Data(): void {
    this.Mensaje_Form = "¡Haz tu encuesta ahora!";
    var Input_1 = document.getElementById('Input_Masa_Form');
    var Input_2 = document.getElementById('Input_Edad_Form');
    var Button = document.getElementById('Button_Enviar_Form');
    var Loader = document.getElementById('Loader_Send');
    var Success = document.getElementById('Success_Icon_Send');
    if (Input_1 && Input_2) {
      Input_1.style.outline = '0px solid red';
      Input_2.style.outline = '0px solid red';
    }
    if (this.Encuesta.valid && this.Encuesta.get('masa').value < 400 && this.Encuesta.get('masa').value > 20 && this.Encuesta.get('edad').value > 10) {

      if (Loader && Button) {
        Loader.style.display = 'flex';
        Button.style.display = 'none';
      }
        const datos_form = this.Encuesta.value;
        this.Encuesta.patchValue({ masa: ''});
        this.Encuesta.patchValue({ edad: ''});
    this.dataService.Post_Masa_Edad_Data(datos_form).subscribe(data => {

      setTimeout(() => {
        if (Loader && Success) {
          Loader.style.display = 'none';
          Success.style.display = 'flex';
        }
        setTimeout(() => {
          if (Button && Success) {
            Success.style.display = 'none';
            Button.style.display = 'flex';
          }
        }, 1000);
      }, 2000);
    })
  } else {
    this.Mensaje_Form = "¡Datos Inválidos Detectados!";
      if (this.Encuesta.get('masa').value < 20 || this.Encuesta.get('masa').value > 400) { 
        if (Input_1) {
          Input_1.style.outline = '3px solid red';
        }
      }
      if (this.Encuesta.get('edad').value < 11) {
        if (Input_2) {
          Input_2.style.outline = '3px solid red';
        }
      }
  }
  }
  GenerarTabla(): void{
    var Loader_3 = document.getElementById('Loader_Data_3');
    var Button = document.getElementById('Button_Generate_Table');
    if (Loader_3 && Button) {
      Loader_3.style.display = 'flex';
      Button.style.display = 'none';
    }
    this.Array_Frecuencias_Intervalo = [];
    this.Array_Intervalos = [];
    this.Array_Unido_Intervalos = [];
    this.Array_Registros = [];
    this.Array_Unido = [];
    this.Conteo_Registros = [];
    this.flag_1 = true;
    setTimeout(() => {
      if (Loader_3 && Button) {
        Loader_3.style.display = 'none';
        Button.style.display = 'flex';
      }
    }, 3000);
  }
}
