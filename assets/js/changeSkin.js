import { cont } from "./index.js";

export function changeSkin(arrChampions){
    const btnNext = document.querySelectorAll("#btn_next");
    btnNext.forEach((btn)=>{
        btn.addEventListener("click", () =>{

            let idCH = btn.previousElementSibling.id
            idCH = idCH.replace("skinName-", "")
            const champion = arrChampions[idCH]

            if(champion.skinNum < champion.skins.length - 1){
                champion.skinNum++
            }else{
                champion.skinNum = 0
            }
            trocar(arrChampions[idCH])
        });
    })

    const btnPrev = document.querySelectorAll("#btn_prev")
    btnPrev.forEach((btn, i)=>{
        btn.addEventListener("click", ()=>{

            let idCH = btn.nextElementSibling.id
            idCH = idCH.replace("skinName-", "")
            const champion = arrChampions[idCH]

            if(champion.skinNum === 0){
                champion.skinNum = champion.skins.length - 1
            }else{
                champion.skinNum--
            }
            trocar(arrChampions[idCH])
        });
    })
}

function trocar(champion){
    
    const skin = champion.skins[champion.skinNum]
    
    let skinName = skin.name
    if( skinName === "default") skinName = ""
    
    const spanSkinName = document.getElementById("skinName-" + champion.id)
    
    spanSkinName.style.fontSize = "16px"
    if(skinName.length > 30) spanSkinName.style.fontSize = "14px"

    const urlImg = ["http://ddragon.leagueoflegends.com/cdn/img/champion/loading/", "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"]
    document.getElementById("skin-" + champion.id).src = urlImg[cont] + champion.id + "_" + skin.num +".jpg";
    document.getElementById("skinName-" + champion.id).innerHTML = skinName
}