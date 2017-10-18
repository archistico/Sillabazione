// **********************************
// ******* FUNZIONI GLOBALI *********
// **********************************

function wr(testo) {
    if (testo != null) {
        var ris = document.getElementById("risultati");
        var p = document.createElement("p");
        p.innerHTML = testo;
        ris.appendChild(p);
    }
}

// **********************************
// *******     CLASSI       *********
// **********************************

class Lettere {
    constructor() {
        this.vocali = ["a", "e", "i", "o", "u", "y", 
                       "A", "E", "I", "O", "U", "Y",
                       "à", "á", "è", "é", "ì", "í", "ò", "ó", "ù", "ú",
                       "À", "Á", "È", "É", "Ì", "Í", "Ò", "Ó", "Ù", "Ú",
                      ]; 
        this.consonanti = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z", "x", "w",
                           "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "Z", "X", "W"];
    }

    static isVocale(carattere) {
        let L = new Lettere();
        if(L.vocali.indexOf(carattere) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isConsonante(carattere) {
        let L = new Lettere();
        if(L.consonanti.indexOf(carattere) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isOther(carattere) {
        let L = new Lettere();
        if ((L.vocali.indexOf(carattere) == -1) && (L.consonanti.indexOf(carattere) == -1)) {
            return true;
        } else {
            return false;
        }
    }
}

class Sillabazione {
    constructor(testo) {
        this.testo = testo;
        this.listaParole = [];
        this.listaCaratteri = [];
    }

    TestoDivisioneParole() {
        this.listaCaratteri = this.testo.split('');
        let listaTemp = [];
        for(let c=0; c<this.listaCaratteri.length; c++) {
            // Tolgo gli spazi
            if(Lettere.isOther(this.listaCaratteri[c])) {
                
                this.listaParole.push(listaTemp.join(""));
                listaTemp = [];
            } else {
                listaTemp.push(this.listaCaratteri[c]);
            }

        }
        //console.log();
        return this.listaParole;
    }


}

// **********************************
// ********** TEST ******************
// **********************************

class TestDivisioneTestoParole {
    constructor(testo, atteso) {
        this.testo = testo;
        this.atteso = atteso;
    }

    Check() {
        let sil = new Sillabazione(this.testo);
        this.risultato = sil.TestoDivisioneParole();
                
        if(this.risultato === this.atteso) {
            wr("Test divisione parole: "+"OK");
        } else {
            wr("Test divisione parole: ERRORE");
            wr("******* Atteso ----> \""+this.atteso+"\"");
            wr("******* Risultato -> \""+this.risultato+"\"");
        }
    }
}

// **********************************
// ******* IMPLEMENTAZIONE  *********
// **********************************

let testoPinocchio = "Il povero Pinocchio corse subito al focolare, dove c’era una pentola che bolliva, e fece l’atto di scoperchiarla, per vedere che cosa ci fosse dentro: ma la pentola era dipinta sul muro.";
let testoPinocchioParole = ["Il","povero","Pinocchio","corse","subito","al","focolare",",","dove","c","’", "era","una","pentola","che","bolliva",",","e","fece","l","’","atto","di",                                     "scoperchiarla",",","per","vedere","che","cosa","ci","fosse","dentro",":","ma","la","pentola","era","dipinta","sul","muro","."];

let testDivisioneTestoParole = new TestDivisioneTestoParole(testoPinocchio, testoPinocchioParole);
testDivisioneTestoParole.Check();

