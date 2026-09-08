# Tech Foundations · Programación para todos

Presentación web de 18 pantallas basada exclusivamente en el contenido y las notas de las diapositivas originales 1–13. Branding y recursos visuales de Axis Human / AI Spark, con la tipografía Sansation del original.

## Abrir

Podés abrir **index.html** directamente en Chrome, sin instalar nada y sin conexión a internet.

Para usar un servidor local, desde esta carpeta ejecutá:

```sh
npm start
```

Abrí **http://localhost:3000**. No requiere `npm install`. Para detener el servidor, usá `Ctrl+C`.

## Dictar la clase

- Flechas izquierda/derecha o Espacio: navegar. Inicio/Fin: primera/última pantalla.
- **G**: índice de diapositivas. También se abre desde el icono superior o el nombre del bloque.
- **F**: pantalla completa.
- **P** o **Vista docente**: abrir una ventana independiente con guía, notas originales, siguiente título y cronómetro. Ambas ventanas sincronizan la diapositiva actual y permiten navegar.
- Proyectá únicamente la ventana principal. Mantené la vista del docente en otra pantalla.
- Los ejemplos se activan con sus botones; no hay avance automático. Al volver a una diapositiva, sus ejemplos vuelven al estado inicial.
- En el celular, podés navegar con los botones o deslizar horizontalmente. Las pantallas extensas permiten desplazamiento vertical.
- Se respeta la preferencia de movimiento reducido del sistema.

## Contenido y alcance

El contenido extenso de las notas se repartió en pantallas breves. Las actividades de participación y el cierre reutilizan los conceptos originales: variables y constantes, tipos de datos y condicionales. No se desarrollan los módulos posteriores de anatomía del software, Git/GitHub ni prompt engineering. La pregunta inicial sobre IA se conserva como conversación abierta; la diapositiva de relleno 6 se integró mediante el branding.

Las notas originales de las primeras 13 diapositivas están preservadas en `source/slides-01-13.json` y disponibles desde la vista docente. `source/notes.js` permite consultarlas sin servidor. Cada pantalla en `content.js` indica sus diapositivas de origen y contiene una guía didáctica adaptada.

Se ajustaron imprecisiones técnicas: `const` impide reasignar pero no congela objetos; un array de JavaScript puede mezclar tipos; `BigInt` representa enteros de precisión arbitraria; varios `if` independientes no equivalen a una cadena `if / else if / else`. La omisión de `Symbol` en la lista original de primitivos se aclara en las notas docentes sin desarrollar un tema adicional en pantalla. Referencias: [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [MDN: tipos de datos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures).

## Editar

- `content.js`: textos, ejemplos, orden y guías para el docente.
- `styles.css`: diseño, tipografía, animaciones y adaptación a dispositivos.
- `app.js`: navegación, ejemplos interactivos y sincronización del docente.
- `assets/`: imágenes extraídas del PowerPoint y tipografía local.

Sansation se distribuye bajo SIL Open Font License: [licencia del proyecto](https://github.com/google/fonts/blob/main/ofl/sansation/OFL.txt). Los recursos de marca provienen de la presentación proporcionada.

## Validación

Sintaxis de `app.js` y `content.js` verificada con Node. La prueba manual en navegador queda a cargo del usuario, según lo solicitado. No se completaron pruebas automatizadas en navegador.
