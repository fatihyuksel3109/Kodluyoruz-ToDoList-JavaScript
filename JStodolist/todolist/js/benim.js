// listeye ekleme yapildiktan sonra sifirlansin
function resetInput () {
    document.getElementById("task").value = "";
}
function isEmpty (s) {
    if (!s.trim().length) {
        return true; // string ifadeyi trimledigimizde length 0'sa bostur.
    }
}

function creatDeleteButton (){
    let img = new Image();
    img.src = "cross.jpg"
    img.width = 20;
    img.style = "float:right";
    img.addEventListener('click',function(){//butona tiklandiginde parent element silinsin
        let deletedListElement = this.parentElement;
        deletedListElement.remove(); 
        }
    )
    return img;
}
//list elemanları icin click event
let crossElement = document.querySelectorAll("li>img");
crossElement.forEach(element => element.addEventListener('click', function(){
        let parentListItem = element.parentElement ;
        parentListItem.remove();
        }
    )       
)
// mevcut li elementlerine tiklandiginda degistirecek bir event ekleyelim. class adi "done" olsun
let listItems = document.querySelectorAll("li")
listItems.forEach(item => 
        item.addEventListener('click',function(){
                if (item.classList.contains('done')){
                    item.classList.remove('done');
                }
                else {
                    item.classList.add('done');
                }
        }
    )
)
// yeni eklenen "li" elemanlari icin ayni islemi yapacak fonksiyon
function eventListElement (listElement){
    listElement.addEventListener('click', function(){
            if (listElement.classList.contains('done')){
            listElement.classList.remove('done');
            }
            else {
                listElement.classList.add('done');
            }
        }
    )
    return listElement;
}
function newElement() {
    let inputValue = document.getElementById("task").value;
    if (isEmpty(inputValue)==true) { // input degeri yoksa hata mesaji goster
        $(".error").toast('show');
    }
    else {
        let listElement = document.createElement('li');// varsa 'li' olustur
        eventListElement(listElement); // olusan liste elemanına 'li' ozellikleri verdik
        listElement.innerHTML = inputValue; //girilen bilgileri yazdirdik
        document.getElementById('list').appendChild(listElement); 
        listElement.appendChild(creatDeleteButton());//child elementi buton olsun
        resetInput();
        $(".success").toast('show');
        localStorage.setItem('inputValue :',inputValue); //girilen elemani localStroagede tutmak icin
        
    }
}