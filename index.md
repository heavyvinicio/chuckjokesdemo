# The Chuck Jokes

## Introducción

Este repositorio mantiene dos ejemplos de uso de la libreria ICNDb.com, en donde proprociona una api de facil implementación desarrollada en lenguaje JavaScript con jQuery.

Ejemplo de uso del código de la api.
```sh
var categorias = ["nerdy"];
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

