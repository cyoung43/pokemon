/*
    Description of each position
    1st = Pokemon Name
    2nd = Type of Pokemon
    3rd = Image path for Pokemon
    4th = Attack Move Name
    5th = Attack Move Type
    6th = Attack Move Power
    7th = Defend Move Name
    8th = Defend Move Type
    9th = Defend Move Power
*/

let pokemonArray = [
    [
        "Bulbasaur",
        "Grass",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        "Tackle",
        "Normal",
        5,
        "Razor Leaf",
        "Grass",
        15
    ],
    [
        "Charmander",
        "Fire",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        "Scratch",
        "Normal",
        7,
        "Ember",
        "Fire",
        15
    ],
    [
        "Squirtle",
        "Water",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        "Scratch",
        "Normal",
        7,
        "Water Gun",
        "Water",
        15
    ],
    [
        "Pidgey",
         "Flying",
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
         "Tackle",
         "Normal",
         5,
         "Gust",
         "Flying",
         12
    ],
    [
        "Rattata",
        "Normal",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
        "Tackle",
        "Normal",
        5,
        "Bite",
        "Normal",
        15
    ],
    [
        "Spearow",
        "Flying",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
        "Tackle",
        "Normal",
        5,
        "Peck",
        "Flying",
        12
    ],
    [
        "Ekans",
        "Poison",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
        "Wrap",
        "Normal",
        5,
        "Poison Sting",
        "Poison",
        12
    ],
    [
        "Pikachu",
        "Electric",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        "Quick Attack",
        "Normal",
        8,
        "Thundershock",
        "Electric",
        15
    ],
   /* [
        "Trump",
        "Normal",

    ]*/
];

class Person {
    firstName;
    lastName;

