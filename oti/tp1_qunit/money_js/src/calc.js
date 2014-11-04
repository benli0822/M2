function calc() {
    this.message = "";
}

calc.prototype.displayResult = function (resultDiv) {
    resultDiv.innerHTML = this.message;

};

calc.prototype.computeResult = function (form) {
    // Récupèer les valeurs et leurs currency
    v1 = form.elements['v1'].value;
    v2 = form.elements['v2'].value;

    c1 = form.elements['c1'].value;
    c2 = form.elements['c2'].value;

    //console.log(v1);
    //console.log(v2);

    // Tester si c'est un nombre normal
    if(!isNumber(v1) || !isNumber(v2)) {
        alert("Please insert number");
        return;
    }

    // Donc on va lancer des comparasions possibles, si'l marche pas, on arret le calcul.
    if (v1 < 0 || v2 < 0) {
        alert("Value can not be negative");
        return;
    }

    //console.log(c1);
    //console.log(c2);

    if (c1 != c2) {
        alert("Not the same currency");
        return;
    }


    m1 = new money(parseInt(form.elements['v1'].value),
        form.elements['c1'].value);
    m2 = new money(parseInt(form.elements['v2'].value),
        form.elements['c2'].value);

    ops = form.elements['ops'].value;

    try {
        if (ops === "ADD") {
            resAdd = MoneyOps.add(m1, m2);
            this.message = "Result : " + (resAdd.toString()) + "";
        } else if (ops === "SUB") {
            resSub = MoneyOps.sub(m1, m2);
            this.message = "Result : " + (resSub.toString()) + "";
        } else {
            this.message = "Unsupported operation " + ops + "";
            alert(this.message);
        }


    } catch (e) {
        this.message = e.toString();

    }
};

/**
 * Tester si c'est un nombre normal
 * @param n
 * @returns {boolean}
 */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function doComputation(form, resDiv) {
    c = new calc();
    c.computeResult(form);
    c.displayResult(resDiv);
}
