function init(){
    stars = 0;
    roule=0.1;
    rota=0;
    nbbonus = 0;
    let params = new URLSearchParams(location.search).get('username');
    username = params;
    succeslock = [10,1000,100000];
    class Planete{
        constructor(navion_price,navion_owned,satelite_price,satelite_owned,fusee_price,fusee_owned){
            this.navion_price = navion_price;
            this.navion_owned = navion_owned;
            this.satelite_price = satelite_price;
            this.satelite_owned = satelite_owned;
            this.fusee_owned = fusee_owned;
            this.fusee_price = fusee_price;
        }
    }
    terre = new Planete(100,0,100,0,100000,0);
    jupiter = new Planete(100000000,0,100000000,0,10000000000,0);
    document.getElementById("compteur").innerText = stars;
    update();
}

function sauvegarde(){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitement;
    httpRequest.open('POST', 'https://sae-301.azurewebsites.net/save-score.php', true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({"username": username, "score": stars, 'force': true});
    httpRequest.send(data);
}

function traitement(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
        console.log(httpRequest.responseText);
    } else {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAH')
    }
    }
   }

function succes(){
    if(succeslock != []){
    for (val of succeslock){
        if(stars >= val){
            temp = succeslock.indexOf(val);
            console.log(val);
            succeslock.splice(temp, 1);
            document.getElementById(val).style.backgroundColor = '#264b2bc5';
        }
    }
        if(nbbonus >= 1){
            document.getElementById('bonus1').style.backgroundColor = '#264b2bc5';
        }
    }
}

function addstars(){
    stars = stars + 1 + 10 * terre.navion_owned + 100 * jupiter.navion_owned + 10000 * terre.fusee_owned;
    update();
}

function changeskin(x){
    document.getElementById('planete-image').src = 'ressources/image/'+x+'.png';
}

function update(x){
    succes();
    document.getElementById("compteur").innerText = stars;
    document.getElementById("terre-navion-price").innerText = terre.navion_price;
    document.getElementById("terre-navion-owned").innerText = terre.navion_owned;
    document.getElementById("terre-satelite-price").innerText = terre.satelite_price;
    document.getElementById("terre-satelite-owned").innerText = terre.satelite_owned;
    document.getElementById("terre-fusee-price").innerText = terre.fusee_price;
    document.getElementById("terre-fusee-owned").innerText = terre.fusee_owned;
    document.getElementById("jupiter-navion-price").innerText = jupiter.navion_price;
    document.getElementById("jupiter-navion-owned").innerText = jupiter.navion_owned;
    document.getElementById("jupiter-satelite-price").innerText = jupiter.satelite_price;
    document.getElementById("jupiter-satelite-owned").innerText = jupiter.satelite_owned;
    document.getElementById("jupiter-fusee-price").innerText = jupiter.fusee_price;
    document.getElementById("jupiter-fusee-owned").innerText = jupiter.fusee_owned;
}

function divopen(x){
    let open = document.getElementById(x+'-inter');
    console.log('amelio-'+x+'-open');
    if(open.className == 'amelio-open'){
        open.classList = 'amelio-close';
    } else {
        open.classList = 'amelio-open';
    }
}

function menuopen(x){
    let menu = document.getElementById(`${x}-menu`);
    if(menu.className == `${x}-menu-open`){
        menu.classList = `${x}-menu-closed`;
    } else {
        menu.classList = `${x}-menu-open`;
    }
}

function terrenavion(){
    if(stars >= terre.navion_price){
        stars -= terre.navion_price;
        terre.navion_price = Math.round(terre.navion_price * 1.5);
        terre.navion_owned += 1;
        nbbonus++;
    }
    update();
}

function terresatelite(){
    if(stars >= terre.satelite_price){
        stars -= terre.satelite_price;
        terre.satelite_price = Math.round(terre.satelite_price * 1.5);
        terre.satelite_owned += 1;
        nbbonus++;
    }
    update();
}

function terrefusee(){
    if(stars >= terre.fusee_price){
        stars -= terre.fusee_price;
        terre.fusee_price = Math.round(terre.fusee_price*3);
        terre.fusee_owned += 1;
        nbbonus++;
    }
    update();
}

function jupiternavion(){
    if(stars >= jupiter.navion_price){
        stars -= jupiter.navion_price;
        jupiter.navion_price = Math.round(jupiter.navion_price * 1.5);
        jupiter.navion_owned += 1;
        nbbonus++;
    }
    update();
}

function jupitersatelite(){
    if(stars >= jupiter.satelite_price){
        stars -= jupiter.satelite_price;
        jupiter.satelite_price = Math.round(jupiter.satelite_price * 1.5);
        jupiter.satelite_owned += 1;
        nbbonus++;
    }
    update();
}

function jupiterfusee(){
    if(stars >= jupiter.fusee_price){
        stars -= jupiter.fusee_price;
        jupiter.fusee_price = Math.round(jupiter.fusee_price*3);
        jupiter.fusee_owned += 1;
        nbbonus++;
    }
    update();
}

setInterval(() => {
    stars += 10 * terre.satelite_owned + 100 * jupiter.satelite_owned + 1000 * terre.fusee_owned;
    update();
}, 1000);

setInterval(() => {
    sauvegarde();
}, 300000);

function rotate(){
    rota += roule
    if(rota >= 360){
        rota=0; 
    }
    document.querySelector('#planete-image').style.transform = "rotate(" + rota + "deg)";
}

roll = setInterval(rotate,100);

init();