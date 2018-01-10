# Ejemplo de uso del api ICNDb con el framework Skeleton

Skeleton es un framework que permite gestionar elementos css de una manera fácil y rápida.
Entre sus principales características se podría resaltar las siguientes:
- Tiene un tamaño menor a 8 Kb por lo que lo hace un framework muy ligero
- Tiene una grilla de 12 columnas para gestionar dispositivos móviles
- Soporte para CSS3

## Uso del framework
Importan la librarías necesarias
- Hojas de estilos
```css
<link href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css" rel="stylesheet" />
```
- Scripts
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-skeleton/3.6.3/skeleton.js"></script>
<script src="https://cdn.rawgit.com/heavyvinicio/chuckjokesdemo/master/jquery.icndb.final.js"></script>
```
Para visualizar los resultados podemos agregar el sigueitne contenido html
```html
<div align="center">
<h1>The Chuck Jokes</h1>
<br>
<img src="https://raw.githubusercontent.com/heavyvinicio/chuckjokesdemo/master/demo-chuck-jokes/resources/img/chuck.jpg" alt="chuck"  height="300px"></img>
</div>
<table class="u-full-width" style="margin: 10px 10px;padding: 10px 10px;">
  <thead>
    <tr>
      <th>No.</th>
      <th>Jokes</th>
     </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>
```

Para finalizar añadimos el código jQuery que nos permitirá leer los chistes generados por el servidor que invoca el api.

```js
 var categorias = ["nerdy"];
  $.icndb.getRandomJokes({
    number: 10,
    limitTo: categorias,
    success: response => {
      var i = 1;
      response.forEach(element => {
        $("tbody").append(
          "<tr><td>" + i++ + "</td><td>" + element.joke + "</td></tr>"
        );
      });
    }
  });
```
El ejemplo completo funcionado lo pueden encontrar [CodePen](https://codepen.io/heavyvinicio/pen/dJdrqG).

## [<< Regresar a la página principal](index.md)
