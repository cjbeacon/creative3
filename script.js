var shadow = new Vue({
    el: '#shadow',
    data: {
        currentResultsStd: {},
        currentResultsOpp2: {},
        currentResultsExt: {},
        currentResults20: {},
        diceIn: 0,
        diceIn2: 0,
        diceInE: 0,
        diceIn20: 0,
        diceQuantity: 0,
        diceQuantity2: 0,
        diceQuantityE: 0,
        diceQuantity20: 0,
        stdshow: false,
        stdshowresults: false,
        oppshow: false,
        oppshowresults2: false,
        extshow: false,
        extshowresults: false,
        dceshow: false,
        dceshowresults: false,
        edgeActive: false,
        edgeActive2: false,
        test: "test",
        url: "http://roll.diceapi.com/json/",
        newurl: "",
        newurl2: "",
        newurlE: "",
        newurl20: "",
        extTotal: 0,
        calcExt: false,
    },
    computed: {
        diceTotal(){
            let total = 0;
            for (let i = 0; i < this.currentResults20.dice.length; i++) {
                total += this.currentResults20.dice[i].value;
            }
            return total;
        },
        stdhits() {
            let j = 0;
            for (let i = 0; i < this.currentResultsStd.dice.length; i++) {
                if (this.currentResultsStd.dice[i].value === 5) {
                    j++;
                }
                if (this.currentResultsStd.dice[i].value === 6) {
                    j++;
                }
            }
            return j;
        },
        stdLength() {
            return this.currentResultsStd.dice.length;
        },
        opphits2() {
            let j = 0;
            for (let i = 0; i < this.currentResultsOpp2.dice.length; i++) {
                if (this.currentResultsOpp2.dice[i].value === 5) {
                    j++;
                }
                if (this.currentResultsOpp2.dice[i].value === 6) {
                    j++;
                }
            }
            return j;
        },
        oppLength2() {
            return this.currentResultsOpp2.dice.length;
        },
        exthits() {
            let j = 0;
            for (let i = 0; i < this.currentResultsExt.dice.length; i++) {
                if (this.currentResultsExt.dice[i].value === 5) {
                    j++;
                }
                if (this.currentResultsExt.dice[i].value === 6) {
                    j++;
                }
            }
            if (this.calcExt) { this.extTotal += j; }
            return j;
        },
        extLength() {
            return this.currentResultsExt.dice.length;
        },
    },
    watch: {
        currentResultsStd: function (newR, oldR) {
            console.log(this.currentResultsStd);
            this.showStdResults();
        },
        currentResultsOpp2: function (newR, oldR) {
            console.log(this.currentResultsOpp2);
            this.showOppResults2();
        },
        currentResultsExt: function (newR, oldR) {
            console.log(this.currentResultsExt);
            this.showExtResults();
        },
        currentResults20: function (newR, oldR) {
            console.log(this.currentResults20);
            this.show20Results();
        },
    },
    methods: {
        showNone() {
            this.oppshow = false;
            this.extshow = false;
            this.stdshow = false;
            this.dceshow = false;
        },
        showStd() {
            this.oppshow = false;
            this.extshow = false;
            this.dceshow = false;
            if (this.stdshow) { this.stdshow = false; }
            else { this.stdshow = true; }
        },
        showOpp() {
            this.extshow = false;
            this.stdshow = false;
            this.dceshow = false;
            if (this.oppshow) { this.oppshow = false; }
            else { this.oppshow = true; }
        },
        showExt() {
            this.oppshow = false;
            this.stdshow = false;
            this.dceshow = false;
            if (this.extshow) { this.extshow = false; }
            else { this.extshow = true; }
        },
        showDce() {
            this.oppshow = false;
            this.stdshow = false;
            this.extshow = false;
            if (this.dceshow) { this.dceshow = false; }
            else { this.dceshow = true; }
        },
        
        toggleEdge() {
            if (this.edgeActive) { this.edgeActive = false; }
            else { this.edgeActive = true; }
        },
        toggleEdge2() {
            if (this.edgeActive2) { this.edgeActive2 = false; }
            else { this.edgeActive2 = true; }
        },
        rollStd() {
            this.diceQuantity = this.diceIn;
            this.diceIn = 0;
            this.newurl = this.url + this.diceQuantity.toString() + "d6/";
            fetch(this.newurl)
                .then((data) => {
                    return (data.json());
                })
                .then((gotBack) => {
                    this.currentResultsStd = [];
                    this.currentResultsStd = gotBack;
                })
        },
        rollOpp2() {
            this.diceQuantity2 = this.diceIn2;
            this.diceIn2 = 0;
            this.newurl2 = this.url + this.diceQuantity2.toString() + "d6/";
            fetch(this.newurl2)
                .then((data) => {
                    return (data.json());
                })
                .then((gotBack2) => {
                    this.currentResultsOpp2 = [];
                    this.currentResultsOpp2 = gotBack2;
                })
        },
        rollExt() {
            this.diceQuantityE = this.diceInE;
            this.diceInE = 0;
            this.newurlE = this.url + this.diceQuantityE.toString() + "d6/";
            fetch(this.newurlE)
                .then((data) => {
                    return (data.json());
                })
                .then((gotBackE) => {
                    this.currentResultsExt = [];
                    this.currentResultsExt = gotBackE;
                    this.calcExt = true;
                })
        },
        roll20() {
            this.diceQuantity20 = this.diceIn20;
            this.diceIn20 = 0;
            this.newurl20 = this.url + this.diceQuantity20.toString() + "d20/";
            fetch(this.newurl20)
                .then((data) => {
                    return (data.json());
                })
                .then((gotBack20) => {
                    this.currentResults20 = [];
                    this.currentResults20 = gotBack20;
                })
        },
        
        showStdResults() {
            this.stdshowresults = true;
        },
        showOppResults2() {
            this.oppshowresults2 = true;
        },
        showExtResults() {
            this.extshowresults = true;
        },
        show20Results() {
            this.dceshowresults = true;
        },
        resetExt() {
            this.calcExt = false;
            this.extTotal = 0;
            
        },
        
    }

});
