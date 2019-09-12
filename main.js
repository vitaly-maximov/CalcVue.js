var constants = {
    point: ".",    
};

var app = new Vue({
        el: '#app',
        data: {
            needToClearEntry: false,
            needToSaveFirst: false,
            first: null,
            second: null,
            operation: null,
            value: "0",
        },        
        computed: {
            canBackspace: function() {
                return (
                    (this.value !== "0") && 
                    !this.needToClearEntry
                );
            },

            canAppendDigit: function() {
                return (
                    (this.value.length <= 15) || 
                    this.needToClearEntry
                );
            },

            canAppendZero: function() {
                return this.value !== "0";
            },

            canAppendPoint: function() {
                return !this.value.includes(constants.point);
            },

            canCalculateSquareRoot: function() {
                return parseFloat(this.value) >= 0;
            },            

            canInverseAdditive: function() {
                return this.value !== "0";
            },

            canInverseMultiplicative: function() {
                return parseFloat(this.value) !== 0;
            }
        },
        methods: {
            backspace: function() {                
                this.value = this.value.substring(0, this.value.length - 1);

                if ((this.value === "") ||
                    (this.value === "-") ||
                    (this.value === "-0")) {                
                    this.value = "0";
                }
            },

            clear: function() {
                this.needToClearEntry = false;
                this.needToSaveFirst = false;
                this.first = null;
                this.second = null;
                this.operation = null;
                this.value = "0";
            },

            clearEntry: function() {
                this.value = "0";
            },

            calculate: function() {
                if (this.first == null) {
                    this.first = this.value;
                }

                if (this.second == null) {
                    this.second = this.value;
                }

                var value = this.value;
                var first = parseFloat(this.first);
                var second = parseFloat(this.second);                

                switch (this.operation) {
                    case "+":
                        value = first + second;
                        break;
                    case "-":
                        value = first - second;
                        break;
                    case "*":
                        value = first * second;
                        break;
                    case "/":
                        value = first / second;
                        break;
                }

                this.value = value.toString();
                this.first = null;                
                this.needToClearEntry = true;
                this.needToSaveFirst = false;
            },

            appendOperation: function(event) {
                if (this.first != null) {
                    this.calculate();
                }
                
                this.second = null;
                this.operation = event.srcElement.value;
                this.needToClearEntry = true;
                this.needToSaveFirst = true;
            },

            appendDigit: function(event) {
                if (this.needToSaveFirst) {
                    this.first = this.value;
                    this.needToSaveFirst = false;
                }

                if (this.needToClearEntry) {
                    this.clearEntry();
                    this.needToClearEntry = false;
                }

                var digit = event.srcElement.value;                

                if (this.value === "0") {
                    this.value = digit;
                } else {
                    this.value += digit;
                }
            },

            appendPoint: function() {
                this.value += constants.point;
            },

            calculateSquareRoot: function() {
                this.makeUnaryValueOperation(value => Math.sqrt(value));
            },            

            inverseAdditive: function() {
                this.makeUnaryTextOperation(text => {
                    if (text.startsWith("-")) {
                        return text.substring(1);
                    } else {
                        return "-" + text;
                    }
                });
            },

            inverseMultiplicative: function() {
                this.makeUnaryValueOperation(value => 1 / value);
            },

            makeUnaryTextOperation: function(unaryOperation) {
                if (this.needToSaveFirst) {
                    this.first = this.value;
                    this.needToSaveFirst = false;
                }

                this.value = unaryOperation(this.value);

                this.needToClearEntry = true;
                this.needToSaveFirst = false;
            },

            makeUnaryValueOperation: function(unaryOperation) {
                this.makeUnaryTextOperation(text => unaryOperation(parseFloat(text)).toString());
            }
        }
    });