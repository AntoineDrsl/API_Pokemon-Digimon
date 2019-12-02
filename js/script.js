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
            $(".container").animate({'margin-top': '10px'}, 1000, function(){
                $("#pokedex").slideDown();
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

    //Center button
    $("#button_center").click(function(){
        if(isDisplayed === false) {

            isDisplayed = true;
            $("#button_right, #button_left").fadeOut("slow");
            $("#pokedex_details").fadeIn();

        } else{

            isDisplayed = false;
            $("#button_right, #button_left").fadeIn(); 
            $('#pokedex_details').fadeOut();       
            
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
            let pokemonName = pokemon.name;        
            newPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            const pokemonImg = pokemon.sprites.front_default;
            
            const pokedexImg = document.getElementById('pokedex_img');
            const pokedexName = document.getElementById('pokedex_name');
            pokedexImg.innerHTML = "<img src='" + pokemonImg + "' alt='" + newPokemonName + "' style='width: 100%'></img>";
            pokedexName.innerHTML = newPokemonName;

        }
    }
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-form/" + pokemonNumber);
    xhr.send();

}