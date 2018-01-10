# Ejemplo de animación con CSS y jQuery

En este ejemplo se usara el código generado por el Justus Tumacder en un ejemplo realizado en CodePen denominado [Alphabet Soup](https://codepen.io/JustusFT/pen/ENLZGJ).

La idea es muy simple y es seccionar las letras de la chiste que nos devuleve el servicio y colcoarla mediante animación en lugares randomicos de la página.

## Implementación

- Generamos una página html que contenga el sigueinte código:
```html
<div id="loader"></div>
  <div id="soup-container">
    <div id="segments">
    </div>
    <div id="soup-nav">
      <span id="soup-prev"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></span>
      <span id="soup-next"><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
    </div>
</div>
```
- Añadimos las hojas de estilos
- Añadimos los scripts

El corazón del ejemplo es este segmento de script:
```js
var jokes = [];

  var categorias = ["nerdy"];
  $.icndb.getRandomJokes({
    number: 10,
    limitTo: categorias,
    success: response => {
      response.forEach(element => {
        var obj = {
          title: "The Chuck Jokes",
          desc: element.joke
        };
        jokes.push(obj);
      });
      startProcess(jokes);
    }
  });
  ```
  En donde se recupera los chistes y posteriormente se los agrupa en un array para poder procesarlos mediante el sigueinte funcion:
   ```js
   function startProcess(jokes) {
    var currentPage = 0;
    // generate content
    for (var i = 0; i < jokes.length; i++) {
      // split content letters to array
      for (var obj in jokes[i]) {
        // if string
        if (typeof jokes[i][obj] === "string") {
          jokes[i][obj] = jokes[i][obj].split("");
          continue;
        } else if (typeof jokes[i][obj] === "object") {
          // if array (grouped text)
          var toPush = [];
          for (var j = 0; j < jokes[i][obj].length; j++) {
            for (var k = 0; k < jokes[i][obj][j].length; k++) {
              toPush.push(jokes[i][obj][j][k]);
            }
          }
          jokes[i][obj] = toPush;
        }
      }
      // set text to
      $("#segments").append(
        '<div class="letters-wrap mutable"><div class="soup-title"></div><div class="soup-desc"></div></div>'
      );
      setText(i);
      // clone to data
      $("#segments").append(
        '<div class="letters-wrap position-data"><div class="soup-title"></div><div class="soup-desc"></div></div>'
      );
      setText(i);
    }
    // initial arrangement
    arrangeCurrentPage(currentPage);
    scrambleOthers(currentPage);
    /*
         * Event handlers
         */
    $(window).resize(function() {
      arrangeCurrentPage(currentPage);
      scrambleOthers(currentPage);
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function() {
      $("#soup-next").show();
      currentPage--;
      if (currentPage === 0) {
        $("#soup-prev").hide();
      }
      arrangeCurrentPage(currentPage);
      scrambleOthers(currentPage);
    });

    $("#soup-next").click(function() {
      $("#soup-prev").show();
      currentPage++;
      if (currentPage === jokes.length - 1) {
        $("#soup-next").hide();
      }
      arrangeCurrentPage(currentPage);
      scrambleOthers(currentPage);
    });
  }
  ```
  
  Como resultado de este procesamiento, se visualizan una página moderna animada que funciona de la siguiente manera:
  - Se recupera la lista de chistes del repositorio ICNDb.
  - Se procesa cada chiste y se coloca cada letra de cada chiste en un ana posicion de un array
  - Se obtiene las dimensiones de la pantalla: width y height
  - En base a esas medidas se ejecuta una funcion para generar posiciones randomicas para cada letra de cada posción del array de cada chiste de Chuck
  - Finalmente, se muestra la sopa de letras que se mueven de una manera fluida.
  
  
El ejemplo completo funcionado lo pueden encontrar [CodePen](https://codepen.io/heavyvinicio/pen/YYrYrg).

## [<< Regresar a la página principal](index.md)
