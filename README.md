# Cash Drop

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111111)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Static Site](https://img.shields.io/badge/Static%20Site-111827?style=flat-square)
![AJ Games](https://img.shields.io/badge/AJ%20Games-Cash%20Drop-f59e0b?style=flat-square)

Juego web tipo **Cash Drop** desarrollado como proyecto estático en HTML, CSS y JavaScript. El jugador empieza con **1.000.000 €** repartido en **20 fajos** de 50.000 €, responde preguntas de cultura general y geografía, y conserva solo el dinero colocado sobre la respuesta correcta.

## Demo

Proyecto pensado para desplegarse como sitio estático.

- Producción: `https://cashdrop.aleixaj.com/`
- Repositorio: `https://github.com/AleixAj/cashdrop`

## Cómo Se Juega

1. Pulsa **¡Empezar!**.
2. Lee la pregunta y reparte todos los fajos entre las 4 opciones.
3. Puedes colocar dinero con clics, usar los botones `+` / `-`, escribir una cantidad o usar **All in**.
4. Debes colocar todos los fajos, pero no puedes repartir dinero en las 4 opciones: siempre tiene que quedar al menos una opción vacía.
5. Al confirmar la apuesta, se revela la respuesta correcta.
6. Solo conservas los fajos colocados sobre la respuesta correcta.
7. Si pierdes todos los fajos, la partida termina.
8. Al final se muestra el dinero conseguido.

## Partida

Cada partida tiene **10 preguntas**:

- **4 fáciles**
- **3 medias**
- **3 difíciles**

Las preguntas se eligen aleatoriamente dentro de cada dificultad. El orden de dificultad se mantiene para que la partida progrese de fácil a difícil.

## Características

- Juego 100% estático, sin backend.
- Diseño responsive para escritorio y móvil.
- 4 opciones interactivas por pregunta.
- Sistema visual de fajos de dinero.
- Drag and drop con soporte táctil.
- Modal de resultado tras confirmar apuesta.
- Borde neón verde si aciertas y rojo si fallas.
- Pool de preguntas separado del motor del juego.
- Compatible con despliegues estáticos y CSP estricta, evitando `onclick` inline.

## Estructura

```text
.
├── index.html
├── _headers
├── README.md
├── css/
│   ├── styles.css
│   └── cashdrop.css
├── js/
│   ├── questions-pool.js
│   ├── cashdrop.js
│   └── footer.js
└── img/
    ├── AJ.png
    ├── CashDrop.png
    ├── CashDropIcon.png
    ├── CashDropName.png
    ├── fajo.png
    └── ...
```

## Archivos Principales

- `index.html`: estructura de la aplicación y pantallas principales.
- `css/styles.css`: estilos globales, navbar, layout base y elementos compartidos.
- `css/cashdrop.css`: estilos específicos del juego Cash Drop.
- `js/questions-pool.js`: banco de preguntas por dificultad.
- `js/cashdrop.js`: lógica principal del juego, apuestas, progreso y resultados.
- `js/footer.js`: footer y efectos visuales reutilizados.
- `img/`: imágenes del juego, logos e iconos.

## Ejecutar En Local

Puedes abrir `index.html` directamente en el navegador, aunque se recomienda usar un servidor local para reproducir mejor el entorno de producción.

Con Node.js:

```bash
npx serve -l 8080
```

Después abre:

```text
http://localhost:8080
```

## Añadir Preguntas

Las preguntas están en `js/questions-pool.js`, separadas por dificultad:

- `facil`
- `media`
- `dificil`

Cada pregunta usa este formato interno:

```js
{
  p: 'Texto de la pregunta',
  o: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
  c: 0,
  e: 'Explicación que se muestra al revelar la respuesta',
  h: 'Pista opcional'
}
```

El índice `c` empieza en `0`, por lo que:

- `0` = primera opción
- `1` = segunda opción
- `2` = tercera opción
- `3` = cuarta opción

## Configurar Rondas

La cantidad de preguntas por dificultad se define en `js/cashdrop.js`:

```js
const ROUNDS_EASY = 4;
const ROUNDS_MED = 3;
const ROUNDS_HARD = 3;
```

Si cambias estos valores, el total se calcula automáticamente con `ROUNDS_TOTAL`.

## Despliegue

El proyecto se puede subir a cualquier hosting estático:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Servidor propio

Solo hay que publicar la raíz del repositorio, donde está `index.html`.

El archivo `_headers` incluye cabeceras útiles para servir HTML, CSS y JavaScript con el tipo de contenido correcto.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla
- Bootstrap 5.3 desde CDN
- Bootstrap Icons desde CDN
- Google Fonts

## Autor

Proyecto creado por **Aleix Auqué**.
