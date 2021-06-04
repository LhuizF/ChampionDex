async function getApi(){
    const api = await fetch('http://ddragon.leagueoflegends.com/cdn/11.11.1/data/pt_BR/champion.json');
    const apiVersion = await api.json();     // obj api dos champions com data, type, version
    const objChampion = apiVersion.data;    //obg com somente os champion 

    const arrayChampions = Object.keys(objChampion).map((key) =>{ // trasfroma o objChampion em uma array em q cada índice é um champion
        return objChampion[key]
    });

    getChampion(arrayChampions)
}

async function getChampion(arrayChampions){ //adiciona uma api de cada champion individualmente a uma array

    const arr = []
    for(let i = 0; i < arrayChampions.length; i++){
        
        const champion = await fetch(`http://ddragon.leagueoflegends.com/cdn/11.11.1/data/pt_BR/champion/${arrayChampions[i].id}.json`);
        arr.push(champion.url)
        
    }
    createElement(arrayChampions, arr)
}

const nameIdChampion = []
const arrCont = []

async function createElement(arrayChampions, arrSkins){
    
    for(let i = 0; i < arrayChampions.length; i++){ //adiciona uma div para cada champion pegando art, nome e titulo

        const champion = arrayChampions[i]
        let idChampion = champion.id
        const nameChampion = champion.name
        let titleChampion = champion.title
        
        titleChampion = titleChampion[0].toUpperCase() + titleChampion.slice(1)

        const card = `<div class="card">
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${idChampion}_0.jpg" id = "${i}"alt="">
        <h2>${nameChampion}</h2>
        <span>${titleChampion }</span>
        <div>
            <button id = "btn_prev"><i class="far fa-arrow-alt-circle-left"></i></button>
            <button id = "btn_next"><i class="far fa-arrow-alt-circle-right"></i></button>
        </div>
    </div>`

        document.querySelector(".card-list").innerHTML += card; 

        const api = await fetch(arrSkins[i]);                  //pega a api e transformar em um json
        const championJson = await api.json();
        const championS = (Object.values (championJson.data));

        nameIdChampion.push([idChampion, championS[0].skins]) 
        arrCont.push(0)
    }
    
    const btnNext = document.querySelectorAll("#btn_next")
    btnNext.forEach((btn, i)=>{

        btn.addEventListener("click", ()=>{
            if(arrCont[i] < nameIdChampion[i][1].length - 1){
                arrCont[i]++
            }else{
                arrCont[i] = 0
            }
            const skin = nameIdChampion[i][1][arrCont[i]].num
            document.getElementById(i).src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nameIdChampion[i][0]}_${skin}.jpg`;
        });
    })

    const btnPrev = document.querySelectorAll("#btn_prev")
    btnPrev.forEach((btn, i)=>{
        
        btn.addEventListener("click", ()=>{
            if(arrCont[i] == 0 ){
                arrCont[i] = nameIdChampion[i][1].length -1
            }else{
                arrCont[i]--
            }
            const skin = nameIdChampion[i][1][arrCont[i]].num
            document.getElementById(i).src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nameIdChampion[i][0]}_${skin}.jpg`;
            
        });
    })

};

getApi()
