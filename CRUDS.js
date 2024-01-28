let title = document.getElementById('Title');
let price = document.getElementById('price');
let taxes = document.getElementById('Taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('Discount');
let total = document.getElementById('total2');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let Update2 = document.getElementById('Update-btn');
let Delete2 = document.getElementById('Delete-btn');
let mode = 'create';
let tmp;
//get total
function get_total() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = '#040'
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}
//create product
let datapro;
//save product
if (localStorage.Products != null) {
    datapro = JSON.parse(localStorage.Products)
}
else {
    datapro = [];
}
submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value != '' && count.value <= 100 && price.value != '' && category.value != '') {
        if (mode === 'create') {
            //Couter
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro)
                }
            }
            else {
                datapro.push(newpro)
            }
        }
        else {

            datapro[tmp] = newpro
            mode = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
        clear_data()
    }

    localStorage.setItem('Products', JSON.stringify(datapro))
    console.log(datapro);

    showdata()
}
//clear data
function clear_data() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//Read Product
function showdata() {
    get_total();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table +=
            `<tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatefun(${i})" id="Update-btn">Update</button></td>
        <td><button onclick="Deletdata(${i})" id="Delete-btn">Delete</button></td>
       </tr> `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndelete.innerHTML = `
        <button onclick="Delete_All()">Delete All (You Have ${datapro.length} Products)</button>
        `
    }
    else {
        btndelete.innerHTML = '';
    }
}
showdata()
//Delete
function Deletdata(i) {
    datapro.splice(i, 1);
    localStorage.Products = JSON.stringify(datapro);
    showdata()
}
//Delet All Products
function Delete_All() {
    localStorage.clear()
    datapro.splice(0)
    showdata()
}
//Update
function updatefun(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    taxes.value = datapro[i].taxes;
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'Update'
    tmp = i;
    get_total();
    scroll({ top: 0, behavior: "smooth" })
}
//Search
let searchmode = "Title";

function getsearchmode(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchmode = 'title';
        search.placeholder = 'Search By Title';
    }
    else {
        searchmode = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
}

function searchdata(value) {
    let table = '';
    if (searchmode == 'title') {

        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value)) {
                table +=
                    `<tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatefun(${i})" id="Update-btn">Update</button></td>
            <td><button onclick="Deletdata(${i})" id="Delete-btn">Delete</button></td>
           </tr> `
            }
        }

    }
    else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value)) {
                table +=
                    `<tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatefun(${i})" id="Update-btn">Update</button></td>
            <td><button onclick="Deletdata(${i})" id="Delete-btn">Delete</button></td>
           </tr> `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
//Clean Data
