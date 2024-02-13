const list = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");

const limit = 10;
const firstGeneration = 15;
let offset = 0;

function convertPokemon(pokemon) {
    const { name, order, type, types, image } = pokemon;

    return `
        <li class="pokemon ${type}">
            <span class="number">${
                "#" + order.toString().padStart(3, "0")
            }</span>
            <span class="name">${name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                </ol>
                <img src="${image}" alt="${name}">
            </div>
        </li>
    `;
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((results = []) => {
        const pokemonsHTML = results
            .map((pokemon) => convertPokemon(pokemon))
            .join("");
        list.innerHTML += pokemonsHTML;
    });
}

loadMore.addEventListener("click", () => {
    offset += limit;
    const pokemonsNextPage = offset + limit;

    if (pokemonsNextPage >= firstGeneration) {
        const newLimit = firstGeneration - offset;
        loadPokemons(offset, newLimit);

        loadMore.parentElement.removeChild(loadMore);
    } 
    else {
        loadPokemons(offset, limit);
    }
});

loadPokemons(offset, limit);
