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



const container=document.getElementById("architecture-diagram")

if(container){

const nodes=new vis.DataSet([
{id:1,label:"Frontend"},
{id:2,label:"FastAPI Backend"},
{id:3,label:"Automation Pipelines"},
{id:4,label:"Dataverse"},
{id:5,label:"External APIs"}
])

const edges=new vis.DataSet([
{from:1,to:2},
{from:2,to:3},
{from:3,to:4},
{from:2,to:5}
])

const data={nodes,edges}

const options={
nodes:{shape:"dot",size:18},
edges:{arrows:"to"},
physics:true
}

new vis.Network(container,data,options)

}



const responses={
projects:"I built backend APIs, automation pipelines and Power Platform applications used across operations teams.",
stack:"My stack includes Python, FastAPI, Power Apps, Power Automate, Dataverse and REST APIs.",
experience:"I specialize in backend automation systems, ETL pipelines, and enterprise workflow automation."
}

const input=document.getElementById("chat-input")

if(input){

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

const msg=input.value.toLowerCase()

const reply=responses[msg]||"Try asking about projects, stack, or experience."

const messages=document.getElementById("chat-messages")

messages.innerHTML+="<div>👤 "+msg+"</div>"
messages.innerHTML+="<div>🤖 "+reply+"</div>"

input.value=""

}

})

}