const originalSlides = [
  {
    "slide": 1,
    "text": "A point of reference amidst complexity",
    "notes": ""
  },
  {
    "slide": 2,
    "text": "Tech\nFoundations",
    "notes": ""
  },
  {
    "slide": 3,
    "text": "Contenido\n1\nIntro: ¿Cómo piensa una computadora?\n2\nAnatomía del Software – ¿Cómo está hecha una aplicación?\n3\nGit & GitHub\n4\nPrompt Engineering\n5\nConclusiones",
    "notes": ""
  },
  {
    "slide": 4,
    "text": "Un espacio de reflexión,\ninvestigación y\npensamiento aplicado.",
    "notes": ""
  },
  {
    "slide": 5,
    "text": "AI- ¿Que puede (y que no) hacer por nosotros?",
    "notes": ""
  },
  {
    "slide": 6,
    "text": "Título de slide – Logo AI SPARK",
    "notes": ""
  },
  {
    "slide": 7,
    "text": "Variables y Constantes",
    "notes": ""
  },
  {
    "slide": 8,
    "text": "1\n¿Que són?\n2\n¿Cómo las declaramos?\n3\nReglas para nombrarlas.\n4\nEjemplos",
    "notes": "Las variables y constantes son utilizada para lo mismo pero de distinta forma. Ambos son “contenedores para nuestra información”.Para hacerlo más gráfico:\nLas constantes son recipientes sellados o moldes con una forma rígida e inmutable. Una vez que defines su contenido o su forma al principio, se queda exactamente así durante toda la receta (ejecución del programa). Si tu molde de torta es redondo y de 20 cm, no se puede transformar en uno cuadrado a mitad de camino.\nLas variables son recipientes abiertos. Su \"forma\" (el tipo de dato que guardan) suele mantenerse fija según el recipiente que elijas, pero su contenido es totalmente dinámico: puedes cambiarlo, vaciarlo, sumarle más o reemplazarlo por completo mientras sigues cocinando.\nAmbos son contenedores para guardar datos, la única diferencia real es si se te permite o no cambiar lo que hay adentro una vez que lo guardaste.\nPara identificarlos, utilizamos “nombres”.Estos nombres, pueden ser tan cortos como una letra (x, y, z) o  tan largo y descriptivo como querramos (age, carName, lastName).Lo recomendado es siempre utilizar nombres lo más descriptivo posibles, ya que esto mejora la developer experience y ayuda a tener una cognitiva cerebral menor a la hora de “recordar” o “leer” lo que hicimos en el pasado. \nPara crear los nombres hay algunas reglas: \nPueden contener letras, digitos, guión bajo o el signo dolar.\nPueden empezar letras,, guión bajo o el signo dolar. (números no son permitidos como primer carácter)\nSon case sensitive. (X es diferente a x)\nHay palabras reservadas que no pueden ser utilizadas como nombres\n\nEjemplos\nlet _lastName = \"Johnson\";let _x = 2;let _100 = 5;"
  },
  {
    "slide": 9,
    "text": "Tipos de datos",
    "notes": ""
  },
  {
    "slide": 10,
    "text": "¿Qué tipo de información puede contener una variable?",
    "notes": "Los seres humanos tenemos una necesidad inmesurable por entiquetar las cosas.Los tipos de datos son un concepto muy importante en la programación y nos ayuda a entiquetar nuestras variables.Si Variables vs Constantes, hablamos de moldes para ejemplificar que es una variable. Un tipo de dato es lo que define que va dentro del molde/recipiente.Poniendonos un poquitos más técnicos, una variable de JavaScript puede almacenar 8 tipos de datos: 7 tipos de datos primitivos y 1 tipo de dato de objeto.Que diferencia a un tipo de dato primitivo de un tipo de dato objeto?\nLos tipos de datos primitivos son valores puros, normalmente inmutables. Simples, utilizados para definir el tipo de contenido que se debe guardar en el recipiente mientras que los tipo de datos objetos vienen con “cositas” extras que nos ayudan a interactuar con ellos (métodos y variables) y manipular la informacion almacenada en ese recipiente.Un ejemplo muy claro seria:Dato primitivo: grano de café.Dato objeto: cafetera (almacená grano de cafe y agua ~ propiedades ~ y tienen botones y funcionalidades para moler, espumar la leche, hacer espresso, latte etc ~ métodos y funciones ~)Number -> Representa un valor numeroBigint\t-> Representa un valor numérico MUY grande. String\t-> Represena una cadena de caracteres, lo que conocemos como “palabras”. Deben estar “encerradas” entre comillas. \nBoolean -> Representa un valor polarizante, que solo puede ser una opcion u otra. True o false, prendido o apagado, 1 o 0. \nUndefined -> Es utilizado para variables que no tienen un valor definido. \nNull -> la mejor metáfora es una caja vacía que pusiste ahí a propósito.\nNo es que te olvidaste de guardar algo o que la caja no existe. La caja está, tiene una etiqueta, pero su contenido ha sido definido intencionalmente como nada.\nObject\t-> Clave/Valor. Es un tipo de dato que nos permite agrupar varios datos relacionados bajo una misma entidad.Ejemplo de objeto{\n  name: ‘Matias Santillan’  age: 28,  isDesigner: false,}Tipos de dato objectoArray -> Es una colección de variables con un tipo de dato definido. Por ejemplo, un array de strings. Su uso más habitual es la de crear una lista de items. Function -> Es un bloque de código reusable diseñado y utilizado para ejecutar una tarea especifica. \nDate -> Representa una fecha.\nLos tipos de datos son dinámicos, es decir una variable que contenia un número puede luego contener un string o un booleano. Pregunta para ver si estaban atentos: ¿Puede una constante tener tipos de datos dinamicos?"
  },
  {
    "slide": 11,
    "text": "Condicionales",
    "notes": ""
  },
  {
    "slide": 12,
    "text": "Tomando decisiones",
    "notes": "Como en cualquier situación de tu vida, cuando estás programando también tenes que tomar decisiones, aunque un poquito diferentes.Para decirle al código que hacer en ciertos escenarios utilizamos lo que se conocen como condiciones y bucles. Un ejemplo con el que pueden estar alineados es la de los modos de las aplicaciones, si estamos utilizandolo de día se visualiza el modo claro pero si estamos utilizandolo de noche, vemos el modo oscuro."
  },
  {
    "slide": 13,
    "text": "“Si … entonces … sino … “",
    "notes": "El famoso “if else”, es el más facil y diría de los más usados condicionales. Al igual que el tipo de dato booleano, es un condicional “polarizante”, es decir solo tenes dos opciones. “Si … entonces … sino … “Existen variantes como el “if else if” que lo que nos permite is anidando condiciones para validar mas de una y asi cubrir más escenarios, aunque no gusta mucho (al menos a mi)Ejemploif (condición) {\n  código a ejecutar si la condición es verdadera\n} else {\n  ejecuta este otro código si la condición es falsa\n}Else ifif (condición) {\n  código a ejecutar si la condición es verdadera\n} else if (condicion) {\n  ejecuta este otro código si la condición anterior es falsa y esta condicion es verdadera\n} else {  ejecuta este otro código si las condiciones son falsa}Alternativa if (condición) {\n  código a ejecutar si la condición es verdadera\n} if (condicion) {\n  ejecuta este otro código si la condición anterior es falsa y esta condicion es verdadera\n}ejecuta este otro código si las condiciones son falsa"
  }
];
