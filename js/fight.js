window.onload = function() {

    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search);

    const pokemon = searchParams.get("pokemon");
    const digimon = searchParams.get("digimon");

    fight(pokemon, digimon);

}

// Functions

function randomVerb() {

    const verbs = ['love', 'charge', 'avoid', 'dodge', 'miss', 'stone', 'break', 'attack', 'annoy', 'bother', 'scare', 'amuse', 'irritate'];
    const randomNumber = Math.floor(Math.random() * Math.floor(12));
    const randomVerb = verbs[randomNumber];

    return randomVerb;
}

function randomSubject(pokemon, digimon) {

    const randomNumber = Math.floor(Math.random() * Math.floor(2));

    if(randomNumber === 1) {
        const subjects = [pokemon, digimon];
        return subjects;
    } else {
        const subjects = [digimon, pokemon];
        return subjects;
    }
    
}

function isPassive() {

    const randomNumber = Math.floor(Math.random() * Math.floor(2));

    if(randomNumber === 1) {
        return "&passive=passive";
    } else {
        return "";
    }
}

//API

function fight(pokemon, digimon) {

    for(i=1; i<4; i++) {
        const subjects = randomSubject(pokemon, digimon);
        const subject1 = subjects[0];
        const subject2 = subjects[1];
        const replace = document.getElementById("sentence_" + i);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {

                const response = JSON.parse(xhr.responseText);
                const sentence = response.sentence;
                replace.innerHTML = sentence;

            }
        }
        xhr.open("GET", "https://lt-nlgservice.herokuapp.com/rest/english/realise?subject=" + subject1 + "&subjdet=-&verb=" + randomVerb() + "&object=" + subject2 + "&objdet=-" + isPassive());
        xhr.send();
    }

    const winner = randomSubject(pokemon, digimon);
    const xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if(xhr2.readyState === 4) {

            const response = JSON.parse(xhr2.responseText);
            const sentence = response.sentence;
            
            document.getElementById("final_sentence").innerHTML = sentence;

        }
    }
    xhr2.open("GET", "https://lt-nlgservice.herokuapp.com/rest/english/realise?subject=" + winner[1] + "&subjdet=-&verb=win&object=fight&objdet=the");
    xhr2.send();

}