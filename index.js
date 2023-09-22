const baseUrl = 'https://rickandmortyapi.com/api/character';
const main = document.querySelector('main');
const pagination = document.getElementById('pagination');
const genderFilter = document.getElementById('gender-filter');
let btnNext;
let btnPrev;
let btnFirst;
let btnLast;
let currentPage;

function getCharacterDetail(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayCharacterDetail(data);
    })
    .catch(error => {
        console.log('Error al obtener los personajes', error);
    });
}

function fetchData(url) {
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        displayCharacters(data.results);
        displayPagination(data.info);
    })
    .catch(error => {
        console.log('Error al obtener los personajes', error);
    });
}

const displayCharacters = (characters) => {
    const html = characters.map(character => {
        return `
        <article class="character-item">
            <div class="container-img">
                <img src="${character.image}" alt="${character.name}">
            </div>
            <div class="container-data">    
                <h3>${character.name}</h3>
            </div>
            <div class="container-btn">
                <button id="btn-detail" data-url=${character.url}>Ver más</button> 
            </div>
        </article>
        `;
    }).join('');
    main.innerHTML = html;
};

const displayPagination = (info)=> {    
    const page = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    console.log(info)
    currentPage = info.next[info.next.length - 1 ]-1;
    page.textContent = `Usted se encuentra en la página: ${currentPage}`;
    totalPages.textContent = `Total de páginas: ${info.pages}`;
    pagination.innerHTML = '';
    btnPrev = info.prev ? `<button class="btn" data-url=${info.prev}><</button>` : '<button class="btn" data-url=${info.prev} disable><</button>';    
    btnNext = info.next ? `<button class="btn" data-url=${info.next}>></button>` : '<button class="btn" data-url=${info.prev} disable></button>';  
    btnFirst = `<button class="btn" data-url=${baseUrl}><<</button>`;
    btnLast = `<button class="btn" data-url=${baseUrl}?page=${info.pages}>>></button>`;
    pagination.innerHTML = btnFirst + btnPrev + btnNext + btnLast;   
    
}

const displayCharacterDetail = (character) => {
    const html = `
        <article class="character-item">
            <div class="container-img">
                <img src="${character.image}" alt="${character.name}">
            </div>
            <div class="container-data">
                <h3><strong>Nombre:</strong> ${character.name}</h3>
                <p><strong>Genero:</strong> ${character.gender}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
                <p><strong>Location:</strong> ${character.location.name}</p>
            </div>
            <div class="container-btn">
                <button id="back" data-url=${baseUrl}>Volver</button>
            </div>
        </article>
    `;
    main.innerHTML = html;
}

pagination.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn')){
        let value = e.target.dataset.url;
        currentPage = e.target.dataset.url[e.target.dataset.url.length - 1];
        console.log(e)
        fetchData(value);
    }
})

genderFilter.addEventListener('change', () => {
    currentGender = genderFilter.value;
    currentPage = 1;
    fetchData(`${baseUrl}?page=${currentPage}&gender=${currentGender}`)
});

main.addEventListener('click', (e) => {
    if(e.target.id === 'btn-detail'){
        const url = e.target.dataset.url;
        getCharacterDetail(url);
    }
});

main.addEventListener('click', (e) => {
    if(e.target.id === 'back'){
        const url = e.target.dataset.url;
        fetchData(url);
    }
});


const displayError = (err) => {
    console.log(err);
}

fetchData(baseUrl);