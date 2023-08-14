const form = document.querySelector("#form");
const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const input3 = document.querySelector("#input3");
const input4 = document.querySelector("#input4");
const list = document.querySelector("#ul");
const div1 = document.querySelector(".div1");
const div2 = document.querySelector(".div2");
const cocuklar = div1.children;

hamza();

function hamza() { // Tüm event Listenerlar

    form.addEventListener("submit", addd);
    document.addEventListener("DOMContentLoaded", loadAllItemsToUI);
    div2.addEventListener("click", deleteitem);
    input3.addEventListener("keyup", filteritems);
    input4.addEventListener("click", temizle);
}



function temizle(e) {

    if (confirm("her şeyi sil?")) {

        while (list.firstElementChild != null) {

            list.removeChild(list.firstElementChild);
        }
        localStorage.removeItem("items");
    }
}

function filteritems(e) {

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display : none !important");
        } else {

            listItem.setAttribute("style", "display : block");
        }
    });
}

function deleteitem(e) {

    if (e.target.className === "btn btn-dark") {
        e.target.parentElement.remove();
        deleteitemfromstorage(e.target.parentElement.textContent);
        ç
        showAlert("warning", "silindi!");
    }
}

function deleteitemfromstorage(deleteitem) {

    let items = getFromStorage();
    items.forEach(function (item, index) {
        if (item === deleteitem) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem("items", JSON.stringify(items));
}

function loadAllItemsToUI() {

    let items = getFromStorage();
    items.forEach(function (item) {
        addui(item);
    })
}

function addd(e) {

    const newitem = input1.value;

    if (newitem === "") {

        showAlert("danger", "bir şey yaz!");
    } else {

        addui(newitem);
        showAlert("success", "eklendi!");
        addToStorage(newitem);
    }
    e.preventDefault();
}

function addui(newitem) {

    const listitem = document.createElement("li");
    listitem.classList.add("list-group-item", "d-flex", "justify-content-between");
    const link = document.createElement("span");
    link.href = "#";
    link.classList.add("btn", "btn-dark");
    listitem.appendChild(document.createTextNode(newitem));
    listitem.appendChild(link);
    list.appendChild(listitem);
    input1.value = "";
}

function showAlert(type, message) {

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    div1.insertBefore(alert, cocuklar[1]);
    setTimeout(function () {

        alert.remove();
    }, 500)
}

function getFromStorage() {

    let items;

    if (localStorage.getItem("items") === null) {

        items = [];
    } else {

        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}

function addToStorage(newitem) {

    let items = getFromStorage();
    items.push(newitem);
    localStorage.setItem("items", JSON.stringify(items));
}