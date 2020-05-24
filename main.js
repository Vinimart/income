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

        return this.despesaTotal
    }

    calculoRenda() {

        this.rendaTotal = this.salario + this.carteira

        return this.rendaTotal
    }

    resultado() {

        if (this.calculoRenda() > this.calculoDespesa() || this.calculoRenda() === this.calculoDespesa()) {

            this.total = `R$ ${(this.calculoRenda() - this.calculoDespesa()).toFixed(2)}` 
        } else {

            this.total = `- R$ ${(this.calculoDespesa() - this.calculoRenda()).toFixed(2)}`
        }

        return this.total
    }
}

class View {

    constructor(resultado, id, mes, gasto) {

        this.resultado = resultado
        this.id = id
        this.mes = mes
        this.despesaTotal = gasto

        this.negativo = 'text-danger'
        this.positivo = 'text-success'
    }

    operador() {
        this.positivoNegativo = this.resultado.includes('-') ? this.negativo : this.positivo
        return this.positivoNegativo
    }

    render() {

        return `
        <h1 class="${this.operador()}">${this.resultado}</h1>
        `
    }

    renderTr() {
        return `
        <tr id="${this.id}">
            <th id="mes${this.id}" scope="row">${this.mes}</th>
            <td id="gasto${this.id}">R$ ${this.despesaTotal}</td>
            <td id="restante${this.id}">${this.resultado}</td>
            <td id="guardou${this.id}">R$ 00.00</td>
        </tr>
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
        this.planejado = document.getElementById('planejado')
        this.calcBtn = document.getElementById('calc-btn')
        this.resultado = document.getElementById('resultado')
        this.addContainer = document.getElementById('add-container')
        this.mes = document.getElementById('mes')
        this.addBtn = document.getElementById('add-btn')
        this.clearBtn = document.getElementById('clear-btn')

        this.list = []
        this.id = 1
    }

    AddModel() {

        this.model = new Model(
            this.itaucard.value,
            this.nubank.value,
            this.anne.value,
            this.radamer.value,
            this.salario.value,
            this.carteira.value
        )
    }

    AddRender() {
        
        this.view = new View(this.model.resultado())
        this.resultado.innerHTML = this.view.render()
    }

    clearForm() {

        this.itaucard.value = ''
        this.nubank.value = ''
        this.anne.value = ''
        this.radamer.value = ''
        this.salario.value = ''
        this.carteira.value = ''
        this.planejado.value = ''
        this.mes.value = ''
    }

    observe() {

        this.calcBtn.addEventListener('click', () => {

            this.AddModel()
            this.AddRender()
            this.addContainer.classList.remove('d-none')
        })

        this.clearBtn.addEventListener('click', () => {

            this.clearForm()
            this.resultado.innerHTML = ''
            this.addContainer.classList.add('d-none')
        })
    }
}