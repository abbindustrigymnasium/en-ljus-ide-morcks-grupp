#include <ESP8266WiFi.h>     
//BÃ¥de ArduinoJson och Wifimanager måste installeras som bibliotek, de finns med i bibliotekskatalogen, ArduinoJSon versionen som ska användas 5.13 och inte senaste.     
#include <ArduinoJson.h> // V 5.13 
//behövs för bibliotek
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager
#define DI_Dark 13 // D7
#define DI_Light 15 // D8

void setup() {
      pinMode(DI_Dark, INPUT); //Tillkännager DI_Dark som input
      pinMode(DI_Light, INPUT); //Tillkännager DI_Light som input
 
    Serial.begin(115200);
  
    WiFiManager wifiManager;
    wifiManager.autoConnect("ljuside7");
    Serial.println("connected...yeey :)");// Skrivs ut i serial monitor när NodeMCU blir uppkopplad till wifi

}
bool Dark = false;//tillkännager 
bool Light = false;
 
 String id="404"; //Lampans namn
 int temp=0; //Temperaturen
 int styrka= 0; //Styrkan
 bool LampExist=false; //Finns lampan redan eller Ã¤r den ny?
 bool GottenValues = false; //Har vi hÃ¤mtat nÃ¥gra vÃ¤rden redan frÃ¥n databasen?

String GetfromDB(String host){
String url= "/grupp7/"+id; //Urlen jag anvÃ¤nder fÃ¶r att posta mina vÃ¤rden
  // Detta skickar vÃ¤rdena till servern.
   String Output ="GET "+ url + " HTTP/1.1\r\n" + //SÃ¤ger att det Ã¤r typen post, kan vara patch, get,delete beroende pÃ¥ vad man vill gÃ¶ra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //BerÃ¤ttar vilken host det Ã¤r vi ansluter till
                 "\r\nConnection: close\r\n\r\n"; //skickar vÃ¥r buffer som  body
 return Output;
}

String SendtoDB(String host){
  String type ="POST ";
  if(GottenValues==true)
  {
  String url= "/grupp7/404"; //Urlen jag anvÃ¤nder fÃ¶r att posta mina vÃ¤rden
   
  StaticJsonBuffer<300> jsonBuffer; //Skapar en buffer, det vill sÃ¤ga sÃ¥ mycket minne som vÃ¥rt blivande jsonobjekt fÃ¥r anvÃ¤nda.
  JsonObject& root = jsonBuffer.createObject(); //Skapar ett jsonobjekt som vi kallar root
  root["id"] = id; //Skapar parameterna name och ger den vÃ¤rdet Vykort
  root["temp"] = temp;
  root["ljus"] = styrka;// Samma som ovan
  String buffer;  //Skapar en string som vi kallar buffer
  root.printTo(buffer); //LÃ¤gger Ã¶ver och konverterar vÃ¥rt jsonobjekt till en string och sparar det i buffer variabeln.
  if(LampExist==true)
  {
  type ="PATCH ";
      Serial.println("Uppdaterar vÃ¤rdet!");
  }
//hÃ¤r nÃ¥gonstans ska jag anvÃ¤dna POST eller PATCH beroende pÃ¥ om vÃ¤rdet finns!!!!
  // Detta skickar vÃ¤rdena till servern.
   String Output =type+url + " HTTP/1.1\r\n" + //SÃ¤ger att det Ã¤r typen post, kan vara patch, get,delete beroende pÃ¥ vad man vill gÃ¶ra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //BerÃ¤ttar vilken host det Ã¤r vi ansluter till
                 "Content-Type: application/json\r\n" + //SÃ¤ger att det Ã¤r Json format vi skickar (dock konverterat till en string fÃ¶r att kunna skickas.
                 "Content-Length: " + buffer.length() + "\r\n" + //BerÃ¤ttar hur stort packet vi ska skicka.
                 "\r\n" + // Detta Ã¤r en extra radbrytning fÃ¶r att berÃ¤tta att det Ã¤r hÃ¤r bodyn startar.
                 buffer + "\n"; //skickar vÃ¥r buffer som  body
 
 return Output;
  }
  else
  return "";
}

void ConnecttoDB(String input){

   const int httpPort = 3001; //porten vi ska till
  const char* host = "iot.abbindustrigymnasium.se";//Adressen vi ska ansluta till. 7Laddaremygglustbil "http://iot.abbindustrigymnasium.se"
    
     Serial.print("connecting to ");
 Serial.println(host); //Skriver ut i terminalen fÃ¶r att veta vart vi ska skicka vÃ¤rdena.
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, httpPort)) { //FÃ¶rsÃ¶ker ansluta
    Serial.println("connection failed");
    return;
  }
  else  //Om vi kan ansluta sÃ¥ ska wohoo skrivas
  {
    Serial.print("Wohoo");
    }
if(input =="GET")
client.print(GetfromDB(host));
else
client.print(SendtoDB(host));

  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 10000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

String json = ""; //De delarna vi vill ha ut av meddelandet sparar vi i stringen json
boolean httpBody = false; //bool fÃ¶r att sÃ¤a att vi har kommit ner till bodydelen
// tittar om vi har anslutit till clienten
while (client.available()) {
  String line = client.readStringUntil('\r'); //LÃ¤ser varje rad tills det Ã¤r slut pÃ¥ rader
  if (!httpBody && line.charAt(1) == '{') { //Om vi hittar { sÃ¥ vet vi att vi har nÃ¥tt bodyn
    httpBody = true; //boolen blir true fÃ¶r att vi ska veta fÃ¶r nÃ¤sta rad att vi redan Ã¤r i bodyn
  }
  if (httpBody) { //Om bodyn Ã¤r sann lÃ¤gg till raden i json variabeln
    json += line;
  }
}
//Skriver ut bodyns data
    Serial.println("Got data:");
    Serial.println(json);
  if(input =="GET") //Om det Ã¤r Get sÃ¥ kÃ¶r vi metoden UpdateValues
    UpdateValues(json);

  Serial.println();
  Serial.println("closing connection");
}

void UpdateValues(String json){
      //Vi skapar ett Jsonobjekt dÃ¤r vi klistrar in vÃ¤rdena frÃ¥n bodyn
      StaticJsonBuffer<400> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(json);
    //Vi skapar sedan lokala strings dÃ¤r vi lÃ¤gger Ã¶ver vÃ¤rdena en i taget
    String dataN = root["id"];
   if(dataN!="none")
         {
    int dataT = root["temp"];
    int dataL = root["ljus"];
    //Därefter skriver vi över de lokala värdena till våra globala värden för lampan
     id = dataN; 
     temp =dataT;
     styrka = dataL;

       LampExist=true;
     Serial.print(styrka);
         }
         else
         {
          String Mess =root["message"];
         Serial.print(Mess);
         }
  GottenValues = true;
}




void loop() {
   ConnecttoDB("GET");
   UpdateValues;
 bool Light = digitalRead(DI_Light);
 bool Dark = digitalRead(DI_Dark);
 Serial.println(digitalRead(DI_Light));
 Serial.println(digitalRead(DI_Dark));
 
 if(Light == true){
  styrka = styrka + 10;
 }
  else if (Dark == true){
    styrka = styrka - 10;
  }
    else {
      styrka = styrka;
    }
  
 
 Serial.println(styrka);
 ConnecttoDB("POST");
}
   

 
 

