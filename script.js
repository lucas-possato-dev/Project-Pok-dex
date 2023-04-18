const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

async function fetchPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

if (response.status === 200) {
  const json = await response.json();
  return json;
}
  
}

async function renderPokemon(pokemon) {

  pokemonName.textContent = 'Loading...';
  pokemonNumber.textContent = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;
    input.value = '';
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.textContent = 'Not found :c';
    pokemonNumber.textContent = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputNumber = Number(input.value);
  if (isNaN(inputNumber) || inputNumber <= 649) {
    renderPokemon(input.value.toLowerCase());
  } 
});

buttonPrev.addEventListener('click', () => {
 if (searchPokemon > 1) {
   searchPokemon -= 1;
   renderPokemon(searchPokemon);
 } 
})

buttonNext.addEventListener('click', () => {
  if (searchPokemon < 649) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  } else {
    renderPokemon('1')
  }
  
})

renderPokemon(searchPokemon);