# Weekly Standups

# Week 1

**Tareas completadas:**

- Validaciones custom de login de email y password [damian]

- Middleware de session y cookie de aplicacion [damian]

- Middleware de acceso: guest y auth [damian]

- Vista de usuario [agus]

- Implementar el registro de usuarios [santi]

- Validaciones de registro [santi]

---

**Impedimentos:**

- Inconvenientes con cookie y session por requerir en el entry point los middleware de session y cookie luego de las rutas. 

- Problemas con las validaciones por llamarlas antes que el upload.any en el archivo de rutas. 

- Inconvenientes con la cookie por guardar en la cookie toda la informacion del usuario en lugar de un dato unico como el id. 

---

**Soluciones:**

● Descubrimos rapidamente que el orden del requerimiento de los elementos en distintos lugares como el entry point o en los middleware de las rutas alteran la funcionalidad del sitio. Con esta solucion resolvimos los primeros dos problemas.  

● Repasando la teoria solucionamos el tercer problema.  
---
 