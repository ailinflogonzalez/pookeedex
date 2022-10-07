const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click', insertPokemon);
buttonClear.addEventListener('click', deletePokemons);


async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    const pokemonDataJSON = await res.json()

    const allItems = [];
    const result = [];
    for (let pokemonInfo in pokemonDataJSON) {
      result.push([pokemonInfo, pokemonDataJSON[pokemonInfo]]);
    }

    console.table(result);

    //Imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default;

    //Nombre e ID
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Nombre: ${result[10][1]} - ID: ${result[6][1]}`;


    //Tipo
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`;

    //Altura
    const altura = document.createElement('p');
    altura.innerText = `Altura: ${result[4][1]}`;
    altura.classList.add('pokemonStats');

    //Peso
    const peso = document.createElement('p');
    peso.innerText = `Peso:  ${result[17][1]}`;
    peso.classList.add('pokemonStats');

    //Detalle
    const stats = document.createElement('div');
    stats.append(altura, peso);
    stats.classList.add('pokemonStatsContainer');

    //Container
    const container = document.createElement('div');
    container.append(pokemonImage, pokemonName, pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("Perdón bro, pero ese pokemon no existe u.u");
  }
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}



