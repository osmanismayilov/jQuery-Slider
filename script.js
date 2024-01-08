let upload = document.getElementById("upload");
let table = document.querySelector(".table");
let removeAll = document.querySelector("#removeAll");
let uploadArea = document.querySelector(".uploadArea")

uploadArea.ondragover = ev => ev.preventDefault();

uploadArea.ondrop = function(ev){
    ev.preventDefault();
    UploadImage(ev.dataTransfer.files);
}

upload.addEventListener("click", function(){
    this.nextElementSibling.click();
})

removeAll.addEventListener("click", function(){
    table.lastElementChild.innerHTML = "";
    this.classList.add("d-none");
    table.classList.add("d-none");
})

upload.nextElementSibling.onchange = function (ev){
    UploadImage(ev.target.files);
}

function UploadImage(files) {
    for (const file of files) {
        let reader = new FileReader();
        reader.onloadend = function(ev) {
            let tr = document.createElement("tr");

            let tdImg = document.createElement("td");
            let img = document.createElement("img");
            img.setAttribute("width","100px");
            img.setAttribute("src", ev.target.result);
            tdImg.append(img);

            let iTag = document.createElement("i");
            iTag.classList = "fa-solid fa-xmark";
            iTag.onclick = function(){
                this.parentNode.remove();
            }

            let tdName = document.createElement("td");
            tdName.innerText = file.name;

            let tdSize = document.createElement("td")
            tdSize.innerText=file.size + " bytes";

            tr.append(tdImg,tdName,tdSize,iTag);

            document.querySelector(".table tbody").append(tr);
        }
        reader.readAsDataURL(file);
    }
    table.classList.remove("d-none");
    removeAll.classList.remove("d-none");
    this.value = ""; //repeat file
}