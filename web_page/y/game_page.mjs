
generate_random_arr = function(N, total, flag) {
    var arr = [];
    while(arr.length < N){
        var r = Math.floor(Math.random() * total) + 10*(1-flag);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

display_img = function(img_id,country,database) {
    var img = document.getElementById(img_id);
    var cap = document.getElementById(img_id+'_cap')
    cap.textContent = country
    var newImg = new Image;
    newImg.onload = function() {
        img.src = this.src;
    } 
    var req = new XMLHttpRequest();
    req.open('GET', "https://restcountries.eu/rest/v2/name/"+country, false);
    req.send(null);
    if (req.status =="404") {
        newImg.src="https://img.icons8.com/pastel-glyph/64/000000/error.png";
    }
    else {
        json = JSON.parse(req.responseText);
        newImg.src="https://www.countryflags.io/"+json[0]["alpha2Code"]+"/flat/64.png";
    }
}

load_flag = function (country,database) {
    display_img('main_img',country)

    var list_for_country = Object.values(sim_countries[country]);
    var close_flag = Math.round(Math.random())
    var question_text = document.getElementById("question_text")
    if (close_flag == true) {
        question_text.innerHTML = "<p>What is the most <b>similar</b> country to:</p>"
    }
    else {
        question_text.innerHTML = "<p>What is the most <b>dissimilar</b> country to:</p>"
    }
    var random_indices = generate_random_arr(5, 10, close_flag);

    for (j=0;j<5;j++) {
        display_img('img'+j, list_for_country[random_indices[j]])
    }

    var imgs = new Array();
    imgs.push(document.getElementById("img0"));
    imgs.push(document.getElementById("img1"));
    imgs.push(document.getElementById("img2"));
    imgs.push(document.getElementById("img3"));
    imgs.push(document.getElementById("img4"));

    var new_row = new Map();
    new_row.set('user',localStorage.getItem("user"));
    new_row.set('user_country',localStorage.getItem("user_country"));
    new_row.set('country',country);
    new_row.set('close',close_flag);
    new_row.set('options',random_indices);
    for (i=0;i<5;i++){
        const to_set = i;
        imgs[i].onclick = function() {
            new_row.set('selected',random_indices[to_set]);
            console.log(new_row)
            writeData(new_row,database);
            location.reload();
        }
    }
    
}

function onLoadFunc() {
    document.getElementById("page").style.display = "block";
    document.getElementById("loading").style.display = "none";

    var ans = new Array()
    var countries = Object.keys(sim_countries);
    var reload = document.getElementById("try_another");
    reload.onclick = function () {
        console.log(ans)
        location.reload();
    }
    const random_country = countries[Math.floor(Math.random() * countries.length)];

    var database = firebase.database();

    load_flag(random_country, database);

}

function writeData(row,database) {
    var d = new Date();
    let userRef = database.ref('records/');
    userRef.child(localStorage.getItem("user")+'_'+d.getTime()).set({
        user:row.get('user'),
        userCountry:row.get('user_country'),
        country:row.get('country'),
        close:row.get('close'),
        selected:row.get('selected'),
        options:row.get('options'),
    });
}

