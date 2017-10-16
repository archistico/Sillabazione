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

function wre(testo) {
    if (testo != null) {
        var ris = document.getElementById("risultati");
        var p = document.createElement("p");
        p.innerHTML = testo;
        p.classList.add('errore');
        ris.appendChild(p);
    }
}

function wrtest(testo) {
    if (testo != null) {
        var ris = document.getElementById("test");
        var p = document.createElement("h3");
        p.innerHTML = testo;
        ris.appendChild(p);
    }
}

// **********************************
// *******     CLASSI       *********
// **********************************

class Lettera {
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

        this.trittongo = ["iai", "iei", "uoi", "uai", "uei", "iuo"];

        this.gruppiConsonantici = [
            "br", "cr", "dr", "fr", "gr", "pr", "tr", "vr",
            "bl", "cl", "dl", "fl", "gl", "pl", "tl", "vl",
        ];

        this.gruppiDiacritici = [
            "ch", "gl", "gh"
        ];
    }

    static isVocale(carattere) {
        let L = new Lettera();
        if (L.vocali.indexOf(carattere) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isConsonante(carattere) {
        let L = new Lettera();
        if (L.consonanti.indexOf(carattere) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isOther(carattere) {
        let L = new Lettera();
        if ((L.vocali.indexOf(carattere) == -1) && (L.consonanti.indexOf(carattere) == -1)) {
            return true;
        } else {
            return false;
        }
    }

    static isGruppiConsonantici(testo) {
        let L = new Lettera();
        if (L.gruppiConsonantici.indexOf(testo) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isGruppiDiacritici(testo) {
        let L = new Lettera();
        if (L.gruppiDiacritici.indexOf(testo) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isDittongo(testo) {
        let L = new Lettera();
        if (L.dittongo.indexOf(testo) != -1) {
            return true;
        } else {
            return false;
        }
    }

    static isTrittongo(testo) {
        let L = new Lettera();
        if (L.trittongo.indexOf(testo) != -1) {
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
        this.listaSillabe = [];
    }

    TestoDivisioneParole() {
        this.listaCaratteri = this.testo.split('');
        let listaTemp = [];
        for (let c = 0; c < this.listaCaratteri.length; c++) {

            if (Lettera.isOther(this.listaCaratteri[c])) {
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
        return this.listaParole;
    }

    sillaba() {
        for (let c = 0; c < this.testo.length; c++) {



            // Vocale più trittongo 
            if (Lettera.isVocale(this.testo[c]) && Lettera.isTrittongo(this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3])) {
                this.listaSillabe.push(this.testo[c]);
                this.listaSillabe.push(this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                c += 4;
            } // vocale più dittongo
            else if (Lettera.isVocale(this.testo[c]) && Lettera.isDittongo(this.testo[c + 1] + this.testo[c + 2])) {
                this.listaSillabe.push(this.testo[c]);
                this.listaSillabe.push(this.testo[c + 1] + this.testo[c + 2]);
                c += 3;
            } // vocale più altra vocale 
            else if (Lettera.isVocale(this.testo[c]) && Lettera.isVocale(this.testo[c + 1])) {
                this.listaSillabe.push(this.testo[c]);
                this.listaSillabe.push(this.testo[c + 1]);
                c += 1;
            }

            if (Lettera.isTrittongo(this.testo[c] + this.testo[c + 1] + this.testo[c + 2])) {
                this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                c += 3;
            } else if (Lettera.isDittongo(this.testo[c] + this.testo[c + 1])) {
                this.listaSillabe.push(this.testo[c] + this.testo[c + 1]);
                c += 2;
            }

            // regola 1
            if (Lettera.isVocale(this.testo[c]) && Lettera.isConsonante(this.testo[c + 1])) {
                // caso in cui ho cq
                if (Lettera.isVocale(this.testo[c]) && (this.testo[c + 1] == "c") && (this.testo[c + 2] == "q")) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1]);
                    c += 1;
                }
                // caso in cui ho una doppia
                else if (Lettera.isConsonante(this.testo[c + 1]) && (this.testo[c + 1] == this.testo[c + 2])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1]);
                    c += 1;
                } else {
                    this.listaSillabe.push(this.testo[c]);
                }

            }
            // regola 2 Consonante e vocale (poi controllo dittonghi, trittonghi, doppie, ecc.)
            if (Lettera.isConsonante(this.testo[c]) && Lettera.isVocale(this.testo[c + 1])) {
                // caso in cui vocale più un dittongo
                if (Lettera.isDittongo(this.testo[c + 2] + this.testo[c + 3])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1]);
                    this.listaSillabe.push(this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho trittongo
                else if (Lettera.isConsonante(this.testo[c]) && Lettera.isTrittongo(this.testo[c + 1] + this.testo[c + 2] + +this.testo[c + 3])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho un dittongo
                else if (Lettera.isConsonante(this.testo[c]) && Lettera.isDittongo(this.testo[c + 1] + this.testo[c + 2])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                    c += 2;
                }
                // caso in cui ho cq
                else if (Lettera.isConsonante(this.testo[c]) && Lettera.isVocale(this.testo[c + 1]) && (this.testo[c + 3] == "c") && (this.testo[c + 4] == "q")) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                    c += 2;
                }
                // caso in cui ho una doppia
                else if (Lettera.isConsonante(this.testo[c]) && Lettera.isVocale(this.testo[c + 1]) && Lettera.isConsonante(this.testo[c + 2]) && (this.testo[c + 2] == this.testo[c + 3])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                    c += 2;
                }
                // altro
                else {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1]);
                    c += 1;
                }
            }
            // regola 3 Gruppi consonantici 
            if (Lettera.isConsonante(this.testo[c]) &&
                Lettera.isConsonante(this.testo[c + 1]) &&
                Lettera.isVocale(this.testo[c + 2]) &&
                Lettera.isGruppiConsonantici(this.testo[c] + this.testo[c + 1])) {
                // caso in cui ho trittongo
                if (Lettera.isTrittongo(this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4]);
                    c += 4;
                }
                // caso in cui ho un dittongo
                else if (Lettera.isDittongo(this.testo[c + 2] + this.testo[c + 3])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho cq
                else if (Lettera.isVocale(this.testo[c + 2]) && (this.testo[c + 3] == "c") && (this.testo[c + 4] == "q")) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho una doppia
                else if (Lettera.isConsonante(this.testo[c + 3]) && (this.testo[c + 3] == this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // altro
                else {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                    c += 2;
                }
            }
            // regola 4 Gruppi diacritici
            if (Lettera.isConsonante(this.testo[c]) &&
                Lettera.isConsonante(this.testo[c + 1]) &&
                Lettera.isVocale(this.testo[c + 2]) &&
                Lettera.isGruppiDiacritici(this.testo[c] + this.testo[c + 1])) {

                // caso in cui ho trittongo
                if (Lettera.isTrittongo(this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4]);
                    c += 4;
                }
                // caso in cui ho un dittongo
                else if (Lettera.isDittongo(this.testo[c + 2] + this.testo[c + 3])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho cq
                else if (Lettera.isVocale(this.testo[c + 2]) && (this.testo[c + 3] == "c") && (this.testo[c + 4] == "q")) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho una doppia
                else if (Lettera.isConsonante(this.testo[c + 3]) && (this.testo[c + 3] == this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // altro
                else {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                    c += 2;
                }
            }
            // regola 6.1 Sto, sta, ...
            if ((this.testo[c] == "s" || this.testo[c] == "S") &&
                Lettera.isConsonante(this.testo[c + 1]) &&
                Lettera.isVocale(this.testo[c + 2])) {
                // caso in cui ho trittongo
                if (Lettera.isTrittongo(this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4]);
                    c += 4;
                }
                // caso in cui ho un dittongo
                else if (Lettera.isDittongo(this.testo[c + 2] + this.testo[c + 3])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho cq
                else if (Lettera.isVocale(this.testo[c + 2]) && (this.testo[c + 3] == "c") && (this.testo[c + 4] == "q")) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // caso in cui ho una doppia
                else if (Lettera.isConsonante(this.testo[c + 3]) && (this.testo[c + 3] == this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
                // altro
                else {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2]);
                    c += 2;
                }

            }
            // regola 6.2 Stra, scra, ...
            if ((this.testo[c] == "s" || this.testo[c] == "S") &&
                Lettera.isConsonante(this.testo[c + 1]) &&
                Lettera.isConsonante(this.testo[c + 2]) &&
                Lettera.isVocale(this.testo[c + 3])) {
                // caso in cui ho trittongo
                if (Lettera.isTrittongo(this.testo[c + 3] + this.testo[c + 4] + this.testo[c + 5])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4] + this.testo[c + 5]);
                    c += 5;
                }
                // caso in cui ho un dittongo
                else if (Lettera.isDittongo(this.testo[c + 3] + this.testo[c + 4])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4]);
                    c += 4;
                }
                // caso in cui ho cq
                else if ((this.testo[c + 4] == "c") && (this.testo[c + 5] == "q")) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4]);
                    c += 4;
                }
                // caso in cui ho una doppia
                else if (Lettera.isConsonante(this.testo[c + 4]) && (this.testo[c + 4] == this.testo[c + 5])) {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3] + this.testo[c + 4]);
                    c += 4;
                }
                // altro
                else {
                    this.listaSillabe.push(this.testo[c] + this.testo[c + 1] + this.testo[c + 2] + this.testo[c + 3]);
                    c += 3;
                }
            }

        }
        return this.listaSillabe;
    }
}

