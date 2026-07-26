// ==========================================
// Flame & Co. - Gurukul Food Mela 2026
// script.js PART 3/3
// Orders + Admin Dashboard
// ==========================================



// ===============================
// DEVICE ID SYSTEM
// ===============================


function getDeviceID(){


let deviceID =
localStorage.getItem("deviceID");



if(!deviceID){


deviceID =
"DEVICE-" +
Date.now() +
"-" +
Math.floor(Math.random()*9999);



localStorage.setItem(
"deviceID",
deviceID
);


}


return deviceID;


}








// ===============================
// ORDER PLACEMENT
// ===============================



document
.getElementById("placeOrderBtn")
.addEventListener(
"click",
placeOrder
);





function placeOrder(){



let button =
document.getElementById(
"placeOrderBtn"
);



if(button.classList.contains("disabled")){


alert(
"Please complete your order within budget."
);


return;


}





let student =
JSON.parse(
localStorage.getItem(
"currentStudent"
)
);



if(!student){


alert(
"Please register first."
);


return;


}




let alreadyOrdered =
localStorage.getItem(
"deviceOrder"
);





if(alreadyOrdered){


alert(
"You have already submitted your order."
);


return;


}






let total =
calculateTotal();






let order = {


orderNumber:
"FC-" +
Math.floor(
100000+
Math.random()*900000
),


studentID:
student.id,


studentName:
student.name,


people:
student.people,


items:
cart,


total:
total,


date:
new Date()
.toLocaleDateString(),


time:
new Date()
.toLocaleTimeString(),


deviceID:
getDeviceID(),


status:
"Pending"



};







// Save order


let orders =
JSON.parse(
localStorage.getItem(
"orders"
)
) || [];



orders.push(order);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);





localStorage.setItem(
"deviceOrder",
JSON.stringify(order)
);







showOrderSuccess(order);




}









// ===============================
// ORDER SUCCESS
// ===============================



function showOrderSuccess(order){



document
.getElementById("successBox")
.classList
.remove("hidden");





document
.getElementById("orderDetails")
.innerHTML = `


Order Number:
<b>${order.orderNumber}</b>
<br><br>

Student:
${order.studentName}

<br><br>

Amount:
₹${order.total}

<br><br>

Status:
${order.status}


`;



cart = [];

updateCart();





}









// ===============================
// ORDER HISTORY
// ===============================



function getOrderHistory(){


return JSON.parse(

localStorage.getItem(
"orders"
)

) || [];


}









// ===============================
// ADMIN SYSTEM
// ===============================



document
.getElementById("adminBtn")
.onclick =
()=>{


document
.getElementById("adminPanel")
.classList
.remove("hidden");



window.scrollTo({

top:
document
.getElementById("adminPanel")
.offsetTop,

behavior:"smooth"

});


};








document
.getElementById("loginAdminBtn")
.onclick =
adminLogin;








function adminLogin(){



let password =
document
.getElementById(
"adminPassword"
)
.value;





if(password==="admin123"){



document
.getElementById(
"adminContent"
)
.classList
.remove("hidden");



loadAdminDashboard();



}

else{


alert(
"Wrong password"
);


}



}









// ===============================
// ADMIN DASHBOARD
// ===============================



function loadAdminDashboard(){



let orders =
getOrderHistory();



document
.getElementById(
"totalOrders"
)
.innerHTML =
orders.length;





let revenue =
orders.reduce(

(sum,order)=>
sum+order.total,

0

);




document
.getElementById(
"totalRevenue"
)
.innerHTML =
"₹"+revenue;





document
.getElementById(
"totalStudents"
)
.innerHTML =
new Set(
orders.map(
order=>order.studentID
)
)
.size;





let table =
document
.getElementById(
"orderTable"
);



table.innerHTML="";





orders.forEach(order=>{


let row =
document.createElement(
"tr"
);





row.innerHTML = `


<td>
${order.orderNumber}
</td>


<td>
${order.studentName}
</td>


<td>

${order.items.map(
item=>
item.name+
" × "+
item.quantity

).join("<br>")}


</td>



<td>
₹${order.total}
</td>




<td>


<select
onchange="
changeOrderStatus('${order.orderNumber}',this.value)
"
>


<option
${order.status==="Pending"?"selected":""}>
Pending
</option>


<option
${order.status==="Preparing"?"selected":""}>
Preparing
</option>


<option
${order.status==="Ready"?"selected":""}>
Ready
</option>


<option
${order.status==="Completed"?"selected":""}>
Completed
</option>


</select>



</td>



`;




table.appendChild(row);



});





}









// ===============================
// UPDATE ORDER STATUS
// ===============================



function changeOrderStatus(
orderNumber,
newStatus
){



let orders =
getOrderHistory();





let order =
orders.find(

item=>
item.orderNumber===orderNumber

);





if(order){


order.status =
newStatus;



localStorage.setItem(

"orders",

JSON.stringify(
orders
)

);



loadAdminDashboard();



}



}









// ===============================
// ADMIN REFRESH BUTTON SUPPORT
// ===============================



window.refreshOrders =
function(){


loadAdminDashboard();


};









// ===============================
// NAVIGATION FUNCTIONS
// ===============================



function showHome(){


window.scrollTo({

top:0,

behavior:"smooth"

});


}





function showMenu(){


document
.getElementById("menuSection")
.scrollIntoView({

behavior:"smooth"

});


}






function showCart(){


document
.getElementById("cartBox")
.scrollIntoView({

behavior:"smooth"

});


}
