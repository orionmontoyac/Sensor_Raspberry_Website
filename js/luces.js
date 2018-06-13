//------------------------------------FIREBASE-----------------------------------------------//
firebase: {
    var config = {
        apiKey: "AIzaSyBGp1IPS8XDTo0h2ZqPT13dTL3LCLbC-2k",
        authDomain: "final-web-222da.firebaseapp.com",
        databaseURL: "https://final-web-222da.firebaseio.com",
        projectId: "final-web-222da",
        storageBucket: "final-web-222da.appspot.com",
        messagingSenderId: "661696090115"
    };
    firebase.initializeApp(config);

    //LLamado de variable desde FireBase
    var led1 = document.getElementById('led1');
    var dbRef = firebase.database().ref().child('led1');
    dbRef.on('value', snap => led1.innerText = snap.val().concat(''));

    var led2 = document.getElementById('led2');
    var dbRef = firebase.database().ref().child('led2');
    dbRef.on('value', snap => led2.innerText = snap.val().concat(''));

    var led1text;
    dbRef = firebase.database().ref().child('led1');
    dbRef.on('value', snap => led1text = snap.val());


    var led2text;
    dbRef = firebase.database().ref().child('led2');
    dbRef.on('value', snap => led2text = snap.val());
    console.log(led1text);

    var vtemp;
    dbRef = firebase.database().ref().child('luz');
    dbRef.on('value', snap => vtemp = snap.val());
}
//------------------------------------CONSTANTES-----------------------------------------------//

intemp = Array.apply(null, Array(50)).map(Number.prototype.valueOf,0);//VALOR INICIAL TEMPERATURA DEL GRAFICO
time = Array.apply(null, {length: 50}).map(Number.call, Number)//VECTOR TIEMPO

function changeColorLed() {
    if (led1text == "Encender") {
        document.getElementById("b1").style.color = 'black';
    } else {
        document.getElementById("b1").style.color = 'yellow';
    }
    if (led2text == "Encender") {
        document.getElementById("b2").style.color = 'black';
    } else {
        document.getElementById("b2").style.color = 'yellow';
    }
}

function comandButton1() {
    if (led1text == "Encender") {
        firebase.database().ref().child('/').update({
            led1: "Apagar"
        });
    } else {
        firebase.database().ref().child('/').update({
            led1: "Encender"
        });
    }
}

function comandButton2() {
    if (led2text == "Encender") {
        firebase.database().ref().child('/').update({
            led2: "Apagar"
        });
    } else {
        firebase.database().ref().child('/').update({
            led2: "Encender"
        });
    }
}

$(document).ready(function () {
    var btn = document.getElementsByTagName('button');
    btn[0].onclick = comandButton1;
    btn[1].onclick = comandButton2;
    setInterval(changeColorLed, 1000);


    var datos = {
        labels: time,
        datasets: [{
            label: "Luz",
            backgroundColor: "rgba(199, 222, 27, 0.7)",
            data: intemp
			}]
    };
    var canvas = document.getElementById('chart').getContext('2d');
    window.line = new Chart(canvas, {
            type: "line",
            data: datos,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                        }],
                    yAxes: [{
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            max: 1400,
                        }
                            }]
                },
                responsive: true,
                title: {
                    display: true,
                    text: "Intensidad de luz"
                }
            }
        });
    //------------------------------------GRAFICA ACTUALIZAR---------------------------------------//     

        setInterval(function () {
            
            var newData = [[], ];
            for (var i = 0; i < vtemp.length; i++) {
                newData[0].push(vtemp[i])
            }

            $.each(datos.datasets, function (i, dataset) {
                dataset.data = newData[i];                
            });       
            window.line.update();
        }, 1500);
});
