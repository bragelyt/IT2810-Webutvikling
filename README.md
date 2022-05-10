# Dokumentasjon

Dette er et prosjekt 4 fra IT2810 Webutvikling i 2019. Nettsiden er en videreutvikling av prosjekt 3, som ble gjort sammen med 2 andre. Er gammelt og skrøpelig kode, men det var en morsom introduksjon til React og webutvikling. Git historikk er desverre mistet etter overgangen fra NTNU sin GitLab til GitHub.

## Generelt om

Jeg har videreutviklet applikasjonen fra forrige prosjekt. Applikasjonen er lad deg søke i AirBnB listinger i Oslo ved å oppgi bydel, antal senger man trenger (dette blir et minimumsøk) og antal netter man tenker å bo der (da blir det sortert som maks antall «minimum_nights»). Man kan også sortere på de to sistnevnte faktorene.

Er enig at sortering på pris ville gitt mening her, men ettersom APIet fra forrige prosjekt ikke støtter dette og valgte jeg å ikke bruke unødvendig tid på å sette opp dette på nytt da det ville gitt lite læring).

### Backend

Applikasjonen bruker som tidligere nevnt backend fra prosjekt 3. Vi valgte å bruke MongoDB og GraphQL, men jeg har ikke noen av disse filene med i repoet ettersom backend allerede var oppe å kjørte. 

### State management

For state management brukes Redux på "globale" states som flere komponenter må ha tilgang til. Dette er satt opp ganske simpelt med en reducer som har en initialState som setter grunnstates og forskjellige actions som tar inn en eller flere states, og pusher disse endringene inn i en ny state. På denne måten endres kun states som er oppgitt med riktig navn samtidig som ingen gamle states blir mistet.

For lokale states brukes hooks gjennom useState. Dette er varibaler som kun skal sees av ett komponent og som ikke trenger å være persistente. I tillegg oppdaterer useState komponenten så dette er brukt noen steder for å force en rerender.

### Apollo og GraphQL

Mye av queries er gjenbrukt fra prosjekt 3, men pusset litt på for å reflektere endringer fra pc til mobil (mindre skjerm => mindre info på skjermen). 

