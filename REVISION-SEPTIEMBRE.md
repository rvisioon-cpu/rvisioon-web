# Ajustes del 21 de septiembre de 2026

## Aplicado
- Home: textos simplificados, tres capturas reales del showroom público de Océano Atlántico, con un interior del recorrido en la tercera vista. Conservados los tres mockups y el celular horizontal.
- Home/dashboard: acción de agendar debajo de la línea, reajustada la altura de laptop para que no se recorte.
- Nueva sección VR: propuesta de imagen generada de una persona usando lentes, acercamiento y apertura hacia una captura real de un recorrido. Control por scroll en escritorio y por botones en móvil; pausa y movimiento reducido. No es una filmación de una persona poniéndose los lentes, ni un recorrido 360 activo dentro de la landing. El enlace permite abrir el showroom real.
- Showroom: banner más explicativo, exploración de cuatro capítulos con capturas reales, contenido y proceso ampliados; proceso con indicador y revelado al scroll.
- Dashboard: mensajes más concretos, vistas ampliables en lugar de iconos, selector de perspectiva cliente/equipo.
- Proyectos: franja continua de logos negros con pausa, duplicados decorativos ocultos a lectores de pantalla y alternativa sin movimiento.
- Quiénes somos: banner de imagen a todo ancho, especialidades en acordeón conectado a una imagen.

## Pendiente específico
Las tres imágenes del dashboard son provisionales: capturas de las recreaciones locales existentes, etiquetadas «Interfaz ilustrativa · Datos simulados». No se han obtenido capturas de una sesión privada real en esta revisión. Las herramientas de control de la sesión abierta fallaron con «failed to write kernel assets ... os error 3», incluso tras reinicio. El usuario se ofreció a abrir sesión, pero no se pudo conectar la herramienta. Sustituir assets/dashboard-metricas.webp, dashboard-agenda.webp y dashboard-recursos.webp por capturas reales autorizadas, revisar datos personales y ajustar las leyendas/alt. No afirmar que las vistas provisionales sean el producto real.

## Procedencia de recursos
Showroom: https://oceanoatlantico.rmpromotorainmobiliaria.com/ y /recorridos. Capturas del proyecto, plantas, amenidades y tour Unidad 101 (Kuula integrado). Capturadas mediante navegador público sin modificar datos. Recursos finales en WebP.
VR: imagen generada para esta propuesta, guardada como assets/vr-person.webp. No representa un cliente real ni un modelo específico de dispositivo compatible.
Las funciones del dashboard descritas se apoyan en la revisión previa outputs/dashboard-rvisioon-hallazgos.md; no se agregan promesas de ventas, integración o sincronización en tiempo real.

## Comprobación
Cinco páginas revisadas a 1440 y 390 px: sin desbordamiento horizontal, sin imágenes rotas ni errores JavaScript. Probados capítulos, filtros, ampliación y cierre por Escape, acordeones, perspectivas, pausa y navegación VR con movimiento reducido. Revisados encuadres mediante capturas. Mantener noindex hasta publicación.

La copia de transferencia creada el 19/09 no incluye estos ajustes. La versión actual está en esta carpeta rvisioon-v4. Copia previa de seguridad en work/revision-sept21/backup.

## Ajustes de navegación y referencias Lusion — 21 septiembre
- Calidad cinematográfica trasladada del home a Showroom; controles conservados y pausa propia.
- VR: texto en columna independiente; grabación de movimiento del recorrido público de Unidad 101, Océano Atlántico. Se reproduce únicamente en tercer capítulo visible, sin audio. Se pausa fuera de vista y respeta movimiento reducido.
- Home: video oficial zddaaKMqQZk con expansión al scroll, apertura por clic y cierre que detiene reproducción. Reproductor de YouTube verificado.
- Showroom: capítulo Ubicación, captura real y explicación de mapa, categorías y cómo llegar.
- Equipo: cinco tarjetas con giro por clic/teclado y despliegue al entrar en pantalla.
- Proyectos: imágenes amplias, títulos y metadatos editoriales, efecto suave; filtros y teasers conservados.
- Pruebas: escritorio 1440 y móvil 390; sin desbordamiento horizontal ni errores JavaScript en cuatro páginas. Filtro horizontal devuelve proyecto y teaser. Movimiento reducido y pausa del recorrido verificados.
- Dashboard: ampliación de contenido sigue pendiente por decisión del usuario.

## Ajuste de fidelidad a Lusion — revisión 24
- Video integrado dentro de La experiencia; composición editorial con expansión desde una miniatura lateral hasta formato amplio al scroll.
- VR recupera imagen y recorrido a pantalla completa, conserva grabación real y controles de pausa; texto sobre gradientes sin tarjeta contenedora.
- Ubicación muestra mapa interactivo abierto, con buscador, filtros y puntos cercanos. Captura pública nueva: showroom-mapa-interactivo.webp.
- Dashboard: ocho funcionalidades sin numeración, contenido respaldado por dashboard-rvisioon-hallazgos.md. Las vistas existentes permanecen ilustrativas; módulos sin captura se presentan como esquemas explícitamente etiquetados, no capturas reales.
- Equipo: mazo central -> abanico -> giro secuencial al scroll. Giro manual accesible. Lectura directa en móvil y movimiento reducido.
- Proyectos: entrada con recorte, profundidad suave de imagen, título con letras deslizantes y flecha al hover/foco. Filtros y teasers conservados.
- QA: cinco páginas sin errores JS y sin desbordamiento en escritorio; cuatro vistas móviles verificadas. Ocho selectores funcionan, vídeo abre/cierra, VR reproduce, filtro horizontal muestra dos tarjetas. Giro manual y movimiento reducido revisados.
