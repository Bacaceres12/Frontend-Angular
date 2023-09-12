// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  authURL: 'https://nestjs-mysql-production-e354.up.railway.app/auth/',
  tramitesURL: 'https://nestjs-mysql-production-e354.up.railway.app/tramites/',
  consultaURL:'http://nestjs-mysql-production-e354.up.railway.app/consulta/',
  consultaTodasURL:'http://nestjs-mysql-production-e354.up.railway.app/consulta/todas/',
  usuarioURL: 'http://nestjs-mysql-production-e354.up.railway.app/usuario/',
  rolURL: 'http://nestjs-mysql-production-e354.up.railway.app/rol/',
  asignaturaURL: 'http://nestjs-mysql-production-e354.up.railway.app/asignaturas/',
  asignacionURL: 'http://nestjs-mysql-production-e354.up.railway.app/asignacion'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
