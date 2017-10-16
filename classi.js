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
            "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "Z", "X", "W"
        ];

        this.dittongo = ["ia", "ie", "io", "iu", "ua", "ue", "uo", "ui", "ai", "ei", "oi", "ui", "au", "eu"];
    }

    static isVocale(carattere) {
        let L = new Lettere();
        if (L.vocali.indexOf(carattere) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isConsonante(carattere) {
        let L = new Lettere();
        if (L.consonanti.indexOf(carattere) != -1) {
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
        for (let c = 0; c < this.listaCaratteri.length; c++) {

            if (Lettere.isOther(this.listaCaratteri[c])) {
                // Se è una parola apostrofata unisci
                if ((this.listaCaratteri[c] == "’") || (this.listaCaratteri[c] == "'")) {
                    listaTemp.push(this.listaCaratteri[c]);
                }
                // Se è uno spazio crea elemento singolo
                if (this.listaCaratteri[c] == " ") {
                    if (listaTemp.length != 0) {
                        this.listaParole.push(listaTemp.join(""));
                    }
                    listaTemp = [" "];
                }
                // Se qualunque altro carattere mettilo singolarmente
                if ((this.listaCaratteri[c] != " ") && ((this.listaCaratteri[c] != "’") || (this.listaCaratteri[c] == "'"))) {
                    this.listaParole.push(listaTemp.join(""));
                    listaTemp = [this.listaCaratteri[c]];
                }
                this.listaParole.push(listaTemp.join(""));
                listaTemp = [];
            } else {
                listaTemp.push(this.listaCaratteri[c]);
            }

        }
        //console.log();
        return this.listaParole;
    }

    sillaba() {
        return [];
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

        if ((this.risultato.length == this.atteso.length) && (this.risultato.every((v, i) => v === this.atteso[i]))) {
            wr("Test divisione parole: " + "OK");
        } else {
            wr("Test divisione parole: ERRORE");
            wr("******* Atteso ");
            wr(this.atteso.join("|"));
            wr("******* Risultato ");
            wr(this.risultato.join("|"));
        }
    }
}

class TestSillabazione {
    constructor(lista) {
        this.lista = lista;
    }

    Check() {
        for (let c = 0; c < this.lista.length; c++) {
            let sil = new Sillabazione(this.lista[c].parola);
            let risultato = sil.sillaba();

            if ((risultato.length == this.lista[c].sillabe.length) && (risultato.every((v, i) => v === this.lista[c].sillabe[i]))) {
                wr("Test sillabazione: " + this.lista[c].parola + " -> OK");
            } else {
                wr("Test sillabazione: " + this.lista[c].parola + " -> ERRORE");
                wr("Atteso___: " + this.lista[c].sillabe.join("|"));
                wr("Risultato: " + risultato.join("|"));
            }
        }
    }
}

// **********************************
// ******* IMPLEMENTAZIONE  *********
// **********************************

let testoPinocchio = "Il povero Pinocchio corse subito al focolare, dove c’era una pentola che bolliva, e fece l’atto di scoperchiarla, per vedere che cosa ci fosse dentro: ma la pentola era dipinta sul muro.";
let testoPinocchioParole = ["Il", " ", "povero", " ", "Pinocchio", " ", "corse", " ", "subito", " ", "al", " ", "focolare", ",", " ", "dove", " ", "c’", "era", " ", "una", " ", "pentola", " ", "che", " ", "bolliva", ",", " ", "e", " ", "fece", " ", "l’", "atto", " ", "di", " ", "scoperchiarla", ",", " ", "per", " ", "vedere", " ", "che", " ", "cosa", " ", "ci", " ", "fosse", " ", "dentro", ":", " ", "ma", " ", "la", " ", "pentola", " ", "era", " ", "dipinta", " ", "sul", " ", "muro", "."];

let testDivisioneTestoParole = new TestDivisioneTestoParole(testoPinocchio, testoPinocchioParole);
testDivisioneTestoParole.Check();

let ListaParole = [
    { parola: "tavolo", sillabe: ["ta", "vo", "lo"] },
    { parola: "luce", sillabe: ["lu", "ce"] },
    { parola: "pera", sillabe: ["pe", "ra"] },
    { parola: "ala", sillabe: ["a", "la"] },
    { parola: "odore", sillabe: ["o", "do", "re"] },
    { parola: "uno", sillabe: ["u", "no"] },
];
let testSillabazione = new TestSillabazione(ListaParole);
testSillabazione.Check();