// **********************************
// ********** TEST ******************
// **********************************
class Test {
    constructor() {

    }

    static addTest() {
        if (this.numeroTest == undefined) {
            this.numeroTest = 1;
        } else {
            this.numeroTest++;
        }
    }

    static getNumeroTest() {
        if (this.numeroTest == undefined) {
            this.numeroTest = 0;
        }
        return this.numeroTest;
    }

    static addTestPassed() {
        if (this.numeroTestPassed == undefined) {
            this.numeroTestPassed = 1;
        } else {
            this.numeroTestPassed++;
        }
    }

    static getNumeroTestPassed() {
        if (this.numeroTestPassed == undefined) {
            this.numeroTestPassed = 0;
        }
        return this.numeroTestPassed;
    }
}

class TestDivisioneTestoParole {
    constructor(testo, atteso) {
        this.testo = testo;
        this.atteso = atteso;
    }

    Check() {
        let sil = new Sillabazione(this.testo);
        this.risultato = sil.TestoDivisioneParole();

        Test.addTest();
        if ((this.risultato.length == this.atteso.length) && (this.risultato.every((v, i) => v === this.atteso[i]))) {
            wr("Test divisione parole: " + "OK");
            Test.addTestPassed();
        } else {
            wre("*** Test divisione parole: ERRORE");
            wre("*** Atteso ");
            wre(this.atteso.join("|"));
            wre("*** Risultato ");
            wre(this.risultato.join("|"));
        }
        wr("<br>");
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
            Test.addTest();

            if ((risultato.length == this.lista[c].sillabe.length) && (risultato.every((v, i) => v === this.lista[c].sillabe[i]))) {
                wr("Test sillabazione: " + this.lista[c].parola + " -> OK");
                Test.addTestPassed();
            } else {
                wre("*** Test sillabazione: " + this.lista[c].parola + " -> ERRORE");
                wre("*** Atteso___: " + this.lista[c].sillabe.join("|"));
                wre("*** Risultato: " + risultato.join("|"));
            }
        }
    }
}

