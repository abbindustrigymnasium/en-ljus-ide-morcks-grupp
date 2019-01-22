# Grupp 7 - en ljus idé
I det här projektet har vi skapat en lampa med justerbar ljusstyrka och färgtempoeratur. Lampan är designad för att ersätta en 60x60-takplatta som finns i många kontor och skolor. Den hänger ned 2 cm från taket för att sprida ljuset på taket runt om plattan. Lampan har en stilren design som inte sticker ut utan snarare smälter in i taket. Lampan styrs med hjälp av en Android-app eller en fjärrkontroll. Allt kommunicerar med en backend som hela tiden körs på en server.

## Backend
* light7.js - Kopplar ihop databasen, arduinon och frontenden

Backenden ligger i mappen **node-rest-shop** och uppdaterar värderna en gång i sekunden och är en mellanhand mellan databasen och frontenden/arduino-korten.
För att starta backenden måste man ladda ner hela Backend mappen. Sedan måste man öppna filerna via **VSC** eller liknande program. Därefter måste man installera **node modules** genom att skriva **npm install** i terminalen. Sist måste man skriva in **npm start** i terminalen för att starta backenden.
För oss är den igång hela tiden på en separat server. 

## Frontend 
* Homescreen.js - hela appen är en och samma komponent

Appen består huvudsakligen av två sliders som är till för att justera ljusstyrkan och färgtemperaturen. Appen är länkad till backenden och hämtar värdena från databasen vid uppstart och uppdaterar värderna när slidesen släpps.
För att starta frontenden måste man först ladda ner hela Frontend-mappen och öppna den med **VSC** eller liknande. Därefter måste man installera **node modules** genom att skriva **npm i** i terminalen. Samma sak måste man även göra med **expo** genom att skriva **npm i -g expo-cli**. Till sist måste man skriva in **expo start** i terminalen och genom att skanna QR-koden från terminalen får man upp appen i **expo-appen**. 
Det går även att ladda ned APK-filen som ska funka på alla Android-telefoner.

## Arduino 
* AutoConnectLight.ino - Koden för Lamp-kortet som hämtar värden från databasen. 
* Fjärrkontroll3.ino - Koden för fjärrkontrollen som hämtar och skickar värden till databasen. 

 


