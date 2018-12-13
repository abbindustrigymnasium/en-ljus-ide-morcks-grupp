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
 bool LampExist=false; //Finns lampan sen tidigare eller är den ny?
 bool GottenValues = false; //Har vi hämtat några värden från databasen redan?

String GetfromDB(String host){
String url= "/grupp7/"+id; //Urlen jag använder för att hämta mina värden
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
  String url= "/grupp7/404"; //Urlen jag använder för att posta mina värden
   
  StaticJsonBuffer<300> jsonBuffer; //Skapar en buffer, det vill säga så mycket minne som vårt blivande jsonobjekt får använda.
  JsonObject& root = jsonBuffer.createObject(); //Skapar ett jsonobjekt som vi kallar root
  root["id"] = id; //Skapar parameterna name och ger den värdet Vykort
  root["temp"] = temp;
  root["ljus"] = styrka;// Samma som ovan
  String buffer;  //Skapar en string som vi kallar buffer
  root.printTo(buffer); //Lägger över och konverterar vårt jsonobjekt till en string och sparar det i buffer variabeln.
  if(LampExist==true)
  {
  type ="PATCH ";
      Serial.println("Uppdaterar värdet!");
  }
//här någonstans ska jag anvädna POST eller PATCH beroende på om värdet finns!!!!
  // Detta skickar värdena till servern.
   String Output =type+url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //BerÃ¤ttar vilken host det Ã¤r vi ansluter till
                 "Content-Type: application/json\r\n" + //Säger att det är Json format vi skickar (dock konverterat till en string för att kunna skickas.
                 "Content-Length: " + buffer.length() + "\r\n" + //Berättar hur stort packet vi ska skicka.
                 "\r\n" + // Detta är en extra radbrytning för att berätta att det är här bodyn startar.
                 buffer + "\n"; //skickar vår buffer som  body
 
 return Output;
  }
  else
  return "";
}

void ConnecttoDB(String input){

   const int httpPort = 3001; //porten vi ska till
  const char* host = "iot.abbindustrigymnasium.se";//Adressen vi ska ansluta till. 7Laddaremygglustbil "http://iot.abbindustrigymnasium.se"
    
     Serial.print("connecting to ");
 Serial.println(host); //Skriver ut i terminalen får att veta vart vi ska skicka värdena.
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, httpPort)) { //Försöker ansluta
    Serial.println("connection failed");
    return;
  }
  else  //Om vi kan ansluta så ska wohoo skrivas
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
boolean httpBody = false; //bool får att säga att vi har kommit ner till bodydelen
// tittar om vi har anslutit till clienten
while (client.available()) {
  String line = client.readStringUntil('\r'); //Läser varje rad tills det Ã¤r slut på rader
  if (!httpBody && line.charAt(1) == '{') { //Om vi hittar { så vet vi att vi har nått bodyn
    httpBody = true; //boolen blir true får att vi ska veta för nästa rad att vi redan är i bodyn
  }
  if (httpBody) { //Om bodyn är sann lägg till raden i json variabeln
    json += line;
  }
}
//Skriver ut bodyns data
    Serial.println("Got data:");
    Serial.println(json);
  if(input =="GET") //Om det är Get så kör vi metoden UpdateValues
    UpdateValues(json);

  Serial.println();
  Serial.println("closing connection");
}

void UpdateValues(String json){
      //Vi skapar ett Jsonobjekt där vi klistrar in värdena från bodyn
      StaticJsonBuffer<400> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(json);
    //Vi skapar sedan lokala strings där vi lägger över värdena en i taget
    String dataN = root["id"];//vi lägger in de hämtade värdena i i lokala string
   if(dataN!="none")
         {
    int dataT = root["temp"];//vi lägger in de hämtade vägdena en i taget i lokala integers
    int dataL = root["ljus"];
     id = dataN; // vi skriver därefter över de lokala värdena till de globala värdena
     temp =dataT;
     styrka = dataL;

       LampExist=true;//vi säger att en lampa existerar
     Serial.print(styrka);//vi skriver ut styrkan
         }
         else
         {
          String Mess =root["message"];
         Serial.print(Mess);
         }
  GottenValues = true;//vi säger att vi har fått in vrden det vill säga att boolean gottenvalues är sann
}




void loop() {
 bool Light = digitalRead(DI_Light);//vi läser av digitala input för knappen light och ändrar boolean Light efter värdet vi får in
 bool Dark = digitalRead(DI_Dark);//vi läser av digitala input för knappen dark och ändrar boolean Dark efter värdet vi får in
 Serial.println(digitalRead(DI_Light));//vi skriver ut värdet vi får in för digital input light
 Serial.println(digitalRead(DI_Dark));//vi skriver ut värdet vi får in för digital input dark
 
 if(Light == true){//om knappen Light är intryckt sker följande kod
   ConnecttoDB("GET");//vi kör koden connectodb för värdet get
   UpdateValues;//vi kör koden för updatevalues
 }
 else if (Dark == true) {
   ConnecttoDB("GET");//vi kör koden connectodb för värdet get
   UpdateValues;//vi kör koden för updatevalues
 }
   else {//om ingen av de ovanstående if statmentsen är sanna körs denna kod
      styrka = styrka;//variabeln styrka ändras inte
    }
  
   if (Dark == true and styrka < 10){//om knappen Dark är intryckt sker följande kod
   styrka = 0;//vi sätter variabeln styrka till sig själv subtraherat med tio
   ConnecttoDB("POST");//vi kör koden connecttodb för värdet post
 }
  else if (Dark == true){//om knappen Dark är intryckt sker följande kod
   styrka = styrka - 10;//vi sätter variabeln styrka till sig själv subtraherat med tio
   ConnecttoDB("POST");//vi kör koden connecttodb för värdet post
  
  else if (Light == true and styrka > 90){
   styrka = 100;//vi sätter variabeln styrka till sig själv adderat med tio
   ConnecttoDB("POST"); //vi kör koden connecttodb för värdet post
  }
   else if (Light == true){//om knappen Dark är intryckt sker följande kod
   styrka = styrka + 10;//vi sätter variabeln styrka till sig själv subtraherat med tio
   ConnecttoDB("POST");//vi kör koden connecttodb för värdet post
   
  }
    else {//om ingen av de ovanstående if statmentsen är sanna körs denna kod
      styrka = styrka;//variabeln styrka ändras inte
    }
  
 
 Serial.println(styrka);//vi skriver ut värdet för variablen styrka
}
   

 
 

