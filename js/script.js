window.onload = function() {    
    
    //Define variables
    const buttonRightPoke = document.getElementById('pokemon_right');
    const buttonLeftPoke = document.getElementById('pokemon_left');
    const buttonCenterPoke = document.getElementById('pokemon_center');
    const buttonRightDigi = document.getElementById('digimon_right');
    const buttonLeftDigi = document.getElementById('digimon_left');
    const buttonCenterDigi = document.getElementById('digimon_center');
    let pokemonNumber = 1;
    let digimonNumber = 1;
    let isDisplayed = false;
    let isSelectedPoke = false;
    let isSelectedDigi = false;
    let pokemonName = null;
    let digimonName = null;
    
    //Pokedex
    $(document).click(function() {
        $(".main_title").animate({'margin': '1% 0', 'font-size': '4em'}, 800, function(){
            $(".dex").slideDown(1000);
        });
        $(".title").animate({'width': '80%'}, 800);
        $("#main-container").animate({'margin-top': '35px'}, 800);
    })

    //Center buttons
    buttonCenterPoke.addEventListener("click", function() {

        if(isSelectedPoke === false) {
            isSelectedPoke = true;
            document.getElementById('pokedex_img').style.backgroundColor = "#5BCB36";
            buttonCenterPoke.style.backgroundColor = "#5BCB36";
            for(i=0; i<5; i++){
                $('#pokedex_img').fadeTo(100, 0.1).fadeTo(100, 1); 
            }  

            
            pokemonName = document.getElementById("pokedex_name").innerHTML;
            displayLetsgo(isSelectedPoke, isSelectedDigi, pokemonName, digimonName);
            
        } else {
            isSelectedPoke = false;
            document.getElementById('pokedex_img').style.backgroundColor = "white";
            buttonCenterPoke.style.backgroundColor = "#FFCB05";

            pokemonName = null;
            displayLetsgo(isSelectedPoke, isSelectedDigi, pokemonName, digimonName);
        } 

    })

    buttonCenterDigi.addEventListener("click", function() {

        if(isSelectedDigi === false) {
            isSelectedDigi = true;
            document.getElementById('digidex_img').style.backgroundColor = "#5BCB36";
            buttonCenterDigi.style.backgroundColor = "#5BCB36";
            for(i=0; i<5; i++){
                $('#digidex_img').fadeTo(100, 0.1).fadeTo(100, 1); 
            } 

            digimonName = document.getElementById("digidex_name").innerHTML;
            displayLetsgo(isSelectedPoke, isSelectedDigi, pokemonName, digimonName); 
        } else {
            isSelectedDigi = false;
            document.getElementById('digidex_img').style.backgroundColor = "white";
            buttonCenterDigi.style.backgroundColor = "#FFCB05";

            digimonName = null;
            displayLetsgo(isSelectedPoke, isSelectedDigi, pokemonName, digimonName);
        } 

    })

    //Right buttons
    buttonRightPoke.addEventListener("click", function() {
        if(isSelectedPoke === false) {
            //Just the first gen, the best <3
            if(pokemonNumber < 151) { 
                pokemonNumber++;
                getPokemons(pokemonNumber);
            } else if (pokemonNumber === 151) {
                pokemonNumber = 1;
                getPokemons(pokemonNumber);
            }
        }
    })

    buttonRightDigi.addEventListener("click", function() {
        if(isSelectedDigi === false) {
            if(digimonNumber < 100) {
                digimonNumber++;
                getDigimons(digimonNumber);
            } else if (pokemonNumber === 100) {
                digimonNumber = 1;
                getDigimons(digimonNumber);
            }
        }
    })

    //Left buttons   
    buttonLeftPoke.addEventListener("click", function(){
        if(isSelectedPoke === false) {
            if(pokemonNumber > 1) {
                pokemonNumber--;
                getPokemons(pokemonNumber);
            } else if (pokemonNumber === 1) {
                pokemonNumber = 151;
                getPokemons(pokemonNumber);
            }
        }
    })

    buttonLeftDigi.addEventListener("click", function() {
        if(isSelectedDigi === false) {
            if(digimonNumber > 1) {
                digimonNumber--;
                getDigimons(digimonNumber);
            } else if (digimonNumber === 1) {
                digimonNumber = 100;
                getDigimons(digimonNumber);
            }
        }
    })

    //Infos button
    $("#infos").click(function(){
        if(isDisplayed === false) {

            isDisplayed = true;   
            $("#pokedex_details").fadeIn();

        } else{

            isDisplayed = false;
            $("#pokedex_details").fadeOut();
        }
    });
    
    //API
    getPokemons(pokemonNumber);
    getDigimons(digimonNumber);

}

// Functions

function displayLetsgo(isSelectedPoke, isSelectedDigi, pokemonName, digimonName) {

    if(isSelectedPoke && isSelectedDigi) {
        document.getElementById("letsgo").setAttribute("href", "fight.html?pokemon=" + pokemonName + "&digimon=" + digimonName + "");
        $("#letsgo").fadeIn();
    } else {
        $("#letsgo").fadeOut(1);
    }
}

// APIs

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
            pokedexImg.innerHTML = "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png' alt='" + newPokemonName + "' style='width: 80%'></img>";
            pokedexName.innerHTML = newPokemonName;

            const pokedexDetails = document.getElementById('pokedex_details');
            pokedexDetails.innerHTML =  "<p>Color : " + pokemonColor + "</p><p>Habitat : " + pokemonHabitat + "</p><p>Description : " + pokemonDescription + "</p>";

        }
    }
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNumber);
    xhr.send();

}

function getDigimons(digimonNumber) {

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {

            const digimon = JSON.parse(xhr.responseText);
            let digimonName = digimon[0].name;
            let digimonImg = digimon[0].img;

            const digidexImg = document.getElementById('digidex_img');
            const digidexName = document.getElementById('digidex_name');
            digidexImg.innerHTML = "<img src='" + digimonImg + "' alt='" + digimonName + "' style='width: 80%'>";
            digidexName.innerHTML = digimonName;

        }
    }
    xhr.open("GET", "https://digimon-api.herokuapp.com/api/digimon/id/" + digimonNumber);
    xhr.send();
}
