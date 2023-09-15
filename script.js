document.querySelector("#total_use span").innerHTML = 0;


function use_add() {

    let use_topic = document.getElementById("use_topic").value;
    let use_price = document.getElementById("use_price").value;
    document.getElementById("use_topic").value = "";
    document.getElementById("use_price").value = "";

    let currentDate = new Date().toLocaleString();
   

    // let use = Number(document.querySelector("#total_use span").innerHTML);
    // use = use + Number(use_price);
    // document.querySelector("#total_use span").innerHTML = use;

    // document.getElementById("tasks").innerHTML += `
    //     <div class="card-body">
    //         <h5 class="card-title topic_name_card">${use_topic}</h5>
    //         <p class="card-text topic_price_card">${use_price}</p>
    //         <a href="#" class="btn btn-primary">Delete</a>
    //     </div>

    // `

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
                <h5 class="card-title topic_name_card">${obj[ind][0]}</h5>
                <p class="card-text topic_price_card">${obj[ind][1]}</p>
                <p class="card-text topic_date_card">${obj[ind][2]}</p>
                <button class="btn btn-primary" onclick="delete_use(${ind})">Delete</button>
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
document.getElementById("modal_no_btn").addEventListener("click", () => {
    document.getElementById("delete_modal").style.display = "none";

})