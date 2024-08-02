/* Juego de RPG interactivo por consola.
Sistema de clases
Enemigos aleatorios
Historial de batallas
*/

/* Requisitos:
El trabajo debe incluir variables, condicionales, ciclos, funciones, objetos, arrays y métodos de arrays.
*/

// Información general del juego
const gameInfo = "Juego de RPG interactivo.\nGana 3 batallas para liberar a la aldea del peligro!";
alert(gameInfo);
console.log(gameInfo);

// Historia
const plot = {
    partOne: "Monstruos del cementerio han revivido!\nLa aldea corre peligro de ser atacada!",
    partTwo: "Quieres ir allí para defender tu pueblo.\nPero primero necesitas enlistarte como héroe.",
};
alert(plot.partOne);
console.log(plot.partOne);
alert(plot.partTwo);
console.log(plot.partTwo);

// Objeto que representa al jugador y la información de su personaje
let player = {
    name: '',
    class: '',
    health: 0,
    weapon: '',
    attack: 0,
};

// Array de objetos que contienen los distintos enemigos del juego
let enemy = [
    {
        type: 'goblin',
        name: 'Goblin',
        health: 25,
        damage: 10,
    },
    {
        type: 'orc',
        name: 'Orco',
        health: 50,
        damage: 15,
    },
    {
        type: 'troll',
        name: 'Troll',
        health: 75,
        damage: 20,
    },
];

// Función para crear el personaje
function getCharacter() {
    while (!player.name) {
        player.name = prompt("¿Cuál es tu nombre, héroe?");
        if (!player.name) {
            alert("Dadas las circunstancias, tienes que inscribirte para salir de la aldea.\n...Hay posibilidades de que no vuelvas...\n\nDime tu nombre.")
        }
    }

    player.class = prompt(`¿Cuál es tu clase, ${player.name}?\n1: Guerrero\n2: Mago\n3: Arquero`);

    switch (player.class) {
        case '1':
        case 'Guerrero':
        case 'guerrero':
            player.class = "Guerrero";
            player.health = 150;
            player.weapon = "Espada de Plata";
            player.attack = 20;
            if (!confirm(`Clase: ${player.class}\nSalud: ${player.health}\nArma: ${player.weapon}\nDaño: ${player.attack}\n\n¿Quieres continuar como ${player.class}, ${player.name}?`)) {
                getCharacter();
            }
            break;
        case '2':
        case 'Mago':
        case 'mago':
            player.class = "Mago";
            player.health = 100;
            player.weapon = "Libro Arcano";
            player.attack = 30;
            if (!confirm(`Clase: ${player.class}\nSalud: ${player.health}\nArma: ${player.weapon}\nDaño: ${player.attack}\n\n¿Quieres continuar como ${player.class}, ${player.name}?`)) {
                getCharacter();
            }
            break;
        case '3':
        case 'Arquero':
        case 'arquero':
            player.class = "Arquero";
            player.health = 125;
            player.weapon = "Arco de Ébano";
            player.attack = 25;
            if (!confirm(`Clase: ${player.class}\nSalud: ${player.health}\nArma: ${player.weapon}\nDaño: ${player.attack}\n\n¿Quieres continuar como ${player.class}, ${player.name}?`)) {
                getCharacter();
            }
            break;
        default:
            alert(`Dime qué eres, ${player.name}.\nDebes seleccionar una clase.`);
            getCharacter();
            break;
    }

    const characterInfo = `Ficha del personaje\nHéroe: ${player.name}\nClase: ${player.class}\nArma: ${player.weapon} / (${player.attack} puntos de daño)`;
    console.log(characterInfo);

    const plotInfo = `Debes eliminar los 3 enemigos restantes que rodean la aldea.\nQue la suerte te acompañe, ${player.name}.`;
    alert(plotInfo);
    console.log(plotInfo);

}

let battleCounter = 0;

function battle() {
    while (battleCounter < 3 && player.health > 0) {
        let enemyIndex = Math.floor(Math.random() * enemy.length);
        let currentEnemy = enemy[enemyIndex];

        alert(`Enfrentamiento: ${battleCounter + 1}\n\nEstás a punto de enfrentarte a un ${currentEnemy.name}.\nSalud: ${currentEnemy.health}\nDaño: ${currentEnemy.damage}`);

        while (player.health > 0 && currentEnemy.health > 0) {
            currentEnemy.health -= player.attack;

            alert(`Atacas al ${currentEnemy.name}, haciéndole ${player.attack} puntos de daño.\nLe quedan ${currentEnemy.health} puntos de vida al ${currentEnemy.name}.\n\nTe quedan ${player.health} puntos de salud.`);

            if (currentEnemy.health > 0) {
                player.health -= currentEnemy.damage;

                alert(`El ${currentEnemy.name} te ataca, haciéndote ${currentEnemy.damage} puntos de daño.\nTe quedan ${player.health} puntos de vida.`);
            }

            if (player.health <= 0) {
                alert(`Has perdido, ${player.name}.`);
                if (confirm(`¿Quieres reiniciar el juego, ${player.name}?`)) {
                    location.reload();
                } else {
                    return;
                }
            }
        }

        let winBattle = `¡Has ganado la pelea contra el ${currentEnemy.name}!`;

        if (player.health > 0 && currentEnemy.health <= 0) {
            alert(winBattle);
            console.log(winBattle);
        }

        battleCounter++;

        if (battleCounter === 3) {
            alert(`¡Felicidades, ${player.name}! Has ganado las 3 batallas y liberado a la aldea del peligro.`);
            console.log(`¡Felicidades, ${player.name}! Has ganado las 3 batallas y liberado a la aldea del peligro.`);
            if (confirm("¿Quieres jugar de nuevo?")) {
                location.reload();
            } else {
                return;
            }
        }
    }
}

getCharacter();
battle();