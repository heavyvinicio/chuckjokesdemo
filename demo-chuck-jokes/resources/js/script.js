$(document).ready(function() {
/*
Parte del codigo fue obtenido del sitio web:https://codepen.io/JustusFT/pen/ENLZGJ 
Autor: Justus Tumacder
*/
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

  /*
     * Functions
     */
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

  function arrangeCurrentPage(currentPage) {
    for (var i = 0; i < jokes[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001
        });
    }
    for (var i = 0; i < jokes[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001
        });
    }
  }

  function setText(i) {
    var j;
    for (j = 0; j < jokes[i].title.length; j++) {
      $(".soup-title")
        .last()
        .append('<span class="letter">' + jokes[i].title[j] + "</span>");
    }
    for (j = 0; j < jokes[i].desc.length; j++) {
      $(".soup-desc")
        .last()
        .append('<span class="letter">' + jokes[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers(currentPage) {
    for (var i = 0; i < jokes.length; i++) {
      // don't scramble currentPage
      if (currentPage === i) continue;
      var parts = [["title", ".soup-title"], ["desc", ".soup-desc"]];
      // apply to .title h1s and .desc ps
      var j = 0;
      for (; j < parts.length; j++) {
        for (var k = 0; k < jokes[i][parts[j][0]].length; k++) {
          // define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          // defining boundaries
          var offset = $(".position-data")
            .eq(currentPage)
            .offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top
          };
          var middleX =
            bounds.left +
            $(".position-data")
              .eq(currentPage)
              .width() /
              2;
          var middleY =
            bounds.top +
            $(".position-data")
              .eq(currentPage)
              .height() /
              2;
          // finally, apply all the scrambles
          if (j === undefined) {
            j = 0;
          }

          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter")
            .eq(k)
            .css({
              left: randLeft,
              top: randTop,
              color: "#DDD",
              zIndex: "initial"
            });
        }
      }
    }
  }
});

