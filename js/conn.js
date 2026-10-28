function pseudo(){
    let pseudo = document.getElementById('username').value;
    if(pseudo.length < 5){
        alert('votre pseudo doit contenir plus de 5 caractères');
    } else {
        window.location.href = "game.html?username=" + pseudo;
    }
}