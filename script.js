// Object of characters
var Chrono = {
    name: "Chrono",
    image: "https://imgur.com/xlXE6od.png",
    age: 17,
    weapons: "Katana",
    element: "Light"
};
var Marle = {
    name: "Marle",
    image: "https://imgur.com/bn824gM.png",
    age: 17,
    weapons: "CrossBow",
    elemeent: "Ice"
};
var Lucca = {
    name: "Lucca",
    image: "https://imgur.com/DjIPRtC.png",
    age: 17,
    weapons: ["Gun", "Hammer"],
    element: "Fire"
};
var Frog = {
    name: "Frog",
    image: "https://imgur.com/k8ui7v2.png",
    age: 17,
    weapons: "Sword",
    element: "Water"
};
var Robo = {
    name: "Robo",
    image: "https://imgur.com/HxpU23N.png",
    age: 17,
    weapons: "Mechanical Arm",
    element: ""
};
var Ayla = {
    name: "Ayla",
    image: "https://imgur.com/gnBUBdu.png",
    age: 17,
    weapons: "Fists",
    element: ""
};
var Magus = {
    name: "Magus",
    image: "https://imgur.com/i0GtStE.png",
    age: 17,
    weapons: "Scythe",
    element: "Shadow"
};

var chars = [];
var nomeAventureiro;
var championSelected;
chars.push(Chrono, Marle, Lucca, Frog, Robo, Ayla, Magus);

function jogar() {
    nomeAventureiro = document.getElementById('nameTag').value;
    if (nomeAventureiro == "" || nomeAventureiro == null) {
        var warning = document.getElementById('warning');
        warning.style.animation = "1s warning infinite";
    } else {
        var login = document.getElementById('loginJogador');
        var talkPlay = document.getElementById('talkWihtPlayer').innerHTML = "<h1 id='escolha'>Escolha seu personagem, " + nomeAventureiro + "</h1>"
        login.style.transition = "1s";
        login.style.opacity = "0";
        login.style.marginTop = "-35%";
        setTimeout(function() { login.style.display = "none"; }, 1000);
    }

    return nomeAventureiro;
}

function setCaracter(chars) {
    var imgCaracter = document.getElementById('boxCaracter');
    imgCaracter.style.backgroundImage = "url(" + chars.image + ")";
    championSelected = chars;
}

function next() {

    if (championSelected == undefined) {
        var escolha = document.getElementById('escolha');
        escolha.style.animation = "1s warning infinite";
    } else {
        //     Effects and others infos

        var champ = document.getElementById('boxCaracter');
        champ.backgroundPosition = "34% 0%";
        var p = document.getElementById('AventuraBegin');
        p.style.fontSize = "28px";
        p.innerHTML = "OK, você escolheu " + championSelected.name + " ! Boa sorte";
        var transition = document.getElementById('transition');
        transition.style.display = "flex";
        transition.style.animation = "5s scaleTransition";

        setTimeout(function() { hideAll() }, 5000);
        setTimeout(function() { dialog() }, 3000);
    }
}

function hideAll() {
    var transition = document.getElementById('transition');
    var loginJogad = document.getElementById('loginJogador');
    var selectChamp = document.getElementById('selectChamp');

    transition.style.display = "none";
    loginJogad.style.display = "none";
    selectChamp.style.display = "none";
}

function dialog() {
    var dialog = document.getElementById('textDialog');
    dialog.innerHTML = "Rápido, " + nomeAventureiro + " estamos com problemas no jardim do castelo, detenha os monstros";
    var containerFight = document.getElementById('fight');
    containerFight.style.display = "flex";
    var heroCase = document.getElementById('heroCaseImg');
    heroCase.style.backgroundImage = "url(" + championSelected.image + ")";
}

var enemyLife = 60;
var heroLife = 60;

