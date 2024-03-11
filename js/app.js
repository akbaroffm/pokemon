let elList = document.querySelector(".list");
let elBtn = document.querySelector(".more-btn");
let elSearchInput = document.querySelector(".search-input");

let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

const request = new XMLHttpRequest();
let allPokemon = [];

function getRequest(req, path, URL) {
  const promise = new Promise((resolve, reject) => {
    req.open(path, URL);
    req.send();

    req.onload = () => {
      resolve(JSON.parse(req.response));
    };
    req.onerror = () => {
      reject(Error("Frontda xatolik bor"));
    };
    req.onabort = () => {
      reject(Error("Backendda xatolik bor"));
    };
  });
  return promise;
}

getRequest(request, "GET", "pokemon.json")
  .then(res => {
    allPokemon = res;
    res.map(item => {
      let elItem = document.createElement("li");
      elItem.classList.add("item");

      elItem.innerHTML = `
        <span>ID: ${item.id}</span>
        <p> ${item.name}</p>
        <div><img class="pokemon-img" src="${item.img}" alt="pokemon image"></div>
        <div class="hw-wrap">
          <span>Height: ${item.height}</span>
          <span>Weight: ${item.weight}</span>
        </div>
        <div>
          <strong>${item.type}</strong>
        </div>
        <div>
          <button id=${item.id} class="more-btn" onclick="moreBtn(${item.id})">More</button>
        </div>
      `;
      elList.appendChild(elItem);
    });
  });

function moreBtn(clickedId) {
  elModalWrapper.classList.add("open-modal");

  let selectedPokemon = allPokemon.find(pokemon => pokemon.id === clickedId);
  if (selectedPokemon) {
    elModal.innerHTML = `
      <div class="modal-content">
        <span>ID: ${selectedPokemon.id}</span>
        <p>${selectedPokemon.name}</p>
        <div><img class="pokemon-img" src="${selectedPokemon.img}" alt="pokemon image"></div>
        <div class="hw-wrap-modal">
          <span>${selectedPokemon.candy}</span>
          <span>Candy count: ${selectedPokemon.candy_count}</span>
          <span>Egg: ${selectedPokemon.egg}</span>
          <span>Spawn chance: ${selectedPokemon.spawn_chance}</span>
          <span>Avg spawns: ${selectedPokemon.avg_spawns}</span>
          <span>Spawn time: ${selectedPokemon.spawn_time}</span>
          <span>Multipliers: ${selectedPokemon.multipliers}</span>
          <span>Weaknesses: ${selectedPokemon.weaknesses}</span>
        </div>
        <div>
          <strong>Type: ${selectedPokemon.type}</strong>
        </div>
      </div>
    `;
  }
}

elSearchInput.addEventListener("keyup", function(evt) {
  const searchTerm = evt.target.value.toLowerCase();
  const filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  elList.innerHTML = "";
  filteredPokemon.forEach(item => {
    let elItem = document.createElement("li");
    elItem.classList.add("item");

    elItem.innerHTML = `
      <span>ID: ${item.id}</span>
      <p> ${item.name}</p>
      <div><img class="pokemon-img" src="${item.img}" alt="pokemon image"></div>
      <div class="hw-wrap">
        <span>Height: ${item.height}</span>
        <span>Weight: ${item.weight}</span>
      </div>
      <div>
        <strong>${item.type}</strong>
      </div>
      <div>
        <button id=${item.id} class="more-btn" onclick="moreBtn(${item.id})">More</button>
      </div>
    `;
    elList.appendChild(elItem);
  });
});

elModalWrapper.addEventListener("click", function(evt) {
  if (evt.target.id === "modal-wrapper") {
    elModalWrapper.classList.remove("open-modal");
  }
});
