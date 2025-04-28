const pokemonList = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore');
const limit = 20;
let offset = 0;

let todosOsPokemons = []; 

function convertPokemonToLI(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.pokemonNumber}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>
    `;
}

function loadPokemonItens(offset, limit) { 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Armazenando os pokémons carregados na variável global
        todosOsPokemons = [...todosOsPokemons, ...pokemons];
        pokemonList.innerHTML += pokemons.map(convertPokemonToLI).join('');
    });   
}

loadPokemonItens(offset, limit);

loadMore.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});

function configurarBusca() {
    const campoPesquisa = document.getElementById('searchInput');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.trim().toLowerCase();

        if (termo === "") {
            pokemonList.innerHTML = todosOsPokemons.map(convertPokemonToLI).join('');
        } else {
            const itensFiltrados = todosOsPokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(termo)
            );

            if (itensFiltrados.length > 0) {
                pokemonList.innerHTML = itensFiltrados.map(convertPokemonToLI).join('');
            } else {
                pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${termo}` })
                    .then(pokemon => {
                        todosOsPokemons.push(pokemon);
                        pokemonList.innerHTML = todosOsPokemons.map(convertPokemonToLI).join('');
                    })
                    .catch(error => {
                        console.log(`Pokémon não encontrado: ${termo}`, error);
                    });
            }
        }
    });
}

// Configurar a busca
configurarBusca();
