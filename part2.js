// ==========================================
// Flame & Co. - Gurukul Food Mela 2026
// script.js PART 2/3
// Food Menu + Cart System
// ==========================================




// ===============================
// FOOD MENU DATABASE
// ===============================


const foodMenu = [

{
id:1,
name:"Peri Peri Corn Bhel",
price:40,
image:"https://images.unsplash.com/photo-1601050690597-df0568f70950",
description:
"Sweet corn mixed with spices, sev and crunchy ingredients."
},


{
id:2,
name:"Dry Bhel",
price:30,
image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027",
description:
"Crispy puffed rice bhel with chutneys and masala."
},


{
id:3,
name:"Chana Jor Garam",
price:40,
image:"https://images.unsplash.com/photo-1596797038530-2c107229654b",
description:
"Spicy roasted chana snack with traditional flavours."
},


{
id:4,
name:"Paneer Tikka",
price:80,
image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
description:
"Soft paneer grilled with delicious Indian spices."
},


{
id:5,
name:"Amritsari Paneer Pakora",
price:70,
image:"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
description:
"Crispy paneer pakora with Punjabi taste."
},


{
id:6,
name:"Chole Chaat",
price:50,
image:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
description:
"Delicious spicy chole chaat."
}


];







// ===============================
// CART VARIABLES
// ===============================


let cart = [];

let currentFood = null;

let currentQuantity = 1;








// ===============================
// LOAD FOOD MENU
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


generateFoodCards();


}
);







function generateFoodCards(){


const container =
document.getElementById(
"foodContainer"
);



if(!container)
return;



container.innerHTML="";



foodMenu.forEach(food=>{


let card =
document.createElement("div");



card.className =
"food-card";



card.innerHTML = `

<img src="${food.image}">


<div class="food-card-content">

<h3>${food.name}</h3>

<p>
${food.description}
</p>


<h3>
₹${food.price}
</h3>

</div>

`;



card.onclick =
()=>openFoodModal(food);



container.appendChild(card);



});



}









// ===============================
// FOOD POPUP
// ===============================



function openFoodModal(food){



currentFood = food;

currentQuantity = 1;



document
.getElementById("modalImage")
.src =
food.image;



document
.getElementById("modalName")
.innerHTML =
food.name;



document
.getElementById("modalDescription")
.innerHTML =
food.description;



document
.getElementById("modalPrice")
.innerHTML =
"₹"+food.price;



document
.getElementById("quantity")
.innerHTML =
currentQuantity;



document
.getElementById("foodModal")
.classList
.remove("hidden");



}







document
.getElementById("closeModal")
.onclick =
()=>{


document
.getElementById("foodModal")
.classList
.add("hidden");


};









// ===============================
// QUANTITY SYSTEM
// ===============================



document
.getElementById("plusBtn")
.onclick =
()=>{


currentQuantity++;


document
.getElementById("quantity")
.innerHTML =
currentQuantity;


};





document
.getElementById("minusBtn")
.onclick =
()=>{


if(currentQuantity>1){

currentQuantity--;

}



document
.getElementById("quantity")
.innerHTML =
currentQuantity;


};









// ===============================
// ADD TO CART
// ===============================



document
.getElementById("addCartBtn")
.onclick =
()=>{


if(!currentFood)
return;




let existing =
cart.find(
item =>
item.id === currentFood.id
);



if(existing){


existing.quantity += currentQuantity;


}

else{


cart.push({

id:currentFood.id,

name:currentFood.name,

price:currentFood.price,

quantity:currentQuantity


});


}





closeModal();


updateCart();


};








function closeModal(){


document
.getElementById("foodModal")
.classList
.add("hidden");


}









// ===============================
// CART DISPLAY
// ===============================


function updateCart(){



let cartContainer =
document.getElementById(
"cartItems"
);



if(cart.length===0){


cartContainer.innerHTML =
"<p>Cart is empty</p>";



return;


}





cartContainer.innerHTML="";




cart.forEach(item=>{


let div =
document.createElement("div");



div.innerHTML = `


<p>

${item.name}

<br>

₹${item.price}
×
${item.quantity}


<button onclick="removeCartItem(${item.id})">

❌

</button>


</p>


<hr>


`;



cartContainer.appendChild(div);



});



calculateTotal();



}









function removeCartItem(id){



cart =
cart.filter(
item =>
item.id !== id
);



updateCart();


}









// ===============================
// TOTAL CALCULATION
// ===============================



function calculateTotal(){



let total =
0;



cart.forEach(item=>{


total +=
item.price *
item.quantity;


});





document
.getElementById("cartTotal")
.innerHTML =
"₹"+total;





checkBudget(total);



return total;


}








// ===============================
// BUDGET CHECK
// ===============================



function checkBudget(total){



let people =
Number(
document.getElementById(
"peopleSelect"
).value
);



let allowedBudget =
people * 220;



let status =
document.getElementById(
"budgetStatus"
);




let orderButton =
document.getElementById(
"placeOrderBtn"
);





if(total <= allowedBudget){


status.innerHTML =
"✅ Within Budget";


status.style.color =
"#86efac";



orderButton.classList
.remove("disabled");



}


else{


status.innerHTML =
"⚠ Budget Exceeded";


status.style.color =
"#f87171";



orderButton.classList
.add("disabled");



}




}






// Update budget whenever people changes

document
.getElementById("peopleSelect")
.addEventListener(
"change",
()=>{


calculateTotal();


}
);
