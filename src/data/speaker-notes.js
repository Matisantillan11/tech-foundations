// Loaded only by the presenter. Entries follow the order of slides.js.
export const speakerNotes = [
	[
		'Abrí con una pregunta: «¿Qué sentís cuando escuchás la palabra programación?». No hace falta saber código para participar.',
		'Presentá Tech Foundations como un espacio para entender los conceptos y conversar. Pedí ejemplos cotidianos a lo largo de la clase.',
	],
	[
		'La diapositiva original plantea esta pregunta sin desarrollar respuestas. Usala como disparador, sin introducir un módulo nuevo de IA.',
		'Recogé dos o tres ejemplos del grupo. Dejá la pregunta abierta y conectá con la importancia de entender los fundamentos.',
		'La diapositiva 6 era un marcador de plantilla («Título de slide – Logo AI SPARK»); se conserva la identidad visual y se omite ese texto de relleno.',
	],
	[
		'Usá los nuevos ejemplos de física: velocidad para una variable y aceleración de la gravedad para una constante. La fuente original se conserva en las notas de procedencia; esta analogía reemplaza los recipientes a pedido del docente.',
		'Antes de tocar Aumentar velocidad, pedí una predicción. Los pasos de la demostración son 4 km/h (caminar), 8 km/h (trotar), 12 y 16 km/h (correr). Cambian el dato velocidad, la postura y la cadencia. Son ejemplos ilustrativos, no umbrales universales de locomoción. Reiniciar vuelve a 4 km/h.',
		'La manzana cae en loop con el mismo ciclo. Al intentar cambiar gravedad, const impide reasignar el valor y mostramos el rechazo sin modificar la animación. No producimos una excepción real que interrumpa la presentación.',
		'Precisión física: 9,81 m/s² es una aproximación de la aceleración gravitatoria cerca de la superficie terrestre. En este modelo la fijamos como constante; la gravedad física puede variar con el lugar y la altura. No confundirla con la constante de gravitación universal G.',
		'Precisión de JavaScript: const impide reasignar la variable, pero no congela las propiedades de un objeto. Aquí guardamos un número. Las ilustraciones son conceptuales, no una simulación física a escala.',
	],
	[
		'Leé el ejemplo en voz alta, de izquierda a derecha. Declarar crea un nombre con el que podemos encontrar el dato.',
		'Separá nombre de valor: cantidadDeCafes es la etiqueta; 2 es lo que guardamos. El signo = asigna un valor, no hace una pregunta.',
		'Usá el segundo ejemplo para recordar la diferencia entre let y const. No hace falta memorizar la puntuación en este momento.',
	],
	[
		'Retomá los ejemplos originales: _lastName, _x y _100 son nombres válidos. No todos los nombres válidos resultan igual de descriptivos.',
		'En la práctica, edad es válido y claro; 2edad empieza con un número; let es una palabra reservada.',
		'Esta es una introducción a las reglas habituales: JavaScript también admite letras Unicode. Evitá convertir esta parte en una lista para memorizar.',
	],
	[
		'Pedí ejemplos al grupo y seleccioná el tipo correspondiente. Empezá por String, Number y Boolean; después mostrá BigInt, Undefined y Null.',
		'Number representa números, también decimales. BigInt representa enteros de precisión arbitraria, no cualquier número grande o decimal.',
		'La nota original anuncia siete tipos primitivos pero enumera seis. Falta Symbol. Se documenta aquí la precisión y no se agrega un tema nuevo a la clase.',
		'Boolean tiene dos valores: true y false. Prendido/apagado es una analogía; 1 y 0 son números, no booleanos de JavaScript.',
	],
	[
		'Retomá la caja vacía de las notas: con null la caja tiene una etiqueta y elegimos representar «nada».',
		'En estos ejemplos, undefined aparece porque declaramos la variable sin darle un valor; null se asigna explícitamente. No afirmar que undefined nunca pueda asignarse de forma explícita.',
	],
	[
		'Usá la analogía del material original: grano de café frente a cafetera. La cafetera puede tener agua y café como propiedades, y preparar o espumar como métodos.',
		'Es una analogía para diferenciar un valor simple de una agrupación. Un objeto no tiene que tener métodos propios.',
		'Los valores primitivos son inmutables. Reasignar una variable es reemplazar su valor, no modificar el valor primitivo original.',
	],
	[
		'Este es el objeto de ejemplo de las notas originales. Los valores se conservan como datos del ejemplo, no como información biográfica actual.',
		'Mostrá cómo cada etiqueta de la ficha tiene su equivalente en el código. Un objeto puede agrupar valores de distintos tipos.',
		'Si surge la pregunta sobre const: no podemos reemplazar persona por otro objeto, pero sí cambiar una propiedad como persona.age.',
	],
	[
		'Mencioná las tres formas presentes en las notas sin abrir un módulo de funciones. prepararCafe() ilustra cómo se invocaría una función ya definida; no es una función incorporada.',
		'Corrección de la nota original: un array de JavaScript puede mezclar tipos, aunque aquí usamos una lista de textos para simplificar.',
		'Las funciones son objetos invocables. Date representa un instante; la forma de mostrarlo depende de la zona horaria y el formato.',
	],
	[
		'Comparadores y actualizadores son la base de lo que viene: los vamos a usar constantemente en condicionales y bucles.',
		'El gotcha más importante de JavaScript: == convierte el tipo antes de comparar; === no. Por eso "5" == 5 da true pero "5" === 5 da false. Recomendá usar siempre === y !== salvo que tengan una razón específica para lo contrario.',
		'Los operadores de actualización son azúcar sintáctico: contador++ es exactamente lo mismo que contador = contador + 1, solo más corto de escribir.',
		'Avisales que van a volver a ver estos operadores más adelante en la clase, dentro de los bucles for y while (i++, total += ...).',
	],
	[
		'Esta pregunta aparece explícitamente en las notas originales. Dejá que el grupo anticipe la respuesta.',
		'Usá el botón para pasar de Number a String y luego a Boolean. En JavaScript, una variable let no queda atada al tipo inicial.',
		'Revelá la respuesta sobre const después de escuchar al grupo. Distinguí reasignación de una variable y modificación de las propiedades de un objeto.',
	],
	[
		'Conectá con decisiones cotidianas. Una condición permite elegir qué instrucciones ejecutar.',
		'La nota original menciona condiciones y bucles juntos. Aquí desarrollamos solamente condicionales, que es el contenido disponible hasta la diapositiva 13.',
		'Relacioná la respuesta sí/no con los valores booleanos true/false que ya vieron.',
	],
	[
		'Usá el ejemplo exacto propuesto por el material: modo claro de día y oscuro de noche.',
		'Preguntá qué cambiará al pulsar Noche. Mostrá cómo se ilumina una sola rama y cambia la interfaz.',
		'Es una regla didáctica: no estamos afirmando que todas las aplicaciones cambien de tema automáticamente con la hora. esDeDia es el booleano que controlamos con los botones.',
	],
	[
		'Leé if / else como «si… entonces… si no…». En una cadena se ejecuta la primera rama cuya condición resulte verdadera, o el else si ninguna se cumple.',
		'Mostrá else if como la variante presente en las notas: si es de día usamos claro; si no, si es de noche usamos oscuro; si ninguna condición se cumple dejamos automático.',
		'Corrección del último ejemplo original: varios if independientes no equivalen a if / else if / else. Pueden ejecutarse varias ramas y el código fuera de ellas se ejecuta siempre. No presentar esa alternativa como equivalente.',
	],
	[
		'Actividad de repaso creada únicamente con los conceptos de las primeras 13 diapositivas.',
		'Antes de responder, preguntá: ¿cuál es el nombre de la variable?, ¿qué tipo de dato tiene su valor?, ¿qué rama se ejecuta?',
		'Respuesta: quedaCafe guarda false, un booleano. Se ejecuta else y el aviso indica que se terminó el café. Pedí una explicación, no solo la opción correcta.',
		'El ejemplo cambia a propósito respecto de la diapositiva 13 (modo claro/oscuro): así el grupo aplica la lógica en un caso nuevo en vez de repetir la respuesta ya vista.',
	],
	[
		'switch compara un mismo valor (tamaño) contra varios case posibles. Cuando encuentra una coincidencia, ejecuta ese bloque; break corta la ejecución para no seguir revisando los demás case.',
		'Probá los tres tamaños conocidos y después XL: como no hay ningún case "xl", se ejecuta el default. Remarcá que default es la red de contención cuando ningún case coincide.',
		'Si preguntan por qué no usar if / else if en su lugar: switch resulta más claro cuando comparamos un mismo valor contra muchas opciones puntuales; con condiciones más complejas (rangos, combinaciones) sigue siendo mejor if / else.',
	],
	[
		'Conectá con el bloque anterior: ya vimos una decisión (if) que se toma una sola vez. Ahora mostramos una decisión que se repite mientras siga siendo verdadera.',
		'Remarcá la diferencia clave con un if: en un bucle, al terminar el bloque de código volvemos a preguntar por la condición, en vez de seguir de largo.',
		'No profundices todavía en for ni en while: esta diapositiva es solo el concepto general que van a ver aplicado en las próximas dos.',
	],
	[
		'Leé el for de izquierda a derecha: primero se declara i en 0 (inicio), después se revisa la condición i < 3, y al final de cada vuelta se ejecuta i++ (paso).',
		'Cada clic en Servir una taza simula una vuelta completa del bucle: i avanza, se sirve una taza y se vuelve a evaluar la condición.',
		'Cuando i llega a 3, la condición i < 3 pasa a ser falsa y el bucle se detiene solo. No hace falta que nadie le diga "parar": lo decide la condición.',
		'Usá for cuando sabés de antemano cuántas vueltas necesitás, aunque sea una cantidad que venga guardada en una variable.',
	],
	[
		'Contrastá con la diapositiva anterior: acá no elegimos un número fijo de vueltas. El bucle depende de una condición externa, quedanClientes > 0.',
		'Cada clic en Atender un cliente resta uno a quedanClientes. Cuando llega a 0, la condición se vuelve falsa y el bucle se detiene.',
		'Si preguntan por qué no usamos for acá: no sabemos cuántos clientes van a venir hasta que la fila realmente se vacíe, así que no hay un número fijo de vueltas para escribir en el for.',
	],
	[
		'Esta vez no hay una respuesta fija: el grupo arma la fila en vivo con los botones, así que el total cambia en cada corrida. Es a propósito, para que calculen de verdad en lugar de recordar un resultado.',
		'Son dos funciones, cada una con una sola tarea: calcularPrecio recibe un tamaño y devuelve un precio (comisión fija + precio según el switch); calcularTotal solo recorre pedidos y acumula. Ninguna hace el trabajo de la otra.',
		'pedidos es un array, como el que vieron en la diapositiva de Array, y arranca vacío igual que en el código. Cada clic en + Chico / + Mediano / + Grande le agrega un elemento.',
		'Pedí que sumen mentalmente antes de tocar Calcular total. El for de calcularTotal usa el mismo patrón que ya vieron: i arranca en 0 y avanza mientras sea menor que la cantidad de pedidos en la fila.',
		'Si preguntan por qué separar calcularPrecio de calcularTotal en vez de sumar todo en un solo bloque: así se puede probar o reutilizar el cálculo de un pedido sin depender del bucle, y viceversa.',
		'Usá Reiniciar fila para repetir el ejercicio con otra combinación de tamaños si el grupo quiere practicar de nuevo.',
	],
	[
		'Cierre de este bloque, no del curso completo. Recuperá las tres ideas sin introducir contenidos posteriores a la diapositiva 13.',
		'Invitá al grupo a elegir una aplicación cotidiana y nombrar un dato, su tipo y una decisión que podría tomar la aplicación.',
		'Volvé al índice para repasar cualquier concepto que haya quedado pendiente.',
	],
]
