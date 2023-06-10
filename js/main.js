const URL = 'https://rickandmortyapi.com/api/character';
let previus;
let next;

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

const get = async (url) => {
    try {
        const response = await fetch(url);
        const { info, results } = await response.json();
        previus = info.prev;
        next = info.next;
        return { info, results };
    }
    catch (err) {
        console.log(err);
    }
}

const showCard = (personaje) => {
    const card =
        `<div class="col-4 mt-4">
    <div class="card">
        <img src="${personaje.image}" class="card-img-top" alt="Imagen del personaje">
        <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Estado:</strong> ${personaje.status}</li>
            <li class="list-group-item"><strong>Origen:</strong> ${personaje.origin.name}</li>
            <li class="list-group-item"><strong>Especie:</strong> ${personaje.species}</li>
        </ul>
    </div>
</div>`;
    document.getElementById("cards").insertAdjacentHTML('beforeend', card);
}

const start = async () => {
    try {
        const { info, results } = await get(URL);
        results.forEach((character) => {
            showCard(character);
        })
        updateButton(prevButton, previus)
    }
    catch (err) {
        console.log(err);
    }
}

window.onload = start();

const showCharacters = async (results) => {
    document.getElementById("cards").innerHTML = '';
    results.forEach((character) => {
        showCard(character);
    })
}

const searchByName = async () => {
    const name = document.getElementById('name').value;
    const { info, results } = await get(URL + '?name=' + name);
    showCharacters(results)
}

const filtrarEstado = async () => {
    const estado = document.getElementById('filtrar').value;
    const { info, results } = await get(URL + '?status=' + estado);
    showCharacters(results)
}

const searchBySpecies = async () => {
    const especie = document.getElementById('especie').value;
    const { info, results } = await get(URL + '?species=' + especie);
    showCharacters(results)
}

const previusPage = async () => {
    const { info, results } = await get(previus);
    showCharacters(results);
    updateButtons();
}

const nextPage = async () => {
    const { info, results } = await get(next);
    showCharacters(results)
    updateButtons();
}

function updateButtons() {
    updateButton(prevButton, previus)
    updateButton(nextButton, next)
}

function updateButton(button, value) {
    if (value == null && !button.disabled) {
        button.disabled = true;
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.6';
    } else if (value != null && button.disabled) {
        button.disabled = false;
        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
    }
}


