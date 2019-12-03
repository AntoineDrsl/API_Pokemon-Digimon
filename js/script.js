window.onload = function() {    

    //Define variables
    const buttonRight = document.getElementById('button_right');
    const buttonLeft = document.getElementById('button_left');
    const buttonCenter = document.getElementById('button_center');
    let pokemonNumber = 1;
    let isDisplayed = false;
    
    //Pokedex
    $("#pokemon_img").click(function() {
        $("#main_title").animate({'margin': '1% 0'}, 1000, function(){
            $(".container").animate({'margin-top': '30px', 'padding': '1%'}, 1000, function(){
                $("#pokemon_img").animate({'width': '80%'}, 1000, function() {
                    $("#pokedex").slideDown(1000);
                });
            });
        });
        
    })

    //Right button
    buttonRight.addEventListener("click", function() {
        //Jusqu'à la 4ème génération faut pas pousser
        if(pokemonNumber < 493) { 
            pokemonNumber++;
            getPokemons(pokemonNumber);
        } else if (pokemonNumber === 493) {
            pokemonNumber = 1;
            getPokemons(pokemonNumber);
        }
    })

    //Left button
    buttonLeft.addEventListener("click", function(){
        if(pokemonNumber > 1) {
            pokemonNumber--;
            getPokemons(pokemonNumber);
        } else if (pokemonNumber === 1) {
            pokemonNumber = 493;
            getPokemons(pokemonNumber);
        }
    })

    //Infos button
    $("#infos").click(function(){
        if(isDisplayed === false) {

            isDisplayed = true;
            $("#pokedex_main").animate({'width': '50%'}, 1000, function() {  
                $("#pokedex_details").fadeIn();
            });

        } else{

            isDisplayed = false;
            $("#pokedex_details").fadeOut(400, function() {
                $("#pokedex_main").animate({'width': '60%'}, 1000);
            });
        }
    });
    
    //API
    getPokemons(pokemonNumber);

}

function getPokemons(pokemonNumber) {

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {

            const pokemon = JSON.parse(xhr.responseText);
            let pokemonName = pokemon.names[2].name;        
            newPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            const pokemonColor = pokemon.color.name;
            const pokemonHabitat = pokemon.habitat != null ? pokemon.habitat.name : "unknown";
            const pokemonDescription = pokemon.flavor_text_entries[1].flavor_text;
            
            const pokedexImg = document.getElementById('pokedex_img');
            const pokedexName = document.getElementById('pokedex_name');
            pokedexImg.innerHTML = "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png' alt='" + newPokemonName + "' style='width: 100%'></img>";
            pokedexName.innerHTML = newPokemonName;

            const pokedexDetails = document.getElementById('pokedex_details');
            pokedexDetails.innerHTML =  "<p>Color : " + pokemonColor + "</p><p>Habitat : " + pokemonHabitat + "</p><p>Description : " + pokemonDescription + "</p>";

        }
    }
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNumber);
    xhr.send();

}