Hovedsenen av bruken i Apollo skjer gjennom `compose`-taggen i `export default` deklareringen av komponenter som bruker spørringer. Her kobles en spørring eller mutasjon fra GraphQL inn i funksjonen sine props slik at de kan bli lett aksessert.. Et godt eksempel på dette er nederst på `screens/SingleItemScreen`. Her kan du se spørringen `GET_SINGLE_ITEMog mutasjonenene `SET_FAVORITE_LISTING` og `REMOVE_ FAVORITE_LISTING ` bli koblet til komponenten. Her ser du også at states fra Redux blir passet som variabler. Spørringen kjører automatisk på mount og resultatet lagres i props. 

### Foskjellige Screens

`HomeScreen` brukes som landingssiden på aplikasjonen og er også hovedfunksjonaliteten til aplikasjonen. Her tar applikasjonen inputs til søket håndterer disse gjennom underkomponentene `<SearchResult/>` og ‘<SingleSearchResult />’. 

Sistnevnte komponent hånderer også navigation til `SingleItemScreen`. Her kan brukeren se mere informasjon om leiligheten, samt få muligheten til å legge til og fjerne leiligheter som favoritt.

Favorittene kan sees på `UserScreen` som på mye av samme måten som `HomeScreen` bruker underkompoentene `<UserFavListings />` og `<FavItem />` til å vise og navigere til favoritter. 

### AsyncStorage

For å bruke AsyncStorage valgte jeg å lagre favorittene til brukeren lokalt på mobilen. For å forbedre kjøretiden lagrer jeg også favorittene i Redux, slik at jeg slipper å fetche alle favorittene hver gang man vil displaye favoritter. For å passe på at dette altid vas syncet riktig implementerte jeg to metoder.

Den førte er for å fetche favorittene fra AsyncStorage inn i Redux. Dette skjer på `HomeScreen` gjennom funksjonen `setFavorites` som kunn kalles hvis Redux sin `favorites` state er i sin initial state, nemlig `null`. Dette burde kun skje i det aplikasjonen kjøres for første gang. Når `setFavorites` kjøres henter den asynkront in en string fra AsyncStorage med key "FAVS". Hvis denne er null, er det første gang aplikasjonen kjøres, eller ingen favoritter er lagret. Da settes Redux sin ´favorite´ state til en tom array. Hvis du får et resultat fra AsyncStorage parses denne stringen til en Array og pushes inn i ReduxStore. Dette fører til at favorittene ligger klare for å vises i Redux, og kan hentes enkelt av UserPage.

Den andre tingen som må løses er når favoritter legges til eller fjernes. Dette løses rimelig enkelt ved at en tar utgangspunkt i Redux staten (som er en kopi av AsyncStorage), legger til eller fjerner Iden til listingen avhengig av add eller remove favorite, for så å pushe resultatet inn i AsyncStorage og Redux. På denne måten oppdateres AsyncStorage hver gang det skjer en endring, slik at brukeren til en hver tid kan lukke mobilen uten ta av data, samtidig som Redux holdes oppdatert under hele kjøretiden slik at vi minimere antall AsyncStorage kall for å vise fram favoritter for å gjøre aplikasjonen raskere. 

### Navigation

Jeg valgte å bruke `react-navigation` for å navigere mellom forskjellige vinduer. Jeg bruker to stacks, en for `Home` og en for `User`. `Home` stacken består av `Home` og `SingleItem`, mens `UserScreen` kun består av den, selv om den har muligheten til å navigere til `SingleItem` i `Home` stacken. Stackene kan du se på bunnen av applikasjonen i navigasjonsbaren og i filen `navigation\MainTabNavigaor`

### Pagination

Pagination skjer gjennom `<ScrollView>` hvor scrollposisjonen sjekkes hvert 0.5 sekund og hvis en er innen 10px fra bunnen legges en ny side til på bunnen. Dette skjer gjennom å inkrementere `Pages`-lista i Redux som `<SearchResult />` kjører en `.map` over for å hente ut et resultat per side i lista. Dette gjør at kun de nye sidene som blir hentet inn lastes så man slipper at all info hentes inn på nytt.

Jeg har opplevd noe problemer med dårlig ytelse hvis en henter for mange side samtidig, men dette har jeg bare opplevd på en lånt mobil, så er vanskelig å gjenskape og prøve å finne ut av. Ser for eksempel at backend fetcher større bilder en nødvendig for thumbnails i visningen, men dette krever igjen endring i backend for å ordne opp i.

## Git

Ettersom jeg har jobbet alene har jeg ikke sett like stor hensikt meg Git som ved tidligre prosjekter, men har alike vell prøvd å være konsistent med bruk av issues og branches for å gi meg selv bedre innsikt i hvor mye arbeid som mangler.

## Testing

Jeg kar kjørt manuell ende til ende testing på aplikasjonen ved å bruke testmanuset som er oppgitt under. Testsekvensen tar utganspunkt i at all data fra enheten er slettet/ det er første gang appen kjøres (AsyncStorage).

Ettersom jeg er alene på gruppa har det vært litt vanskelig å få et bredt utvalg av testenheter, men jeg har fått testet på 2 Android enheter og 1 iOS. Vil igjen legge til at jeg i hovedsak har utvikler for Android ettersom dette er enheten jeg har lett tilgang til.

Jeg valgte å ikke disable applikasjonen på tablet, selv om det ikke på noe vis er utviklet med dette i tankene (jeg eier ikke en tablet selv så ble mye stress for noe som gir lite output). Den ser derfor ikke noe "fin" ut på tablet, men funktionaliteten funker.

#### Case 1 (Gå inn på appen å opserver at ingen favoritter er lakt til) 
1: Åpne appen (Første gang appen åpnes eller etter at minnet til appen er slettet)   
2: Velg «User» fra navbaren  
3: Observer at det står «You have no favorites»  

#### Case 2 (Brukeren vil så legge til og se en favoritt)
1: Velt «Home» fra navbar  
2: Velg en listing for å gå inn på den  
3: Trykk  «Add as favorite»  
4: Velg «User» fra navbaren  
5: Observer at listingen kan sees under «Your favorites»  

#### Case 3 (Brukeren vil legge til en favoritt fra «Majorstuen» med 6 eller flere i en uke)
1: Velg «Home» fra navbar.  
2: Skriv inn «Majostuen» i søkfeltet og flytt sliderene slik at du får 6 beds og 7 days.  
3: Observer at at alle resultatene oppfyller kravene, velg «Oslo Luxury Family home 140m2 3/4bed Royal palace» og legg til som favoritt.  

#### Case 4 (Brukeren har tidligere dårlig erfaring med grettene verter og tenker at en vert som har lav minimum nights er fleksibel og hyggelig)
1: Gå tilbake til «Home».  
2: Trykk på checkboxen for «Number of nights» for å sortere etter dette istedenfor.  
3: Trykk på «Search» knappen og observer at resultatene forandre rekkefølge.  

#### Case 5 (Brukeren vil leie sin kamerat «Vincent» sin leilighet «Private room in Oslo» på St. Hanshaugen (Som brukeren ikke helt vet hvordan skrives), med 1 seng i).
1: Gå tilbake til «Home»  
2: 2: Skriv inn «haugen» i søkfeltet og flytt sliderene slik at du får 1 beds og 20 days, sorter etter beds.  
3: Observer at Vincent ikke har leiligheten sin på første page og bla neddover til page 2 også lastes.  
4: Observer at Vincent sin leilighet dukker opp som leilighet nummer 13 på lista.  
5: Trykk på listingen og legg til som favoritt.  

**Leiligheten har dette bildet:**  
<img src="https://a0.muscache.com/im/pictures/22949829/e38fac48_original.jpg?aki_policy=large" width="350">

#### Case 6 (Brukeren har for mange favoritter, vil slette alle untat «Vincent» sin)
1: Gi inn på «User».  
2: Trykk på øverste listingen (eller en vilkåerlig som ikke er «Vincent» sin  
3: Trykk på «Remove from favorites»   
4: Gå tilbake på «User» og observer at listingen er borte  
4: Gjenta steg 1-4 til det bare er «Vincent» sin leilighet igjen.  

#### Case 7 (Brukeren sletter også «Vincent» sin leilighet fra favorittes og angrer idet det er gjort)
1: Gå inn på «User»  
2: Trykk på listingen til «Vincen» sin leilighet  
3: Trykk «Remove from favorites»  
4: Observer at knappen har endret seg til «Add as favorite».  
5: Trykk «Add as favorite»  
6: Gå tilbake på «User» og observer at listingen fortsatt er der.  

## Kilder
Logo icon https://www.freepik.com/free-icon/house-search_752993.htm

Applikasjonen tar utganspunkt it `expo init` med `tabs` for inspirasjon (har endret på det aller meste men f.eks. navigation stacks var et godt utganspunkt). 
