const links=document.querySelectorAll("nav a")

links.forEach(link=>{

link.addEventListener("click",e=>{

e.preventDefault()

const id=link.getAttribute("href")

document.querySelector(id).scrollIntoView({
behavior:"smooth"
})

})

})