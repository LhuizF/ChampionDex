import { arrChampions } from "./index.js";
import { spellDetails } from "./spellDescription.js";
import { changeSkin } from "./changeSkin.js";

export async function getChampion(champion) {
    const response = await fetch("../../champion.html")
    const responseText = await response.text()
    createChampionDetailed(responseText, champion) 
    spellDetails()
}

function createChampionDetailed(responseText, champion){
    document.querySelector(".card-list").remove()

    const mainDiv = document.querySelector(".main-container");
    mainDiv.innerHTML = responseText;

    const skin = champion.skins[champion.skinNum];
    const skinImg = document.querySelector(".skinImg");
    skinImg.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`;
    skinImg.id = "skin-" + champion.id;

    const nameskinImg = document.querySelector(".btn-container span");
    let skinName = skin.name
    if( skinName === "default") skinName = ""
    nameskinImg.innerHTML = skinName;
    nameskinImg.id = "skinName-" + champion.id;

    const nameCH = document.querySelector(".champion-container h1");
    nameCH.innerHTML = champion.id;

    const titleCH = document.querySelector(".champion-container span");
    let title = champion.title[0].toUpperCase() + champion.title.slice(1);
    titleCH.innerHTML = title;

    const iconCH = document.querySelector(".icon-tag-container img");
    iconCH.src = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${champion.id}.png`;

    const tags = document.querySelector(".tags");
    for(let tag of champion.tags){
        const span = document.createElement("span");
        span.innerHTML = tag;
        tags.appendChild(span)
    }

    const loreCH = document.querySelector(".lore p");
    loreCH.innerHTML = champion.lore

    const spells = document.querySelector(".spell");
    const spellsText = document.querySelector(".text-container");

    const imgPassive = document.createElement("img");
    imgPassive.classList.add("selected");
    imgPassive.src = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/passive/${champion.passive.image.full}`;
    spells.appendChild(imgPassive);

    const descriptionPassive = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = champion.passive.name;

    const span = document.createElement("span");
    span.innerHTML = champion.passive.description
    
    descriptionPassive.append(p, span);
    spellsText.appendChild(descriptionPassive);

    for(let spell of champion.spells){
        const imgSpell = document.createElement("img");
        imgSpell.src = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/spell/${spell.id}.png`;
        spells.appendChild(imgSpell);

        const descriptionDiv = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = spell.name;

        const span = document.createElement("span");
        span.innerHTML = spell.description;

        descriptionDiv.append(p, span);
        descriptionDiv.style.display = "none"
        spellsText.appendChild(descriptionDiv);
    }

    changeSkin(arrChampions)
}
