let filtersDetail = {
  brightness:  { value: 100, min: 0, max: 200, unit: "%" },
  contrast:    { value: 100, min: 0, max: 200, unit: "%" },
  saturation:  { value: 100, min: 0, max: 200, unit: "%" },
  hueRotation: { value: 0,   min: 0, max: 360, unit: "deg" },
  blur:        { value: 0,   min: 0, max: 20,  unit: "px" },
  grayscale:   { value: 0,   min: 0, max: 100, unit: "%" },
  sepia:       { value: 0,   min: 0, max: 100, unit: "%" },
  opacity:     { value: 100, min: 0, max: 100, unit: "%" },
  invert:      { value: 0,   min: 0, max: 100, unit: "%" }
};

let filters = document.querySelector(".filters")
let downloadBtn = document.querySelector(".download-btn");
let image = null;
function createFelter(name,value,min,max){
    let div = document.createElement("div");
    div.classList.add("filter");

    let label = document.createElement("label");
    label.htmlFor = name;
    label.textContent = name;

    let input = document.createElement("input");
    input.classList.add("input-style")
    input.type = "range";
    input.id = name;
    input.min = min;
    input.max = max;
    input.value = value;

    div.appendChild(label);
    div.appendChild(input);
    filters.appendChild(div);


    input.addEventListener("input" , (e)=>{
        filtersDetail[name].value = input.value;
        applyfilter(name);
    }
    
    )

}
Object.keys(filtersDetail).forEach(name=>{
    createFelter(name,filtersDetail[ name ].value,filtersDetail[ name ].min,filtersDetail[ name ].max   );
})


let canvas = document.querySelector(".canvas");
const canvasCtx = canvas.getContext("2d");
let chooseBtn = document.querySelector(".choose-btn");
let imageInput = document.querySelector(".image-input"); 
let file = null;



   chooseBtn.addEventListener("change", () => {
    file = imageInput.files[0];
    document.querySelector(".placeholder").style.display = "none";
    canvas.style.display = "initial";
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

     img.onload = () => {
        image = img;
        canvas.width = img.width;
        canvas.height = img.height;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

})
function applyfilter(name){
    if (!image) return;
    let newname = name;
    if(name === "hueRotation") newname = "hue-rotate";
    if(name === "saturation") newname = "saturate";
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    canvasCtx.filter = `${newname}(${filtersDetail[name].value}${filtersDetail[name].unit})`;
    canvasCtx.drawImage(image,0,0,canvas.width,canvas.height);
}


let resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click",(e)=>{
     filters.innerHTML = "";
  filtersDetail = {
  brightness:  { value: 100, min: 0, max: 200, unit: "%" },
  contrast:    { value: 100, min: 0, max: 200, unit: "%" },
  saturation:  { value: 100, min: 0, max: 200, unit: "%" },
  hueRotation: { value: 0,   min: 0, max: 360, unit: "deg" },
  blur:        { value: 0,   min: 0, max: 20,  unit: "px" },
  grayscale:   { value: 0,   min: 0, max: 100, unit: "%" },
  sepia:       { value: 0,   min: 0, max: 100, unit: "%" },
  opacity:     { value: 100, min: 0, max: 100, unit: "%" },
  invert:      { value: 0,   min: 0, max: 100, unit: "%" }
};
   
   Object.keys(filtersDetail).forEach(name=>{
    createFelter(name,filtersDetail[ name ].value,filtersDetail[ name ].min,filtersDetail[ name ].max);
    applyfilter(name);
})

})

downloadBtn.addEventListener("click",()=>{
    let link = document.createElement("a");
    link.download = "edited-img.png";
    link.href = canvas.toDataURL();
    link.click();
})