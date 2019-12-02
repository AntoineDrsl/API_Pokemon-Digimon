function getPokemons(pokemonNumber) {

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {

            const pokemon = JSON.parse(xhr.responseText);
            const pokemonName = pokemon.name;
            const pokemonImg = pokemon.sprites.front_default;
            
            const pokedexImg = document.getElementById('pokedex_img');
            pokedexImg.innerHTML = "<img src='" + pokemonImg + "' alt='" + pokemonName + "' style='width: 100%'></img>"

        }
    }
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-form/" + pokemonNumber);
    xhr.send();

}

window.onload = function() {    

    const buttonRight = document.getElementById('button_right');
    const buttonLeft = document.getElementById('button_left');
    let pokemonNumber = 1;
    
    buttonRight.addEventListener("click", function() {
        pokemonNumber++;
        getPokemons(pokemonNumber);
    })

    buttonLeft.addEventListener("click", function(){
        pokemonNumber--;
        getPokemons(pokemonNumber);
    })

    getPokemons(pokemonNumber);

}

