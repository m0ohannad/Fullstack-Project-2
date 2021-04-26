const navbar = document.querySelector('#navbar');
const container = document.querySelector('#container');

const renderData = (list) => {
    container.textContent = '';
    list.map((team) => {
        const versus = document.createElement('div');
        versus.className = "container d-flex";

        const left = document.createElement('span');
        left.className = "container d-flex align-items-center flex-wrap";
        left.innerHTML = `<img src="${team.t1.img}" alt="${team.t1.name}" class="shadow rounded-circle p-3 mb-2 bg-white text-dark d-inline-block align-top">
        <p class="position-absolute d-inline-block rounded-pill width p-3 mb-2 bg-white text-dark text-end pe-5">${team.t1.name}</p>`;
        left.addEventListener('click', () => show(team.t1.name, team.t1.img));

        const VS = document.createElement('span');
        VS.className = "vs p-3";
        VS.innerHTML = 'VS';

        const right = document.createElement('span');
        right.className = "team container d-flex align-items-center flex-wrap flex-row-reverse";
        right.innerHTML = `<img src="${team.t2.img}" alt="${team.t2.name}" class="shadow rounded-circle p-3 mb-2 bg-white text-dark d-inline-block align-top">
        <p class="position-absolute d-inline-block rounded-pill width p-3 mb-2 bg-white text-dark text-start ps-5">${team.t2.name}</p>`;
        right.addEventListener('click', () => show(team.t2.name, team.t2.img));

        versus.appendChild(left);
        versus.appendChild(VS);
        versus.appendChild(right);
        container.appendChild(versus);
        console.log(left)
    });
}

fetch('./assets/script/teams.json', {
    mode: "no-cors",
    Headers: {
        "Application-Type": "application/json"
    }
}).then(res => res.json())
    .then(res => {
        renderData(res.versus);
    })
    .catch(err => console.log(err));

document.querySelector('#login').addEventListener("click", function () {
    navbar.textContent = '';
    container.textContent = '';

    navbar.innerHTML = `<a class="navbar-brand" href="index.html">
                            <img src="./assets/img/logo.svg" alt="logo" class="d-inline-block align-top">
                            <b class="logo">MATCH</b>
                        </a>`;

    const login = document.createElement('div');
    login.className = "container d-flex";
    login.innerHTML = `<div class="loginForm shadow">
                                <div class="p-5">
                                    <h3 class="mb-5">Login</h3>
                                    <form>
                                        <div class="mb-3">
                                            <label for="Email1" class="form-label d-flex">Email</label>
                                            <input type="email" class="form-control" id="Email1">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label for="Password" class="form-label d-flex">Password</label>
                                            <input type="password" class="form-control" id="Password">
                                        </div>
                            
                                        <div class="text-center">
                                            <input type="submit" value="Login" class="submit btn btn-warning w-50 mt-3 mb-4">
                                        </div> 
                                    </form>
                                </div>
                            </div>`;
    container.appendChild(login);
});

function show(name, img) {

    container.textContent = '';

    const team = document.createElement('div');
    team.className = "container-fluid mb-5";
    team.innerHTML = `<div class="navbar-brand d-flex justify-content-center align-items-center" href="index.html">
                            <img src="${img}" alt="${name}" width="99" class="d-inline-block me-2">
                            <span class="text-start">
                                <b class="logo">${name}</b>
                                <p>Team</p>
                            </span>
                         </div>`;

    const cards = document.createElement('div');
    cards.className = "row row-cols-1 row-cols-md-3 g-4";

    fetch('./assets/script/players.json', {
        mode: "no-cors",
        Headers: {
            "Application-Type": "application/json"
        }
    }).then(res => res.json())
        .then(res => {
            players(res.players);
            console.log(res.players)
        })
        .catch(err => console.log(err));

    const players = (players) => {
        cards.textContent = '';
        players.map((player) => {
            const card = document.createElement('div');
            card.className = "col";
            card.innerHTML = `<div class="card h-100">
                                <div class="card-body">
                                <img src="${player.img}" class="card-img-top" alt="${player.name}">
                                <h5 class="card-title">${player.name}</h5>
                                <b class="number">${player.number}<b/>
                                </div>
                            </div>`;
            cards.appendChild(card);
        })
    }

    container.appendChild(team);
    container.appendChild(cards);
};