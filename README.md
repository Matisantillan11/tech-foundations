# Tech Foundations · Programación para todos

Presentación web de 17 pantallas basada exclusivamente en el contenido y las notas de las diapositivas originales 1–13. Branding y recursos visuales de Axis Human / AI Spark, con la tipografía Sansation del original. Se retiró la pantalla «Tres ideas para empezar» a pedido del usuario.

## Abrir

El proyecto usa **Astro**, **Tailwind CSS 4**, **Node.js 22.12 o superior** y **pnpm 12.3.4**. Desde esta carpeta ejecutá:

```sh
pnpm install
pnpm dev
```

Abrí **http://localhost:3000**. Los cambios se actualizan durante el desarrollo. `pnpm start` es un alias de `pnpm dev`. Para detener el servidor, usá `Ctrl+C`.

## Compilar y distribuir

```sh
pnpm build
pnpm preview
```

`pnpm build` genera el sitio estático en `dist/`, listo para alojarlo en un servidor web. `pnpm preview` permite revisar esa compilación en **http://localhost:3000**.

La misma compilación genera **dist/offline.html** para abrir directamente en Chrome sin servidor ni conexión. Conservá `dist/assets/` junto a ese archivo: contiene las imágenes y fuentes originales. La exportación integra el CSS y JavaScript compilados, incluidas las notas, para mantener el uso sin servidor. No hace falta instalar Node o pnpm en la computadora que solamente proyecta esa versión.

## Dictar la clase

- Flechas izquierda/derecha o Espacio: navegar. Inicio/Fin: primera/última pantalla.
- **G**: índice de diapositivas. También se abre desde el icono superior o el nombre del bloque.
- **F**: pantalla completa.
- **P** o **Vista docente**: abrir una ventana independiente con guía, notas originales, siguiente título y cronómetro. Ambas ventanas sincronizan la diapositiva actual y permiten navegar.
- Proyectá únicamente la ventana principal. Mantené la vista del docente en otra pantalla.
- Los ejemplos se activan con sus botones; no hay avance automático. Al volver a una diapositiva, sus ejemplos vuelven al estado inicial.
- En la diapositiva 4, la velocidad pasa de 4 a 8, 12 y 16 km/h: la persona camina, trota y corre. «Reiniciar» vuelve a 4 km/h. La manzana repite su caída con la misma gravedad del modelo; intentar reasignarla muestra un mensaje sin cambiar el valor ni el ciclo. Las animaciones se detienen al salir de esa pantalla y respetan movimiento reducido.
- En el celular, podés navegar con los botones o deslizar horizontalmente. Las pantallas extensas permiten desplazamiento vertical.
- Se respeta la preferencia de movimiento reducido del sistema.

## Contenido y alcance

El contenido extenso de las notas se repartió en pantallas breves. Las actividades de participación y el cierre reutilizan los conceptos originales: variables y constantes, tipos de datos y condicionales. No se desarrollan los módulos posteriores de anatomía del software, Git/GitHub ni prompt engineering. La pregunta inicial sobre IA se conserva como conversación abierta; la diapositiva de relleno 6 se integró mediante el branding.

Las notas originales de las primeras 13 diapositivas están preservadas en `src/data/original-slides.json` y disponibles desde la vista docente. Cada pantalla en `src/data/slides.js` indica sus diapositivas de origen; la guía adaptada está en `src/data/speaker-notes.js`. Ambas clases de notas se cargan únicamente en la vista docente.

