# Grupp 7 - en ljus idé
I det här projektet har vi gjort en lampa som kan lysa med både varmt och kallt ljus. Vi styr det indirekta varma ljuset med en app som vi har skapat med **node** och **react native**. Med **node** har vi gjort backenden och backenden är basen för hela lampan. Med hjälp av **react native** har vi skapat appen(utseende/funktioner så som tex slidern). Språket **Javascript** är det språk som vi använder till både backend och frontend. 
Det kalla direkta ljuset styr vi med en avståndssensor som styrs via en microprocessor som vi styr via **arduino-kod**. **Arduino-koden** är skriven med språket **c++**. 

## Backend
* light7.js - Kopplar ihop databasen, arduinon och frontenden

För att starta backenden måste man ladda ner hela Backend mappen. Sedan måste man öppna filerna via **VSC** eller liknande program. Därefter måste man installera **node modules** genom att skriva **npm install** i terminalen. Sist måste man skriva in **npm start** i terminalen för att starta backenden.

## Frontend 
* Rubrik.js - Rubriken
* Slider.js - Slidern
* Connect.js - Kopplar ihop frontenden med backenden
* Screen5.js - Visar alla komponenter

För att starta frontenden måste man först ladda ner hela Frontend mappen. Sedan måste man öppna filerna via **VSC** eller liknande program. Därefter måste man installera **node modules** genom att skriva **npm install** i terminalen. Samma sak måste man även göra med **expo** genom att skriva **npm install expo**. Sist måste man skriva in **npm start** i terminalen och genom att skanna QR-koden från terminalen får man upp appen i **expo-appen**. 
P.s. Glöm inte att ha mobilen och datorn på samma nätverk. 

## Arduino 
* LS.ino - Koden för avståndssensorn
* TTT1.ino - Koden som hämtar och skickar värden från/till databasen och ändrar ljusstyrkan 

För att kunna använda koden måste man ladda ner hela Ardiuno mappen. Den innehåller två mappar som innehåller båda koderna. Koderna ligger i mappar på grund av att för att starta koden i Arduino måste filerna ligga i mappar. Därefter laddar man upp koden till microprocessorn.
P.s. Innan man laddar ner koden måste man ladda ner vissa bibliotek som  man kan hitta i koden.  


