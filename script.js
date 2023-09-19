document.querySelector("#total_use span").innerHTML = 0;


function use_add() {

    let use_topic = document.getElementById("use_topic").value;
    let use_price = document.getElementById("use_price").value;
    document.getElementById("use_topic").value = "";
    document.getElementById("use_price").value = "";

    let currentDate = new Date().toLocaleString();

    document.getElementById("add_alert").style.display = "block";
    setTimeout(() => {
        document.getElementById("add_alert").style.display = "none";
    }, 3000);


    if (localStorage.getItem("use") == null) {
        let obj = [];
        obj.push([use_topic, use_price, currentDate]);
        localStorage.setItem("use", JSON.stringify(obj));
    }
    else {
        let obj = JSON.parse(localStorage.getItem("use"));
        obj.push([use_topic, use_price, currentDate]);
        localStorage.setItem("use", JSON.stringify(obj));
    }
    load();
}

load();
function load() {
    document.getElementById("tasks").innerHTML = "";
    document.querySelector("#total_use span").innerHTML = 0;

    if (localStorage.getItem("use") != null) {

        let obj = JSON.parse(localStorage.getItem("use"));

        obj.forEach((ele, ind) => {

            document.getElementById("tasks").innerHTML += `
            <div class="card-body">
                <h5 class="card-title topic_name_card">Topic : ${obj[ind][0]}</h5>
                <p class="card-text topic_price_card">Price : ${obj[ind][1]} INR</p>
                <p class="card-text topic_date_card">Date : ${obj[ind][2]}</p>
                <button class="btn btn-danger" onclick="delete_use(${ind})">Delete</button>
            </div>
        
            `
            let use = Number(document.querySelector("#total_use span").innerHTML);
            use = use + Number(obj[ind][1]);
            document.querySelector("#total_use span").innerHTML = use;

        })
    }
}

let temp;
function delete_use(ind) {
    document.getElementById("delete_modal").style.display = "block";
    temp = ind;
}

document.getElementById("modal_yes_btn").addEventListener("click", () => {

    let obj = JSON.parse(localStorage.getItem("use"));
    obj.splice(temp, 1);

    localStorage.setItem("use", JSON.stringify(obj));

    load();

    document.getElementById("delete_alert").style.display = "block";
    setTimeout(() => {
        document.getElementById("delete_alert").style.display = "none";
    }, 3000);
    document.getElementById("delete_modal").style.display = "none";

})

function modal_no_btn() {
    document.getElementById("delete_modal").style.display = "none";
}