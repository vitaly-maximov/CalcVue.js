var zero = "0";
var point = ".";

var app = new Vue({
        el: '#app',
        data: {
            _first: zero,
            _operation: null,
            value: zero,
        },        
        methods: {
            onDigitClicked: function(event) {
                var digit = event.srcElement.value;

                if (this.value === zero) {
                    this.value = digit;
                } else {
                    this.value += digit;
                }
            },

            onPointClicked: function() {
                if (!this.value.includes(point)) {
                    this.value += point;
                }
            },

            onSqrtClicked: function() {
                this.value = Math.sqrt(this.value);
            },

            onBackspaceClicked: function() {
                if (this.value.length > 1) {
                    this.value = this.value.substring(0, this.value.length - 1);
                } else {
                    this.value = zero;
                }
            },

            onAdditiveInverseClicked: function() {
                if (this.value === zero) {
                    return;
                }

                if (this.value.startsWith("-")) {
                    this.value = this.value.substring(1);
                } else {
                    this.value = "-" + this.value;
                }

            },

            onMultiplicativeInverseClicked: function() {
                this.value = 1 / this.value;
            },

            onClearClicked: function() {
                this.value = zero;
            },

            onOperationClicked: function(event) {
                this._first = this.value;
                this._operation = event.srcElement.value;                
            },

            onCalculateClicked: function() {
                switch (this._operation) {
                    case "+":
                        this.value = parseFloat(this._first) + parseFloat(this.value);
                        break;
                    case "-":
                        this.value = parseFloat(this._first) - parseFloat(this.value);
                        break;
                    case "*":
                        this.value = parseFloat(this._first) * parseFloat(this.value);
                        break;
                    case "/":
                        this.value = parseFloat(this._first) / parseFloat(this.value);
                        break;
                }
            }
        }
    });