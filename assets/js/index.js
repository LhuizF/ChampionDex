import { getChampion } from "./moreInfo.js"
import { changeSkin } from "./changeSkin.js";
export const arrChampions = {}
export let cont = 0

async function getApi(){
    const api = await fetch('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/pt_BR/champion.json');
    const apiVersion = await api.json();     
    const objChampion = apiVersion.data;    
    const arrayChampions = Object.keys(objChampion);

    for(let i = 0; i < 15; i++){
        const championApi = await fetch(`http://ddragon.leagueoflegends.com/cdn/11.14.1/data/pt_BR/champion/${arrayChampions[i]}.json`);
        const championJson = await championApi.json();
        const champion = championJson.data[arrayChampions[i]];
        champion.skinNum = 0
        arrChampions[champion.id] = champion
        createCard(champion, i, arrChampions)
    }
}

function createCard(champion, i, arrChampions){
    const title = champion.title[0].toUpperCase() + champion.title.slice(1);
    
    const card = `<div class = "card" id = "${champion.id}">
    <h2>${champion.name}</h2>
    <span class = "title">${title}</span>
    <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" id = "skin-${champion.id}" alt="${champion.name}">
    <div class = "btn-container">
        <button id = "btn_prev"><i class="far fa-arrow-alt-circle-left"></i></button>
        <span id = "skinName-${champion.id}"></span>
        <button id = "btn_next"><i class="far fa-arrow-alt-circle-right"></i></button>
    </div>
    </div>`

    document.querySelector(".card-list").innerHTML += card; 

    if(title.length > 28){
        const spanTitle = document.querySelectorAll(".card .title")
        spanTitle[i].style.fontSize = "14px"
    }

    btnMoreInfo()
    changeSkin(arrChampions)
}

function btnMoreInfo(){
    const btnOp = document.querySelectorAll(".card img");
    btnOp.forEach( (btn)=>{
        btn.addEventListener("click", ()=>{
            let idCH = btn.id
            idCH = idCH.replace("skin-", "")
            getChampion(arrChampions[idCH])
            cont = 1
        })
    })
}

getApi()