function startFight() {
    var maudio = document.getElementById('myAudio');
    maudio.volume = 0.2;
    maudio.play();

    var dialog = document.getElementById('textDialog');
    dialog.innerHTML = "Rápido, " + nomeAventureiro + " o que faremos?";

    var actions = document.getElementById('actions');
    actions.innerHTML = "<button onclick='attack()'>Atacar</button> <button onclick='heal()'>Curar</button";

    var enemyHP = document.getElementById('hpInimigo');
    enemyHP.innerHTML = "C4T-SING " + enemyLife + "/60";

    var heroHP = document.getElementById('hpAliado');
    heroHP.innerHTML = "" + championSelected.name + " " + heroLife + "/60";
}

function attack() {

    var caracter = document.getElementById('heroCaseImg');
    caracter.style.animation = "0.5s heroDash ";

    var enemy = document.getElementById('enemyImg');
    enemy.style.animation = "0.5s enemyDamage";

    setTimeout(function() { caracter.style.animation = null; }, 1000);
    setTimeout(function() { enemy.style.animation = null; }, 1000);

    var damage = parseInt(Math.random() * 10);

    enemyLife -= damage;

    var enemyHP = document.getElementById('hpInimigo');
    enemyHP.innerHTML = "C4T-SING " + enemyLife + "/60";

    var contTextDialog = document.getElementById('contTextDialog');
    contTextDialog.style.display = "none";

    if (enemyLife > 0) {
        setTimeout(function() { enemyAttack(); }, 3000);
        setTimeout(function() { contTextDialog.style.display = "block"; }, 3100);
    } else {
        enemy.style.opacity = "0";
        setTimeout(function() { contTextDialog.style.display = "block"; }, 1000);
        winner();
    }


}

function enemyAttack() {
    var damage = parseInt(Math.random() * 10);

    var caracter = document.getElementById('heroCaseImg');
    caracter.style.animation = "0.5s heroDamage ";

    var enemy = document.getElementById('enemyImg');
    enemy.style.animation = "0.5s enemyDash";

    setTimeout(function() { caracter.style.animation = null; }, 1000);
    setTimeout(function() { enemy.style.animation = null; }, 1000);

    heroLife -= damage;

    var heroHP = document.getElementById('hpAliado');
    heroHP.innerHTML = "" + championSelected.name + " " + heroLife + "/60";

    if (heroLife <= 0) {

        var contTextDialog = document.getElementById('contTextDialog');
        contTextDialog.style.opacity = "0";

        var maudio = document.getElementById('myAudio');
        maudio.pause();
        setTimeout(function() { loser() }, 2000);
    }

}

function heal() {
    var heal = parseInt(Math.random() * 15);
    heal += 5;

    if (heroLife + heal > 60) {
        console.log('Não pode mais curar');
    } else {
        heroLife += heal;
        var heroHP = document.getElementById('hpAliado');
        heroHP.innerHTML = "" + championSelected.name + " " + heroLife + "/60";
    }

    enemyAttack();
}

function congrats() {
    var teste = document.getElementById('congrats');
    teste.style.zIndex = "99999";
    teste.style.animation = "recept 5s";
}

function winner() {
    var maudio = document.getElementById('myAudio');
    maudio.pause();
    var winnerAudio = document.getElementById('myAudioWinner');
    winnerAudio.volume = 0.2;
    winnerAudio.play();
    console.log('cHAMOU FUNÇÃO')

    var dialog = document.getElementById('textDialog');
    dialog.innerHTML = "Conseguimos! você lutou corajosamente " + nomeAventureiro + ", a princesa ficará feliz em te receber!";

    var actions = document.getElementById('actions');
    actions.innerHTML = '<button onclick="congrats()"> Vamos lá </button>';
}

function loser() {
    var maudio = document.getElementById('myAudioLoser');
    maudio.volume = 0.2;
    maudio.play();
    var lose = document.getElementById('lose');
    lose.style.zIndex = "99999";
    lose.style.animation = "recept 5s";
}