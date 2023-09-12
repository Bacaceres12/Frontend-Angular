import { TramitesService } from './../../services/tramites.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Tramites } from 'src/app/models/tramites';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  nombreUsuario: string;
  tramite:Tramites[]= [];

  noticias = [
    {
      titulo: '',
      link: 'https://www.uniajc.edu.co/publicacion-resultados-de-la-convocatoria-sostenimiento/',
      imagen: 'https://www.uniajc.edu.co/wp-content/uploads/2022/10/BANNER-WEB.jpg'
    },
    {
      titulo: '',
      link: 'https://www.uniajc.edu.co/candidatos-habilitados-elecciones-uniajc-2023/',
      imagen: 'https://www.uniajc.edu.co/wp-content/uploads/2023/04/20230306-UNICAMACHO-Elecciones-2023_Banner-Noticia.png'
    },
    {
      titulo: '',
      link: 'https://www.uniajc.edu.co/administrador-renovamos-nuestro-programa/',
      imagen: 'https://www.uniajc.edu.co/wp-content/uploads/2023/05/Noticia@100x-100.jpg'
    },

    {
      titulo: '',
      link: 'https://www.uniajc.edu.co/estudiante/bienestar-uniajc/',
      imagen: 'https://www.uniajc.edu.co/estudiante/wp-content/uploads/sites/20/2020/04/20200318-UNIAJC-Medios-de-Atenci%C3%B3n-y-Comunicacion-COVID-19-Texto-BUpng_Slider_Slider.png'
    },
    {
      titulo: '',
      link: 'https://www.uniajc.edu.co/ceftel/',
      imagen: 'https://www.uniajc.edu.co/wp-content/uploads/2022/12/A5B3E437-A73A-4FB2-A8E7-13FFE8EDD391.png'
    },
    {
      titulo: '',
      link: 'https://www.uniajc.edu.co/administrador-renovamos-nuestro-programa/',
      imagen: 'https://scontent.fclo7-1.fna.fbcdn.net/v/t39.30808-6/362964878_775009831294108_4597950032543514313_n.jpg?stp=dst-jpg_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=i8vWmFX6jtYAX-vyfcW&_nc_ht=scontent.fclo7-1.fna&oh=00_AfBixXydFj0DBU1t5vtDhqfSEVawA22loBHn6222f_VTpg&oe=64ECDCFC'
    },
    // Agrega más noticias según sea necesario
  ];




  constructor(
    public TokenService: TokenService,
    private tramitesService: TramitesService

  ){}

  ngOnInit(): void {
    this.nombreUsuario = this.TokenService.getNombreUsuario();

  }
}



