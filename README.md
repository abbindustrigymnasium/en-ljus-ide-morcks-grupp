# Grupp 7 - en ljus idé
I det här projektet har vi skapat en lampa med justerbar ljusstyrka och färgtempoeratur. Lampan är designad för att ersätta en 60x60-takplatta som finns i många kontor och skolor. Den hänger ned 2 cm från taket för att sprida ljuset på taket runt om plattan. Lampan har en stilren design som inte sticker ut utan snarare smälter in i taket. Lampan styrs med hjälp av en Android-app eller en fjärrkontroll. 

## Backend
* light7.js - Kopplar ihop databasen, arduinon och frontenden

Backenden uppdaterar värderna en gång i sekunden och är en mellanhand mellan databasen och frontenden/arduino-korten.
För att starta backenden måste man ladda ner hela Backend mappen. Sedan måste man öppna filerna via **VSC** eller liknande program. Därefter måste man installera **node modules** genom att skriva **npm install** i terminalen. Sist måste man skriva in **npm start** i terminalen för att starta backenden.

## Frontend 
*Homescreen.js 

Appen består huvudsakligen av två sliders som är till för att justera ljusstyrkan och färgtemperaturen, värdena uppdateras när sliderna släpps.
För att starta frontenden måste man först ladda ner hela Frontend mappen. Sedan måste man öppna filerna via **VSC** eller liknande program. Därefter måste man installera **node modules** genom att skriva **npm install** i terminalen. Samma sak måste man även göra med **expo** genom att skriva **npm install expo**. Sist måste man skriva in **npm start** i terminalen och genom att skanna QR-koden från terminalen får man upp appen i **expo-appen**. 
Det går även att ladda ned APK-filen som ska funka på alla Android-telefoner.

## Arduino 
* LS.ino - Koden för avståndssensorn
* TTT1.ino - Koden som hämtar och skickar värden från/till databasen och ändrar ljusstyrkan 

För att kunna använda koden måste man ladda ner hela Ardiuno mappen. Den innehåller två mappar som innehåller båda koderna. Koderna ligger i mappar på grund av att för att starta koden i Arduino måste filerna ligga i mappar. Därefter laddar man upp koden till microprocessorn.
P.s. Innan man laddar ner koden måste man ladda ner vissa bibliotek som  man kan hitta i koden.  