Se ajustaron imprecisiones técnicas: `const` impide reasignar pero no congela objetos; un array de JavaScript puede mezclar tipos; `BigInt` representa enteros de precisión arbitraria; varios `if` independientes no equivalen a una cadena `if / else if / else`. La omisión de `Symbol` en la lista original de primitivos se aclara en las notas docentes sin desarrollar un tema adicional en pantalla. Referencias: [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [MDN: tipos de datos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures).

## Editar

- `src/pages/index.astro`: entrada de la presentación y carga del script del navegador.
- `src/layouts/PresentationLayout.astro`: documento HTML, metadatos y estilos globales.
- `src/components/presentation/`: componentes de audiencia, encabezado, navegación, vista docente y paneles. No agregan contenedores al HTML original.
- `src/data/slides.js`: textos, ejemplos y orden de las pantallas, con utilidades Tailwind en el HTML.
- `src/data/physics-slide.js`: contenido e ilustraciones SVG de velocidad y gravedad para la diapositiva 4, actualizada a pedido del docente.
- `src/data/speaker-notes.js`: guías para el docente, en el mismo orden que las pantallas.
- `src/data/formatters.js`: funciones compartidas para los bloques de código y etiquetas.
- `src/data/original-slides.json`: contenido y notas de la fuente original.
- `src/styles/tailwind.css`: importación de Tailwind, tokens de marca, fuentes locales, breakpoints, animaciones y estilos base mediante `@apply`.
- `src/ui/slide-classes.js`: utilidades Tailwind completas para las variantes de pantalla que se seleccionan dinámicamente.
- `src/scripts/`: módulos de comportamiento del navegador, detallados a continuación.
- `public/assets/`: imágenes extraídas del PowerPoint y tipografía local, copiadas sin modificaciones al compilar.
- `tools/export-offline.mjs`: herramienta de Node para generar la copia sin servidor. No se envía al navegador.

Para sumar una pantalla, agregá una entrada a `slides` con `title`, `chapter`, `source`, `summary` y `html`; `layout` es opcional. Agregá su guía en la misma posición de `speakerNotes`. Al reordenar o eliminar pantallas, actualizá ambos arreglos. El índice y la navegación calculan su total desde `slides`; el contador inicial se genera en Astro. Los enlaces `data-go` usan índices desde cero. Para nuevos comportamientos, mantené sus selectores `id` / `data-*` alineados con el HTML.

## Estilos

Los componentes Astro y el HTML de las pantallas usan utilidades Tailwind. Las clases semánticas que permanecen, como `feedback` o `phone-preview`, sirven como selectores de interacción o variantes; no tienen una hoja de estilos estructural paralela. Las clases dinámicas se escriben completas para que Tailwind pueda detectarlas. Los estados de los ejercicios modifican clases de estado sin borrar las utilidades del elemento.

Se conservan los breakpoints originales mediante `wide`, `compact`, `tablet` y `mobile`. No se importa Preflight para evitar que su reset cambie los estilos predeterminados del navegador usados por el diseño original. El CSS residual define las fuentes, los tokens, los keyframes y las reglas base; los estilos de las pantallas están en Tailwind. Referencia: [Tailwind con Astro](https://tailwindcss.com/docs/installation/framework-guides/astro).

## JavaScript por responsabilidad

| Archivo en `src/scripts/` | Responsabilidad | Carga |
| --- | --- | --- |
| `presentation.js` | Conecta los módulos; es el único punto de entrada de Astro | Inicial |
| `navigation.js` | Posición actual, hashes, botones y navegación táctil | Compartida |
| `shortcuts.js` | Atajos de teclado, respetando campos editables y diálogos | Compartida |
| `sync.js` | Ventana docente y mensajes entre ventanas conectadas | Compartida |
| `panels.js` | Índice, ayuda, avisos y pantalla completa | Compartida |
| `audience.js` | Renderiza la pantalla y solicita los ejercicios cuando se usan | Solo audiencia, mediante import dinámico |
| `exercises.js` | Estado y respuestas de los ejercicios | Primera interacción con un ejercicio |
| `physics-exercise.js` | Cambios de velocidad, reinicio y rechazo de reasignación de gravedad | Importado con los ejercicios |
| `presenter.js` | Guías, notas originales y vista del docente | Solo docente, mediante import dinámico |
| `timer.js` | Cronómetro | Importado por la vista docente |
| `html.js` | Escape de texto antes de insertarlo en HTML | Utilidad compartida |

La navegación expone una API pequeña (`go`, `next`, `previous`, `subscribe`); los módulos reciben esa API y delegan acciones. No hay un framework de estado adicional ni una jerarquía de clases. Los datos de la presentación se comparten; las notas y los comportamientos de cada vista tienen carga independiente.

Separar archivos por sí solo no reduce las descargas: los imports dinámicos son los que producen los chunks independientes en la versión web. La versión offline combina deliberadamente los módulos en una única copia mediante esbuild para funcionar bajo `file://` sin descargar código.

Astro genera el documento y empaqueta el JavaScript existente. No se agregó React, otro motor de UI ni navegación de páginas que interfiera con los hashes o la ventana docente. Referencia: [scripts de navegador en Astro](https://docs.astro.build/en/guides/client-side-scripts/).

Sansation se distribuye bajo SIL Open Font License: [licencia del proyecto](https://github.com/google/fonts/blob/main/ofl/sansation/OFL.txt). Los recursos de marca provienen de la presentación proporcionada.

## Validación

`pnpm test` verifica navegación, atajos en campos editables, validación de mensajes entre ventanas, ausencia de rebotes en la sincronización y respuestas/reinicio de los ejercicios. Son pruebas de lógica con Node, sin automatización del navegador.

`pnpm build` verifica la compilación de Astro/Tailwind y la exportación offline. Se comprobaron las utilidades generadas, la preservación del contenido restante y sus notas, y la resolución de los recursos locales. La prueba visual y de interacción en navegador queda a cargo del usuario, según lo solicitado.
