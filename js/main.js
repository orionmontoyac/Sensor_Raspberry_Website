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
    var temp = document.getElementById('temperatura');
    var dbRef = firebase.database().ref().child('Temperatura');
    dbRef.on('value', snap => temp.innerText = snap.val());

    var hume = document.getElementById('humedad');
    dbRef = firebase.database().ref().child('Humedad');
    dbRef.on('value', snap => hume.innerText = snap.val());

    var vtemp;
    dbRef = firebase.database().ref().child('temp');
    dbRef.on('value', snap => vtemp = snap.val());
}
//------------------------------------VARIABLES-----------------------------------------------//

intemp = Array.apply(null, Array(50)).map(Number.prototype.valueOf,0);//VALOR INICIAL TEMPERATURA DEL GRAFICO
time = Array.apply(null, {length: 50}).map(Number.call, Number)//VECTOR TIEMPO

//------------------------------------GRAFICA-----------------------------------------------//
Grafica: {
    $(document).ready(function () {
    time = Array.apply(null, {length: 50}).map(Number.call, Number)
        var datos = {
            labels: time,
            datasets: [{
                label: "Temperatura",
                backgroundColor: "rgba(235, 101, 18, 0.7)",
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
                            max: 10,
                        }
                            }]
                },
                elements: {
                    rectangle: {
                        borderWidth: 1,
                        borderColor: "rgb(0,255,0)",
                        borderSkipped: 'bottom'
                    }
                },
                responsive: true,
                title: {
                    display: true,
                    text: "Temperatura Cuarto"
                }
            }
        });

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

        function getRandom() {

            return Math.round(Math.random() * 100);
        }

    });

}