    constructor (firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Trainer extends Person {
    type;
    party = [];
    currPokemon;
    currPokemonIndex = 0;
    wins = 0;
    losses = 0;

    constructor (firstName, lastName, type) {
        super (firstName, lastName);
        this.type = type;
    }

    addPokemonToParty(newPoke) {
        this.party.push(newPoke);
    }

    nextPokemon() {

        this.currPokemonIndex = this.currPokemonIndex + 1;

        if (this.currPokemonIndex == this.party.length) {
            this.currPokemon = null;
        }
    }

    clearParty() {
        this.party = [0];
        this.healthPower = 100;
        this.currPokemonIndex = 0;
        document.getElementById("btnRestart").style.display = "none";  
    }
}

class Pokemon {
    name;
    image;
    type;
    healthPower = 100;
    pokeLoad;
    pokeLoad2;
    move;

    constructor (name, image, type, move) {
        this.name = name;
        this.image = image;
        this.type = type;
        this.move = move;
    }

    //adjust healthPower
    pokeHP(healthPower) {
        this.pokeLoad.set(this.healthPower);
    }
}

var myPokeTrainer;
var oppPokeTrainer;
var myIndex = 0;
var oppIndex = 0;

function battle() {
    let oMyPokes;
    let oOppPokes;
    let myPokeNumber = 0;
    let oppPokeNumber = 0;

    myPokeTrainer = new Trainer(document.getElementById("firstName").value, document.getElementById("lastName").value, document.getElementById("trainerType").value);
    
    oppPokeTrainer = new Trainer("Team", "Rocket", "team_Rocket");

    for (var iCount = 0; iCount < 3; iCount++) {
        myPokeNumber = document.getElementById("party" + (iCount + 1)).value;
        oMyPokes = new Pokemon(pokemonArray[myPokeNumber][0], pokemonArray[myPokeNumber][2], pokemonArray[myPokeNumber][1], pokemonArray[myPokeNumber][3]);
        myPokeTrainer.addPokemonToParty(oMyPokes);

        oppPokeNumber = Math.floor(Math.random() * (pokemonArray.length + 1));
        oOppPokes = new Pokemon(pokemonArray[oppPokeNumber][0], pokemonArray[oppPokeNumber][2], pokemonArray[oppPokeNumber][1], pokemonArray[oppPokeNumber][3]);
        oppPokeTrainer.addPokemonToParty(oOppPokes);
    }

    //trainer names
    document.getElementById("myName").innerHTML = myPokeTrainer.firstName + " " + myPokeTrainer.lastName;
    document.getElementById("oppName").innerHTML = oppPokeTrainer.firstName + " " + oppPokeTrainer.lastName;
    //trainer images
    document.getElementById("mySprite").src = "images/" + myPokeTrainer.type + ".png";
    document.getElementById("oppSprite").src = "images/" + oppPokeTrainer.type + ".png";
    
    //pokemon names and images
    for (iCount = 0; iCount < 3; iCount++) {
        document.getElementById("myPokemonName" + (iCount + 1)).innerHTML = myPokeTrainer.party[iCount].name;
        document.getElementById("myPokemonImg" + (iCount + 1)).src = myPokeTrainer.party[iCount].image;
        //opponent
        document.getElementById("oppPokemonName" + (iCount + 1)).innerHTML = oppPokeTrainer.party[iCount].name;
        document.getElementById("oppPokemonImg" + (iCount + 1)).src = oppPokeTrainer.party[iCount].image;
    }

    //wins
    document.getElementById("myWins").innerHTML = myPokeTrainer.wins;
    document.getElementById("myLosses").innerHTML = myPokeTrainer.losses;
    document.getElementById("oppWins").innerHTML = oppPokeTrainer.wins;
    document.getElementById("oppLosses").innerHTML = oppPokeTrainer.losses;

    //HP bars
    for (iCount = 0; iCount < 3; iCount++) {
        document.getElementById("myPokemonHP" + (iCount + 1)).innerHTML = '<div class="ldBar" data-value="" id="myHP' + (iCount + 1) + '"></div>';
        document.getElementById("oppPokemonHP" + (iCount + 1)).innerHTML = '<div class="ldBar" data-value="" id="oppHP' + (iCount + 1) + '"></div>';
        
        //insert loading bar into pokemon class attribute
        myPokeTrainer.party[iCount].pokeLoad = new ldBar("#myHP" + (iCount + 1));
        myPokeTrainer.party[iCount].pokeLoad2 = document.getElementById('myHP' + (iCount + 1)).ldBar;
        myPokeTrainer.party[iCount].pokeHP();

        oppPokeTrainer.party[iCount].pokeLoad = new ldBar("#oppHP" + (iCount + 1));
        oppPokeTrainer.party[iCount].pokeLoad2 = document.getElementById('oppHP' + (iCount + 1)).ldBar;
        oppPokeTrainer.party[iCount].pokeHP();
    }


    //uncover hidden attack button
    document.getElementById("btnAttack").style.visibility = "visible";
}

function attack() {
    document.getElementById("myFainted").innerHTML = '';
    document.getElementById("oppFainted").innerHTML = '';

    myPokeTrainer.currPokemon = myPokeTrainer.party[myPokeTrainer.currPokemonIndex];

    oppPokeTrainer.currPokemon = oppPokeTrainer.party[oppPokeTrainer.currPokemonIndex];

    if (myPokeTrainer.currPokemon != null && oppPokeTrainer.currPokemon != null) {
        calculateEffect();
    }

    if (myPokeTrainer.currPokemon.healthPower > 0 && oppPokeTrainer.currPokemon.healthPower <= 0) {
        document.getElementById("oppFainted").innerHTML = oppPokeTrainer.currPokemon.name + " fainted...";
        oppPokeTrainer.nextPokemon();
    }
    else if (myPokeTrainer.currPokemon.healthPower <= 0 && oppPokeTrainer.currPokemon.healthPower > 0) {
        document.getElementById("myFainted").innerHTML = myPokeTrainer.currPokemon.name + " fainted...";
        myPokeTrainer.nextPokemon();
    }
    else if (myPokeTrainer.currPokemon.healthPower <= 0 && oppPokeTrainer.currPokemon.healthPower <= 0) {
        document.getElementById("myFainted").innerHTML = myPokeTrainer.currPokemon.name + " fainted...";
        document.getElementById("oppFainted").innerHTML = oppPokeTrainer.currPokemon.name + " fainted...";
        myPokeTrainer.nextPokemon();
        oppPokeTrainer.nextPokemon();
    }
    
    if (myPokeTrainer.currPokemon == null) {
        document.getElementById("overallDisplayText").innerHTML = oppPokeTrainer.firstName + " " + oppPokeTrainer.lastName + " wins!";
        myPokeTrainer.losses += 1;
        oppPokeTrainer.wins += 1;
        document.getElementById("myLosses").innerHTML = myPokeTrainer.losses;
        document.getElementById("oppWins").innerHTML = oppPokeTrainer.wins;
        document.getElementById("btnAttack").style.visibility = "hidden";
        document.getElementById("btnRestart").style.visibility = "visible";
    }

    else if (oppPokeTrainer.currPokemon == null) {
        document.getElementById("overallDisplayText").innerHTML = myPokeTrainer.firstName + " " + myPokeTrainer.lastName + " wins!";
        oppPokeTrainer.losses += 1;
        myPokeTrainer.wins += 1;
        document.getElementById("oppLosses").innerHTML = oppPokeTrainer.losses;
        document.getElementById("myWins").innerHTML = myPokeTrainer.wins;
        document.getElementById("btnAttack").style.visibility = "hidden";
        document.getElementById("btnRestart").style.visibility = "visible";
    }

}

function calculateEffect() {
    var myDamage = 10;
    var oppDamage = 10;
    var myTotalEffect = 0;
    var oppTotalEffect = 0;
    var myTypeEffect;
    var myMultiplier;
    var myEffectLevel = "";
    var oppMultiplier;
    var oppTypeEffect;
    var oppEffectLevel;

    document.getElementById("myMove").innerHTML = ''
    document.getElementById("oppMove").innerHTML = ''
    document.getElementById("myEffectiveness").innerHTML = ''
    document.getElementById("oppEffectiveness").innerHTML = ''
    document.getElementById("myExtra").innerHTML = ''
    document.getElementById("oppExtra").innerHTML = ''

    //calculate pokemon type effect
    if (myPokeTrainer.currPokemon.type == oppPokeTrainer.currPokemon.type) {
        myTypeEffect = 0.5;
        oppTypeEffect = 0.5;
    }
    else if (myPokeTrainer.currPokemon.type == "Fire" && oppPokeTrainer.currPokemon.type == "Water") {
        myTypeEffect = 0.5
        oppTypeEffect = 1.5;
    }
    else if (myPokeTrainer.currPokemon.type == "Fire" && oppPokeTrainer.currPokemon.type == "Grass") {
        myTypeEffect = 1.5;
        oppTypeEffect = 0.5;
    }
    else if (myPokeTrainer.currPokemon.type == "Water" && oppPokeTrainer.currPokemon.type == "Fire") {
        myTypeEffect = 1.5;
        oppTypeEffect = 0.5;
    }
    else if (myPokeTrainer.currPokemon.type == "Water" && oppPokeTrainer.currPokemon.type == "Grass") {
        myTypeEffect = 0.5;
        oppTypeEffect = 1.5
    }
    else if (myPokeTrainer.currPokemon.type == "Grass" && oppPokeTrainer.currPokemon.type == "Fire") {
        myTypeEffect = 0.5;
        oppTypeEffect = 1.5
    }
    else if (myPokeTrainer.currPokemon.type == "Grass" && oppPokeTrainer.currPokemon.type == "Water") {
        myTypeEffect = 1.5;
        oppTypeEffect = 0.5;
    }
    else {
        myTypeEffect = 1;
        oppTypeEffect = 1;
    }
    //dynamically update effectiveness
    if (myTypeEffect == 1.5) {
        myEffectLevel = "It was super effective!";
        oppEffectLevel = "Not very effective";
    }
    else if (myTypeEffect == 0.5) {
        myEffectLevel = "Not very effective.";
        oppEffectLevel = "It was super effective";
    }
    else {
        myEffectLevel = "Effective.";
        oppEffectLevel = "Effective";
    }

    document.getElementById("myMove").innerHTML = myPokeTrainer.currPokemon.move
    document.getElementById("oppMove").innerHTML = oppPokeTrainer.currPokemon.move
    document.getElementById("myEffectiveness").innerHTML = myEffectLevel;
    document.getElementById("oppEffectiveness").innerHTML = oppEffectLevel;

    myMultiplier = Math.random();
    oppMultiplier = Math.random();

    if (myMultiplier >= 0.9) {
        document.getElementById("myExtra").innerHTML = "Critical Hit!";
    }
    else if  (myMultiplier <= .1) {
        document.getElementById("myExtra").innerHTML = "But it missed...";
        document.getElementById("myEffectiveness").innerHTML = "";
    }

    if (oppMultiplier >= 0.9) {
        document.getElementById("oppExtra").innerHTML = "Critical Hit!";
    }
    else if  (oppMultiplier <= .1) {
        document.getElementById("oppExtra").innerHTML = "But it missed...";
        document.getElementById("oppEffectiveness").innerHTML = "";
    }

    myTotalEffect = myDamage * myTypeEffect * myMultiplier;
    oppTotalEffect = oppDamage * oppTypeEffect * oppMultiplier;

    myTotalEffect = Math.ceil(myTotalEffect);
    oppTotalEffect = Math.ceil(oppTotalEffect);

    myPokeTrainer.currPokemon.healthPower -= oppTotalEffect;
    oppPokeTrainer.currPokemon.healthPower -= myTotalEffect;
    
    myPokeTrainer.currPokemon.pokeHP(myPokeTrainer.currPokemon.healthPower);
    oppPokeTrainer.currPokemon.pokeHP(oppPokeTrainer.currPokemon.healthPower);
}

function restart() {
    myPokeTrainer.clearParty();
    oppPokeTrainer.clearParty();
}

