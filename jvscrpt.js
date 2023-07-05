let count=0;
let currentMode="colorMode";
const container = document.getElementById("container");
const btn = document.querySelector('#reset');
const colorChoice=document.querySelector('#colorpicker');
const eraser=document.querySelector('#eraser');
const rainbow=document.querySelector('#rainbow');

let mouseDown = false;
container.onmousedown = () => mouseDown = true;
container.onmouseup = () => mouseDown = false;


function makeRows(rows, cols) {
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    count++;
    cell.style.maxWidth = container.clientWidth/rows+"px";
    cell.style.maxHeight=container.clientWidth/rows+"px";
    cell.addEventListener("mousedown", changeColor);
    cell.addEventListener("mouseover", changeColor);
    container.appendChild(cell).className = "grid-item";
  };
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
};

btn.onclick = () =>{
  deleteRows(count);
  count=0;
  makeRows(pixel,pixel);
}
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.style.fontSize="20px";
output.innerHTML = slider.value+"x"+slider.value;
let pixel=slider.value;

slider.oninput = function() {
  output.innerHTML = this.value+"x"+this.value;
  pixel = this.value;
}

function deleteRows(count){
  for(let i=0;i<count;i++){
    document.querySelector(".grid-item").remove();
  } 
}

eraser.onclick=()=> currentMode="eraser";
rainbow.onclick=()=>currentMode="rainbow";
colorChoice.onclick=()=>currentMode="colorMode";

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

function resize(size){
  deleteRows(count);
  count=0;
  makeRows(size, size);
}

makeRows(pixel, pixel);