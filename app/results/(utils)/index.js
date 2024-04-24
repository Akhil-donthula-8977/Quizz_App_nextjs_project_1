"use server"
const getPokemonData = async () => {
    const pokemonList = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${filter}`
    );
}