let currentMode="colorMode";
let gridContainer = document.getElementById('container');
let reset = document.querySelector('#reset');
let colorChoice=document.getElementById('colorpicker');
let eraser=document.querySelector('#eraser');
let rainbow=document.querySelector('#rainbow');

let count=0;

let mouseDown = false;
container.onmousedown = () => mouseDown = true;
container.onmouseup = () => mouseDown = false;

function creategrid(rows,cols){
  for (let i = 1; i <= (rows*cols); i++) {
    let gridItem = document.createElement('div');
    count++;
    gridItem.style.maxWidth=container.clientWidth/rows+"px";
    gridItem.style.maxHeight=container.clientWidth/rows+"px";
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);

    gridItem.addEventListener("mousedown",changeColor);
    gridItem.addEventListener("mouseover",changeColor);
  }
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

eraser.onclick=()=> currentMode="eraser";
rainbow.onclick=()=>currentMode="rainbow";
colorChoice.onclick=()=>currentMode="colorMode";

reset.onclick = () =>{
  deleteRows(count);
  count=0;
  creategrid(pixel,pixel);
}
function deleteRows(count){
  for(let i=0;i<count;i++){
    document.querySelector(".grid-item").remove();
  } 
}

function changeColor(e){
  if (e.type == "mouseover" && !mouseDown) return;
  if(currentMode=="colorMode"){
    e.target.style.backgroundColor = colorChoice.value;
  }else if(currentMode=="rainbow"){
    let r=Math.floor(Math.random() * 256);
    let g=Math.floor(Math.random() * 256);
    let b=Math.floor(Math.random() * 256);
    e.target.style.backgroundColor=`rgb(${r}, ${g}, ${b})`;
  }else if(currentMode=="eraser"){
    e.target.style.backgroundColor="white";
  }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.style.fontSize="26px";
output.innerHTML = slider.value+"x"+slider.value;
let pixel=slider.value;

slider.oninput = function() {
  output.innerHTML = this.value+"x"+this.value;
  pixel = this.value;
  deleteRows(count);
  count=0;
  creategrid(pixel,pixel);
}

creategrid(pixel,pixel)