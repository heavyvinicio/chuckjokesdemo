
		var categorias = ["nerdy"];
		$.icndb.getRandomJokes({
			number: 10,
			limitTo: categorias,
			success: (response) => {
				
var i =1;
				response.forEach(element => {
					$("tbody")
						.append('<tr><td>' + i++ + '</td><td>' + element.joke + '</td></tr>');

				});

			}
		});
	
