const pokeApi = new Object();

function convertForClassPokemon(pokemonDetail) {
    const { name, id, types, sprites } = pokemonDetail;

    const typesName = types.map((typeSlot) => typeSlot.type.name);
    const [type] = typesName;
    const image = sprites.other.dream_world.front_default;

    return new Pokemon(name, id, type, typesName, image);
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => convertForClassPokemon(data));
};

pokeApi.getPokemons = (offset, limit) => {
    offset = offset || 0;
    limit = limit || 10;

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => data.results)
        .then((pokemons) =>
            pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon))
        )
        .then((detail) => Promise.all(detail))
        .catch((error) => console.error("Error:", error));
};
