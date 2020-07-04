var start_butt = document.getElementById("start_butt");
var submit = document.getElementById("submit");

start_butt.style.display = 'none'

submit.onclick = function() {
    var user = document.getElementById("name").value;
    var user_country = document.getElementById("country").value;
    var explanation = document.getElementById("explanation");
    if (user == "" || user_country == "") {
        if (user == "") 
        {
            document.getElementById("name").className = document.getElementById("name").className + " error";
            return;
        }
        else 
        {
            document.getElementById("name").className = document.getElementById("name").className.replace(" error", ""); 
        }
        if (user_country == "") 
        {
            document.getElementById("country").className = document.getElementById("country").className + " error";
            return;
        }
        else 
        {
            document.getElementById("country").className = document.getElementById("country").className.replace(" error", ""); 
        }
    }
    var countries_list = Object.keys(sim_countries);

    if (countries_list.includes(user_country)) {
        explanation.textContent = "Great! ready to begin.\nThe first 2 questions will be about your country.";
    }
    else {
        explanation.textContent = "Great! ready to begin.";
    }
    start_butt.style.display = 'block';
}

start_butt.onclick = function() {
    var user_country = document.getElementById("country").value;
    var user = document.getElementById("name").value;
    localStorage.setItem("user",user);
    localStorage.setItem("user_country",user_country);
    location.href = "./game_page.html";
}
