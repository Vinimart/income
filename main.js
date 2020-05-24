class Model {

    constructor(itaucard, nubank, anne, radamer, salario, carteira) {

        this.itaucard = itaucard ? parseFloat(itaucard) : itaucard = 0
        this.nubank = nubank ? parseFloat(nubank) : nubank = 0
        this.anne = anne ? parseFloat(anne) : anne = 0
        this.radamer = radamer ? parseFloat(radamer) : radamer = 0
        this.salario = salario ? parseFloat(salario) : salario = 0
        this.carteira = carteira ? parseFloat(carteira) : carteira = 0
    }

    calculoDespesa() {

        this.cartoes = this.itaucard + this.nubank
        this.dividendos = this.anne + this.radamer
        this.despesaTotal = this.cartoes - this.dividendos
    }

    calculoRenda() {

        this.rendaTotal = this.salario + this.carteira
    }

    resultado() {

        this.calculoDespesa()
        this.calculoRenda()

        if (this.rendaTotal > this.despesaTotal || this.rendaTotal === this.despesaTotal) {

            this.total = `R$ ${(this.rendaTotal - this.despesaTotal).toFixed(2)}` 
        } else {

            this.total = `- R$ ${(this.despesaTotal - this.rendaTotal).toFixed(2)}`
        }
        console.log(this.itaucard)
        return this.total
    }
}

class View {

    constructor(resultado) {

        this.resultado = resultado
    }

    render() {

        return `
        <h1>${this.resultado}</h1>
        `
    }
}

class Controller {

    constructor() {

        this.itaucard = document.getElementById('itaucard')
        this.nubank = document.getElementById('nubank')
        this.anne = document.getElementById('anne')
        this.radamer = document.getElementById('radamer')
        this.salario = document.getElementById('salario')
        this.carteira = document.getElementById('carteira')
        this.calcBtn = document.getElementById('calc-btn')
        this.resultado = document.getElementById('resultado')
    }

    observe() {

        this.calcBtn.addEventListener('click', () => {

            this.model = new Model(
                this.itaucard.value,
                this.nubank.value,
                this.anne.value,
                this.radamer.value,
                this.salario.value,
                this.carteira.value
            )

            this.view = new View(this.model.resultado())
            this.resultado.innerHTML = this.view.render()
        })
    }

}