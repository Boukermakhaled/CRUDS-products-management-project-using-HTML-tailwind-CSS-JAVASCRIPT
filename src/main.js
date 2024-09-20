let title = document.getElementById("title");
let price = document.getElementById("Price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let total_m = document.getElementById("total-m");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let searsh_i = document.getElementById("searsh-i");
let searsh_t = document.getElementById("searsh-t");
let searsh_c = document.getElementById("searsh-c");
// let delete_a = document.getElementById("delete-a");
let delete_e = document.getElementById("delete");
let update = document.getElementById("update");
 let tmp;
 let mood='create';
// total price

 function totPrice (){
    if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total_m.style.backgroundColor="#00832c";    
    }else{
    total.innerHTML = "";
    total_m.style.backgroundColor="#991b1b";
}
}

//storage of data 
let datArray;
if(localStorage.product != null){
    datArray = JSON.parse(localStorage.product);
}else{
 datArray=[];
}
submit.onclick = function (){
    let prod = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    amount:amount.value || 1,
    category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value !='' && category.value !=''){
    if(mood === 'create'){
    if(prod.amount > 1){
        for(let i=0 ; i<prod.amount ; i++){
            datArray.push(prod);
        }
    }else{
        datArray.push(prod);
    }
    // console.log(datArray);
    localStorage.setItem('product', JSON.stringify(datArray));
    // localStorage.clear();
    clearInputs();
    addTable();
}else if(mood === 'update'){
    datArray[tmp] = prod;
    localStorage.setItem('product', JSON.stringify(datArray));
    clearInputs();
    addTable();
    submit.innerHTML = "Create";
    submit.style.backgroundColor = "#581c87";
    amount.style.display = "block";
    mood = 'create';
}
totPrice();
}
}
//clear inputs
function clearInputs(){
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   taxes.value='';
   discount.value='';
   amount.value='';
   category.value='';
   total.innerHTML='';
}
//adding to table
function addTable (){
    let tab='';
    // let tr = document.getElementsByTagName("tr");
    for(let i=0 ; i<datArray.length ; i++){
      tab += `<tr id="prod">
                    <td>${i+1}</td>
                    <td>${datArray[i].title}</td>
                    <td>${datArray[i].price}</td>
                    <td>${datArray[i].taxes}</td>
                    <td>${datArray[i].ads}</td>
                    <td>${datArray[i].discount}</td>
                    <td>${datArray[i].total}</td>
                    <td>${datArray[i].category}</td>
                    <td>
                    <button onclick="updateData(${i})" class="bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="update">UPDATE</button></td>
                    <td>
                    <button onclick="deleteData(${i})" class="bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="delete">DELETE</button></td>
            </tr>`
            document.getElementById("tbody").innerHTML = tab;
            let divAll = document.getElementById("dellAll");
            if(datArray.length > 0){
                divAll.innerHTML = `<button onclick="dellitems()" class="w-full bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="dla">Delete All (<span>${datArray.length}</span>)</button>`
                
            }
            
    }
}
addTable();
//delete item
function deleteData(i){
    console.log(i);
    datArray.splice(i,1);
    localStorage.product = JSON.stringify(datArray);
    addTable();
}
// ... existing code ...

// Delete all items
function dellitems() {
    datArray = [];
    localStorage.removeItem('product');
    document.getElementById("tbody").innerHTML = '';
    document.getElementById("dellAll").innerHTML = '';
}

function updateData(i){
    console.log(i);
    mood = 'update';
    scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    amount.style.display = "none";
    title.value = datArray[i].title;
    price.value = datArray[i].price;
    taxes.value = datArray[i].taxes;
    ads.value = datArray[i].ads;
    discount.value = datArray[i].discount;
    amount.value = datArray[i].amount;
    category.value = datArray[i].category;
    total.innerHTML = datArray[i].total;
    submit.innerHTML = "Update";
    submit.style.backgroundColor = "#00832c";
    totPrice();
    tmp = i;    
    
}       
 // searsh
 let searchMode='title';
 function getSearchMode(id){
   if(id === "search-t"){
   searchMode = 'title';
   }else if(id === "search-c"){
   searchMode = 'category';
   }
   console.log(searchMode);
searsh_i.focus();
searsh_i.value='';
searsh_i.placeholder = 'search by '+ searchMode;
addTable();
 }

 function searchFunc(value){
    let tab='';
    for(let i=0 ; i < datArray.length ; i++){
    if(searchMode=== 'title'){
        // console.log(searshMode);

    
        if(datArray[i].title.includes(value.toLowerCase())){
            tab += `<tr id="prod">
            <td>${i+1}</td>
            <td>${datArray[i].title}</td>
            <td>${datArray[i].price}</td>
            <td>${datArray[i].taxes}</td>
            <td>${datArray[i].ads}</td>
            <td>${datArray[i].discount}</td>
            <td>${datArray[i].total}</td>
            <td>${datArray[i].category}</td>
            <td>
            <button onclick="updateData(${i})" class="bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="update">UPDATE</button></td>
            <td>
            <button onclick="deleteData(${i})" class="bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="delete">DELETE</button></td>
    </tr>`
        }
    
    }else{
        // console.log(searshMode);
       
            if(datArray[i].category.includes(value.toLowerCase())){
                tab += `<tr id="prod">
                <td>${i+1}</td>
                <td>${datArray[i].title}</td>
                <td>${datArray[i].price}</td>
                <td>${datArray[i].taxes}</td>
                <td>${datArray[i].ads}</td>
                <td>${datArray[i].discount}</td>
                <td>${datArray[i].total}</td>
                <td>${datArray[i].category}</td>
                <td>
                <button onclick="updateData(${i})" class="bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="update">UPDATE</button></td>
                <td>
                <button onclick="deleteData(${i})" class="bg-purple-900 h-[35px] rounded-full text-[16px] font-medium  px-3 " id="delete">DELETE</button></td>
        </tr>`
            }
        
    }
}
    document.getElementById("tbody").innerHTML = tab;

 }