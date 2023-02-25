//kullanıcın değer girdiği input, ekleme yapıldıktan sonra sıfırlansın
function resetInput(){
    document.getElementById("task").value = "";
}

function isEmpty(s) {
    if(!s.trim().length){
        return true; //string ifadeyi trimlediğimizde yani boşluklarından arındırdığımızda uzunluğu olmuyorsa karakter içermiyordur. 
    } 
}
//her liste elemanı eklendiğinde bir silme butonu üretilsin
function createDeleteButton(){
    var img= new Image();
    img.src = "cross.jpg"
    img.width = 20;
    img.style = "float:right";
    img.addEventListener('click', function(){ //butonun click eventi olsun, tıklandığında parent elementini silsin
        var deletedListElement = this.parentElement;
        deletedListElement.remove();
    })
    return img;
}
//mevcutta var olan list elemanları için click eventi
var crossElements = document.querySelectorAll("img");
crossElements.forEach(element => element.addEventListener('click', function(){
var parentListItem = element.parentElement;
parentListItem.remove();
})
)
//mevcuttaki li elementleri için tıklandığında değişeceği bir event ekleyelim. Css'e mavi ve üstü çizili gibi özellikleri barındıran class ekledik. Adı checked olsun.
var listItems = document.querySelectorAll("li");
listItems.forEach(item => item.addEventListener('click', function(){
    if(item.classList.contains('checked')){
        item.classList.remove('checked');
    }
    else{
        item.classList.add('checked');
    }
}))
// aynı özelliği yeni eklenen liste elemanına atayan bir fonksiyon tanımlayalım
function eventListElement(listElement){   
    listElement.addEventListener('click', function(){
        if(listElement.classList.contains('checked')){
            listElement.classList.remove('checked');
        }
        else{
            listElement.classList.add('checked');
        }
    })
    return listElement;
} 

// indexte belirtilen ve ekle butonunun click eventi için tanımlanan newElement fonksiyonuna bakalım
function newElement(){
//ilk olarak kullanıcıdan gelecek olan input değerine ulaşmamız gerekir
var inputValue = document.getElementById("task").value;
//bu inputun koşula uygun olup olmadığını kontrol edebilmemiz için if bloğu oluşturalım. Hiç bir şey girilmezse; 
    if(inputValue == ''){
        $(".error").toast('show'); //her iki durumda da gizli olan error toast alertleri gösteriyoruz. Boostrapin sitesinde bu koda ulaşabilirsiniz. Websitesinde hazır olarak verilmiş. 
    }
    //Kullanıcı space karakter girdiyse bunun için ayrı bir fonksiyonumuz var
    else if(isEmpty(inputValue)==true){
        $(".error").toast('show');
    }
    else{
        var listElement = document.createElement("li"); //liste elemanımızı oluşturduk
        eventListElement(listElement); //oluşan liste elemanına üzerine tıklandığında üstü çizili olsun vs. özelliklerini atadık
        listElement.innerHTML = inputValue; //textine dışarıdan gelen değeri atadık
        document.getElementById("list").appendChild(listElement);
        listElement.appendChild(createDeleteButton()); //child elementi tanımladığımız buton olsun dedik
        resetInput(); //sıfırladık
        $(".success").toast('show'); //success toast gösterebiliriz artık :)
        localStorage.setItem('inputValue', inputValue); //girilen son elemanın local storage da tutulması
        
        
    }
}
