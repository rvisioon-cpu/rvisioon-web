# Blog: añadir o editar notas

El blog es estático: los artículos ya se leen en la web y no dependen de JavaScript para mostrar su contenido. Todavía no existe un panel de publicación en línea.

1. Editar `content/blog.json`. Cada entrada contiene slug único, título, categoría, imagen, descripción, introducción y secciones.
2. Para una nota nueva, copiar una entrada completa, cambiar el slug y completar sus contenidos. La primera entrada será la destacada.
3. Guardar la imagen en `assets` y escribir su nombre en `image`; describirla en `alt`.
4. Ejecutar desde la carpeta del sitio: `python scripts/build_blog.py`.
5. Revisar `blog.html` y la página individual antes de subir los archivos actualizados al alojamiento.

El generador actualiza portada, artículos, lecturas relacionadas, tiempo de lectura, descripciones y datos estructurados BlogPosting. No publica a Internet ni crea usuarios. Para publicar sin editar archivos será necesario integrar un gestor de contenidos.

Se conserva noindex durante la revisión local. Al lanzar el sitio hay que activar la indexación, fijar las URL canónicas del dominio definitivo y generar el sitemap; no se garantiza una posición en buscadores.

## Proyectos / septiembre 2026
Olimpo y Océano Atlántico encabezan el portafolio. La nueva imagen de Olimpo procede de la vista pública del showroom: urbanization/sides/side-0/day.webp, descargada y optimizada como assets/olimpo-general.webp.
Los dos teasers usan imágenes existentes como fondos provisionales desenfocados, uno vertical y uno horizontal. No se atribuyen a inmobiliarias ni enlazan a destinos. Reemplazarlos con material de los nuevos proyectos cuando esté disponible.