// **********************************
// ******* IMPLEMENTAZIONE  *********
// **********************************
let numeroTest = 0;
let numeroTestPassed = 0;

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
    { parola: "atletica", sillabe: ["a", "tle", "ti", "ca"] },
    { parola: "biblico", sillabe: ["bi", "bli", "co"] },
    { parola: "inclinato", sillabe: ["in", "cli", "na", "to"] },
    { parola: "brodo", sillabe: ["bro", "do"] },
    { parola: "credere", sillabe: ["cre", "de", "re"] },
    { parola: "dromedario", sillabe: ["dro", "me", "da", "rio"] },
    { parola: "flebile", sillabe: ["fle", "bi", "le"] },
    { parola: "africano", sillabe: ["a", "fri", "ca", "no"] },
    { parola: "gladiolo", sillabe: ["gla", "di", "o", "lo"] },
    { parola: "prego", sillabe: ["pre", "go"] },
    { parola: "treno", sillabe: ["tre", "no"] },
    { parola: "ostracismo", sillabe: ["o", "stra", "ci", "smo"] },
    { parola: "costola", sillabe: ["co", "sto", "la"] },
    { parola: "scoiattolo", sillabe: ["sco", "iat", "to", "lo"] },
    { parola: "costruire", sillabe: ["co", "stru", "i", "re"] },
    { parola: "caspita", sillabe: ["ca", "spi", "ta"] },
    { parola: "striscione", sillabe: ["stri", "scio", "ne"] },
    { parola: "tetto", sillabe: ["tet", "to"] },
    { parola: "acqua", sillabe: ["ac", "qua"] },
    { parola: "risciacquo", sillabe: ["ri", "sciac", "quo"] },
    { parola: "calma", sillabe: ["cal", "ma"] },
    { parola: "ricerca", sillabe: ["ri", "cer", "ca"] },
    { parola: "tecnico", sillabe: ["tec", "ni", "co"] },
    { parola: "aritmetica", sillabe: ["a", "rit", "me", "ti", "ca"] },
    { parola: "controllo", sillabe: ["con", "trol", "lo"] },
    { parola: "ventricolo", sillabe: ["ven", "tri", "co", "lo"] },
    { parola: "scaltro", sillabe: ["scal", "tro"] },
    { parola: "interstizio", sillabe: ["in", "ter", "sti", "zio"] },
    { parola: "auguri", sillabe: ["au", "gu", "ri"] },
    { parola: "viola", sillabe: ["vio", "la"] },
    { parola: "indiano", sillabe: ["in", "dia", "no"] },
    { parola: "lingua", sillabe: ["lin", "gua"] },
    { parola: "questo", sillabe: ["que", "sto"] },
    { parola: "zaino", sillabe: ["zai", "no"] },
    { parola: "piacque", sillabe: ["piac", "que"] },
    { parola: "pieno", sillabe: ["pie", "no"] },
    { parola: "sedie", sillabe: ["se", "die"] },
    { parola: "rauco", sillabe: ["rau", "co"] },
    { parola: "occhiali", sillabe: ["oc", "chia", "li"] },
    { parola: "materiale", sillabe: ["ma", "te", "ria", "le"] },
    { parola: "pinguino", sillabe: ["pin", "gui", "no"] },
    { parola: "buono", sillabe: ["buo", "no"] },
    { parola: "foiba", sillabe: ["foi", "ba"] },
    { parola: "piuma", sillabe: ["piu", "ma"] },
    { parola: "maiale", sillabe: ["ma", "ia", "le"] },
    { parola: "centinaio", sillabe: ["cen", "ti", "na", "io"] },
    { parola: "aiutare", sillabe: ["a", "iu", "ta", "re"] },
    { parola: "paiolo", sillabe: ["pa", "io", "lo"] },
    { parola: "maestra", sillabe: ["ma", "e", "stra"] },
    { parola: "aeroplano", sillabe: ["a", "e", "ro", "pla", "no"] },
    { parola: "poeta", sillabe: ["po", "e", "ta"] },
    { parola: "paesaggio", sillabe: ["pa", "e", "sag", "gio"] },
    { parola: "aiuola", sillabe: ["a", "iuo", "la"] },
    { parola: "oltranzista", sillabe: ["ol", "tran", "zi", "sta"] },
    { parola: "soppressata", sillabe: ["sop", "pres", "sa", "ta"] },
    { parola: "erba", sillabe: ["er", "ba"] },
    { parola: "stanco", sillabe: ["stan", "co"] },
    { parola: "chiaro", sillabe: ["chia", "ro"] },
    { parola: "luglio", sillabe: ["lu", "glio"] },
    { parola: "schiavo", sillabe: ["schia", "vo"] },
];
let testSillabazione = new TestSillabazione(ListaParole);
testSillabazione.Check();

wrtest("Test passati: " + Test.getNumeroTestPassed() + "/" + Test.getNumeroTest());