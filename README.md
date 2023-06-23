SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 3: Manipolazione

# Lost Trail
Autore: Lauro Gianella  
[Lost Trail](https://moodyl.github.io/Lost-Trail/)

Il progetto consiste in un sito pseudo-videogioco dove si percorre un "labirinto" e si incontrano personaggi a cui parlare.


## Riferimenti progettuali
I riferimenti progettuali per questo progetto è lo stile monocromatico alla Gameboy ed i giochi punta e clicca tipo Monkey Island.


## Design dell’interfaccia e modalità di interazione
L'interfaccia è composta da vari elementi, i principali sono: dei bottoni a bordo schermo per navigare il labirinto, una finestra contenente lo sprite del personaggio nella stanza, una finestra di dialogo che appare in basso quando il personaggio parla. L'interazione è gestita attraverso un hover di 3 secondi, dopodiche avviene un click sull'elemento. (hand detection non ancora implementata)


## Tecnologia utilizzata
Il sito utilizza una sorta di state machine che, grazie ad un array di oggetti che puntano l'uno all'altro, permette di passare da un'oggetto all'altro e recuperare le informazioni che l'oggetto tiene e pubblicarle nel browser.


## Target e contesto d’uso
Essendo un prodotto dal carattere ludico, il target è qualcuno che vorrebbe provare un'esperienza ludica senza dover spendere soldi.
