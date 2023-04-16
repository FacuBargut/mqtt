var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).send({msg:'Hola como va?'});
});

app.listen(PORT, () => {
  console.log(`Tu server esta listo para ejecutar las cositas de MQTT en el puerto ${PORT}`);
})



function EventoConectar() {
  client.subscribe("fresquito/#", function (err) {
    if (!err) {
      client.publish("fresquito/Temperatura", "30");
    }
  });
}

function EventoMensaje(topic, message) {
  if (topic == "fresquito/temp") {
    console.log("La Temperatura es " + message.toString());
  }
  console.log(topic + " - " + message.toString());
  // client.end()
}

client.on("connect", EventoConectar);
client.on("message", EventoMensaje);