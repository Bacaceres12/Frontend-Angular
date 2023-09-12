import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import 'chart.js/auto'; // Importar Chart.js y todas las escalas
import { ConsultasService } from 'src/app/services/consultas.service';
import { Consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  chart: any;
  consultas: Consulta[] = [];

  constructor(private consultasService: ConsultasService) {}

  ngOnInit(): void {
    this.cargarConsultasTodas();
  }

  cargarConsultasTodas(): void {
    this.consultasService.listaConsultaTodas().subscribe(
      data => {
        this.consultas = data;
        this.crearGraficoBarras();
      },
      error => {
        console.error('Error al cargar las consultas', error);
      }
    );
  }

  crearGraficoBarras(): void {
    const labels = ['Aprobado', 'Rechazado', 'En tramite'];
    const datosTramites = this.obtenerDatosTramitesPorEstado(labels);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Cantidad de Trámites Aprobados',
          data: datosTramites,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
          borderWidth: 1
        }
      ]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const canvas = document.getElementById('graficoBarras') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: options
    });
  }

  obtenerDatosTramitesPorEstado(estados: string[]): number[] {
    const datosTramitesPorEstado = [];

    for (const estado of estados) {
      const cantidadTramites = this.consultas.filter(consulta => consulta.estado === estado).length;
      datosTramitesPorEstado.push(cantidadTramites);
    }

    return datosTramitesPorEstado;
  }
}
