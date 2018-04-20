# GestionDePrestamos

Aplicacion en la que un cliente se registra en una base de datos con su informacion personal. Si cumple una serie de parametros, se envia a una segunda pagina donde se le solicita informacion respecto a su empleo. Si al final cumple con todas, se da un resultado de credito aprobado.

## Configurando el Entorno Local

### Base de datos
Se requiere de SQL Server, y ejecutar el script.sql, que creará un par de tablas y una base de datos.
Para que el API Rest funcione bien, debe dirigirse al menu de windows, buscar Sql Server Configuration Manager, luego ur a configuracion de Red de SQL Server, paso seguido buscar la opcion Protocolos 'nombre instancia', y al dar click, certificar que TCP/IP esta habilitado, si no es asi habilitarlo y reiniciar el equipo.

###API Rest
Fue desarrollada en Node.js, por lo que es indispensable ir a la pagina del fabricante y descargar la ultima version funcional. 
Es necesario ir al archivo index.js, ubicado en \GestionDePrestamos\APIRest y cambiar los datos de acceso a su instancia de SQL Server.
Paso siguiente, es navegar hasta la carpeta \GestionDePrestamos\APIRest y abrir dicha ruta en consola, para luego ejecutar npm start, de esa forma se iniciará nuestra API en localhost:3001
Una forma de probar el correcto funcionamiento es abrir en su brouser la siguiente ruta http://localhost:3001/api/v1/clients/ que deberia devolver un array vacio, o lleno si es que existen registros en la tabla Cliente de la base de datos.

##App en Angular
Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0. por lo que es indispensable tenerlo isntalado en su maquina.
Paso siguiente, abrir la carpeta \GestionDePrestamos\WebApp y navegar hasta esa ruta desde su terminal, y descargar todos los paquetes de node con npm install.
Luego ejecutar `ng serve` y navegarhasta `http://localhost:4200/`. 
