 let titles = document.querySelectorAll(".title");
 let button = document.querySelectorAll(".btn");
 let ul = document.querySelector(".ul");
 let cardBas =  document.querySelector(".cardBas");
 let basketIcon = document.querySelector(".basketIcon")
 let deleteIcon = document.querySelector(".deleteIcon")


  document.addEventListener("DOMContentLoaded", function(){

    let basketStr = localStorage.getItem("basket");
    let basket = JSON.parse(basketStr);

    if(!basket || !basket.length ){
        localStorage.setItem("basket", JSON.stringify([]));
    }
    else{
        ShowProductCount(basket);
        ShowTotalPrice(basket);
    }
    titles.forEach((title) => {
        title.setAttribute("data-title", title.innerText);
        if(title.innerText.length > 15){
            title.innerText = title.innerText.substring(0,15) + "...";
        }
     });
    })
    button.forEach(btn => {
        btn.addEventListener("click", function(){
            let basket = JSON.parse(localStorage.getItem("basket"));
            if(!basket){
                localStorage.setItem("basket", JSON.stringify([]));
                basket = JSON.parse(localStorage.getItem("basket")); //sual niye basketi yeniden elave etdik ve niye let siz yazdiq.
            }
            let product = GetElementsValue(this);
            let existedProduct = basket.find((pro)=>{
              return  pro.id == product.id;
            });
            if(!existedProduct){
                basket.push(product);
            } else{
                existedProduct.count++;
            }
            ShowProductCount(basket);
            ShowTotalPrice(basket);
            let basketStr = JSON.stringify(basket);
            localStorage.setItem("basket", basketStr);

            cardBas.classList.add("active")
            
        })
    });
    
    basketIcon.addEventListener("click", function(){
       
        cardBas.classList.toggle("active");

        let basket = JSON.parse(localStorage.getItem("basket"));

        ul.innerHTML = "";

        basket.forEach(elem =>{ 

        let basketHTML =  ` 
        <li>
            <div class="product" data-id="3">
                <div class="image ">
                    <img src="${elem.src}" alt="Galaxy">
                    <span>count: ${elem.count}</span>
                </div>
                <div class="info-add">
                    <div class="info">
                        <h3 class="title">${elem.title}</h3>
                        <p>${elem.text}</p>
                        <b>Price: </b><span class="price">${elem.price}</span>AZN
                    </div>
                </div>
                <div class="delete">
                   <i class="deleteIcon fa-solid fa-circle-minus"></i>
                </div>
            </div>      
        </li>`;
    
        ul.innerHTML += basketHTML;

        });
    });

   
 function GetElementsValue(product){
    let parent = product.parentElement.parentElement.parentElement;
    let price = parent.querySelector(".price").innerText;
    let id = parent.getAttribute("data-id");
    let text = parent.querySelector("p").innerText;
    let title = parent.querySelector(".title").getAttribute("data-title");
    let src = parent.querySelector("img").src;
    let result = { id, price , text, title, src , count: 1}
    return result;
 }

 function ShowProductCount(basket){
    let basketCount = document.querySelector(".basket-count");
    basketCount.innerText = basket.reduce((total,product)=>{
        return total += product.count;
    },0);
}

function ShowTotalPrice(basket) {
    let total = document.querySelector(".total-price");
    total.innerText = basket.reduce((total, product) => {
      return (total += parseInt(product.price * product.count));
    }, 0);
  }

