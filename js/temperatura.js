//------------------------------------FUNCIONES-----------------------------------------------//
function sum(input){
             
 if (toString.call(input) !== "[object Array]")
    return false;
      
            var total =  0;
            for(var i=0;i<input.length;i++)
              {                  
                if(isNaN(input[i])){
                continue;
                 }
                  total += Number(input[i]);
               }
             return total;
            }
function sendMail() {
    var link = "orion.montoya@udea.edu.co"             
             + "&subject=" + escape("This is my subject")
             + "&body=" + escape('Alerta_de_temperatura_alta')
    ;
    window.location.href = link;
}
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
    dbRef.on('value', snap => temp.innerText = snap.val().concat(''));

    var vtemp;
    dbRef = firebase.database().ref().child('temp');
    dbRef.on('value', snap => vtemp = snap.val());
}
//------------------------------------CONSTANTES-----------------------------------------------//

intemp = Array.apply(null, Array(50)).map(Number.prototype.valueOf,0);//VALOR INICIAL TEMPERATURA DEL GRAFICO
time = Array.apply(null, {length: 50}).map(Number.call, Number)//VECTOR TIEMPO


Grafica: {    
    $(document).ready(function () {
//------------------------------------GRAFICA TEMPERATURA---------------------------------------//     
        var datos = {
            labels: time,
            datasets: [{
                label: "Temperatura",
                backgroundColor: "rgba(22, 49, 165, 0.7)",
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
                            max: 35,
                        }
                            }]
                },
                responsive: true,
                title: {
                    display: true,
                    text: "Temperatura Cuarto en °C"
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
            document.getElementById('temperaturamax').innerText = Math.max(...vtemp).toString().concat('°C');//TEMPERATURA MAXIMA
            document.getElementById('temperaturamin').innerText = Math.min(...vtemp).toString().concat('°C');//TEMPERATURA MINIMA
            document.getElementById('temperaturapromedio').innerText = Math.round((sum(vtemp)/vtemp.length),-1).toString().concat('°C');//TEMPERATURA PROMEDIO
            document.getElementById('temperaturacuarto').innerText = vtemp[vtemp.length - 1].toString().concat('°C');
            if(vtemp[vtemp.length - 1]>40){
               alert('Alerta temperatura');                
               }
            window.line.update();
        }, 1500);
        
    });

}
