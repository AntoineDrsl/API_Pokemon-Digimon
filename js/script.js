window.onload = function() {    

    const buttonRight = document.getElementById('button_right');
    const buttonLeft = document.getElementById('button_left');
    const buttonCenter = document.getElementById('button_center');
    let pokemonNumber = 1;
    
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

    buttonLeft.addEventListener("click", function(){
        if(pokemonNumber > 1) {
            pokemonNumber--;
            getPokemons(pokemonNumber);
        } else if (pokemonNumber === 1) {
            pokemonNumber = 493;
            getPokemons(pokemonNumber);
        }
    })

    buttonCenter.addEventListener("click", function(){
        requestAnimationFrame(displayDetails, 3000);
    })

    

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

function displayDetails() {
    const details = document.getElementById('pokedex_details');
    details.style.display = "block";
}

