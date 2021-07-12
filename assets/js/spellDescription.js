export function spellDetails(){
    const spellBtn = document.querySelectorAll(".spell img")
    spellBtn.forEach((btn, i) =>{
        btn.addEventListener("click" ,()=>{
            const description = document.querySelectorAll(".text-container div")
            for(let p of description ){
                p.style.display = "none"
                
            }
            description[i].style.display = "block"
            
            const spellImg = document.querySelectorAll(".spell img")
            for(let img of spellImg ){
                img.classList.remove("selected")
                
            }
            spellImg[i].classList.add("selected")
        })
    })
}
