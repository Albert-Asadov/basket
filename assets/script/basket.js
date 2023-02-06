
 let ul = document.querySelector(".ul");
       

    let basket = JSON.parse(localStorage.getItem("basket"));
    
    ShowTotalPrice(basket);

    ul.innerHTML = "";

    basket.forEach(elem =>{ 

    let basketHTML =  ` 
    <li>
        <div class="product" data-id="3">
            <div class="image d-flex flex-column">
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

    function ShowTotalPrice(basket) {
        let total = document.querySelector(".total-price");
        total.innerText = basket.reduce((total, product) => {
          return (total += parseInt(product.price * product.count));
        }, 0);
      }