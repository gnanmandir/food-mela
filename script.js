// ==========================================
// Flame & Co. - Gurukul Food Mela 2026
// script.js PART 1/3
// Student Registration System
// ==========================================



// ===============================
// APP INITIALIZATION
// ===============================


document.addEventListener("DOMContentLoaded", () => {

    console.log("🔥 Flame & Co. App Started");

    loadStudents();

    initializeRegistration();

});





// ===============================
// STUDENT DATABASE
// ===============================


const students = [

{
id:1,
fullName:"Aaditya Ashishkumar Patel"
},

{
id:2,
fullName:"Aarav Arjunbhai Parekh"
},

{
id:3,
fullName:"Aaruj Dinesh Rawat"
},

{
id:4,
fullName:"Aary Deepakbhai Patel"
},

{
id:5,
fullName:"Abhi Chandrakant Dodiya"
},

{
id:6,
fullName:"Abhimanyu Gitakumari Anand"
},

{
id:7,
fullName:"Akshar Mukeshbhai Aghara"
},

{
id:8,
fullName:"Aniket Kirtibhai Chaudhari"
},

{
id:9,
fullName:"Aniruddh Hiteshbhai Monpara"
},

{
id:10,
fullName:"Ansh Manojbhai Patel"
},


{
id:11,
fullName:"Aryan Manoj Daxina"
},

{
id:12,
fullName:"Ayushmaan Sandeepkumar Singh"
},


{
id:13,
fullName:"Bhavya Pareshbhai Poshiya"
},


{
id:14,
fullName:"Chaitanyasinh Vijaysinh Barad"
},


{
id:15,
fullName:"Daivik Manojbhai Patel"
},


{
id:16,
fullName:"Daksh Anilbhai Mangroliya"
},

{
id:17,
fullName:"Daksh Deepak Vasa"
},


{
id:18,
fullName:"Daksh Dipakkumar Patel"
},


{
id:19,
fullName:"Darsh Divyeshbhai Ramani"
},


{
id:20,
fullName:"Darsh Pradip Ramjiyani"
},


{
id:21,
fullName:"Denis Vinod Prajapati"
},


{
id:22,
fullName:"Dev AshishKumar Patel"
},


{
id:23,
fullName:"Dev Sandipbhai Chudasma"
},


{
id:24,
fullName:"Devansh Hiteshbhai Patel"
},


{
id:25,
fullName:"Dhairya Alkeshkumar Patel"
},


{
id:26,
fullName:"Dhairya Bhavesh Gadhiya"
},


{
id:27,
fullName:"Dhairya Bhavesh Parsaniya"
},


{
id:28,
fullName:"Dhairya Pareshbhai Maiyani"
},


{
id:29,
fullName:"DhairyaSingh Madanlal Yadav"
},


{
id:30,
fullName:"Dhanush Krunal Vansdeviya"
},


{
id:31,
fullName:"Dharm Hasmukhbhai Akoliya"
},


{
id:32,
fullName:"Dharv Bharatbhai Jesadia"
},


{
id:33,
fullName:"Dhruv Maheshbhai Parmar"
},


{
id:34,
fullName:"Dhruv Manojbhai Maniya"
},


{
id:35,
fullName:"Dhruvansh Pradipbhai Maniya"
},


{
id:36,
fullName:"Disharth Mahendrabhai Radadiya"
}

];



// NOTE:
// Remaining student names continue in PART 1/3 continuation
// due to JavaScript file size limit.







// ===============================
// NAME EXTRACTION FUNCTIONS
// ===============================


function getFirstName(fullName){

    return fullName
    .trim()
    .split(" ")[0];

}




function getParentName(fullName){

    let parts =
    fullName
    .trim()
    .split(" ");


    if(parts.length > 2){

        return parts[1];

    }


    return "";

}







// ===============================
// CREATE DISPLAY NAME
// ===============================


function generateDisplayNames(){


let firstNameCount={};



students.forEach(student=>{


let first =
getFirstName(student.fullName);



firstNameCount[first] =
(firstNameCount[first] || 0)+1;



});




students.forEach(student=>{


let first =
getFirstName(student.fullName);



let parent =
getParentName(student.fullName);



if(firstNameCount[first] > 1){


student.displayName =
`${first} (${parent})`;


}

else{


student.displayName =
first;


}



});


}









// ===============================
// LOAD STUDENTS TO DROPDOWN
// ===============================


function loadStudents(){


generateDisplayNames();


const dropdown =
document.getElementById("studentSelect");



students.forEach(student=>{


let option =
document.createElement("option");



option.value =
student.id;



option.textContent =
student.displayName;



dropdown.appendChild(option);



});



}









// ===============================
// REGISTRATION SYSTEM
// ===============================


let selectedStudent = null;


let selectedPeople = 1;





function initializeRegistration(){



const studentDropdown =
document.getElementById("studentSelect");



const peopleDropdown =
document.getElementById("peopleSelect");



studentDropdown.addEventListener(
"change",
function(){


selectedStudent =
students.find(
student =>
student.id == this.value
);



}

);





peopleDropdown.addEventListener(
"change",
function(){


selectedPeople =
Number(this.value);



updateBudget();



}

);






document
.getElementById("startOrderBtn")
.addEventListener(
"click",
validateRegistration
);



}









// ===============================
// REGISTRATION VALIDATION
// ===============================


function validateRegistration(){



if(!selectedStudent){


alert(
"Please select your name first."
);


return;


}




let deviceOrder =
localStorage.getItem(
"deviceOrder"
);




if(deviceOrder){


alert(
"Your order has already been submitted."
);


return;


}






localStorage.setItem(

"currentStudent",

JSON.stringify({

id:selectedStudent.id,

name:selectedStudent.fullName,

people:selectedPeople

})

);





document
.getElementById("menuSection")
.classList
.remove("hidden");




window.scrollTo({

top:
document
.getElementById("menuSection")
.offsetTop,

behavior:"smooth"

});



}









// ===============================
// BUDGET CALCULATION
// ===============================


function updateBudget(){


let amount =
selectedPeople * 220;



let budget =
document.getElementById(
"budgetAmount"
);



if(budget){

budget.innerHTML =
"₹" + amount;

}


}
