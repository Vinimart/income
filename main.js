class Model {

    constructor(itaucard, nubank, anne, radamer, salario, carteira, planejado) {

        this.itaucard = itaucard ? parseFloat(itaucard) : itaucard = 0
        this.nubank = nubank ? parseFloat(nubank) : nubank = 0
        this.anne = anne ? parseFloat(anne) : anne = 0
        this.radamer = radamer ? parseFloat(radamer) : radamer = 0
        this.salario = salario ? parseFloat(salario) : salario = 0
        this.carteira = carteira ? parseFloat(carteira) : carteira = 0
        this.planejado = planejado ? parseFloat(planejado) : planejado = 0
    }

    calculoDespesa() {

        this.cartoes = this.itaucard + this.nubank
        this.dividendos = this.anne + this.radamer
            
        this.despesaTotal = this.cartoes - this.dividendos

        return this.despesaTotal
    }

    calculoRenda() {

        this.rendaTotal = this.salario + this.carteira

        return this.rendaTotal.toFixed(2)
    }

    totalConvertido() {
        this.total = this.resultado()
        this.total = this.total.replace('- R$ ', '')
        this.total = this.total.replace('R$ ', '')
        this.total = parseInt(this.total)
        return this.total
    }

    calculoGuardou() {

        if (this.totalConvertido() > this.planejado && this.planejado != 0) {

            this.guardou = this.totalConvertido() - this.planejado
        } else {

            this.guardou = 0
        }

        return this.guardou
    }

    resultado() {

        if (this.calculoRenda() > this.calculoDespesa() || this.calculoRenda() == this.calculoDespesa()) {

            this.total = `R$ ${(this.calculoRenda() - this.calculoDespesa()).toFixed(2)}` 
        } else {

            this.total = `- R$ ${(this.calculoDespesa() - this.calculoRenda()).toFixed(2)}`
        }

        return this.total
    }
}

class View {

    constructor(resultado) {

        this.resultado = resultado
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

    renderTr(id, mes, despesa, restante, guardou) {
        return `
        <tr id="${id}">
            <th id="mes${id}" scope="row">${mes}</th>
            <td id="gasto${id}">R$ ${despesa}</td>
            <td id="restante${id}">R$ ${restante}</td>
            <td id="guardou${id}">R$ ${guardou}</td>
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
        this.tabela = document.getElementById('tabela')


        this.list = []
        this.id = 0
    }

    addModel() {

        this.model = new Model(
            this.itaucard.value,
            this.nubank.value,
            this.anne.value,
            this.radamer.value,
            this.salario.value,
            this.carteira.value,
            this.planejado.value
        )

        this.addRender()
    }

    addRender() {
        
        this.view = new View(this.model.resultado())
        this.resultado.innerHTML = this.view.render()
        this.addContainer.classList.remove('d-none')
    }

    addTable() {

        this.list.push(
            {
                id: this.id,
                mes: this.mes.value,
                itaucard: this.itaucard.value,
                nubank: this.nubank.value,
                anne: this.anne.value,
                radamer: this.radamer.value,
                salario: this.salario.value,
                carteira: this.carteira.value,
                planejado: this.planejado.value,
                gasto: this.model.calculoDespesa(),
                resultado: this.model.resultado(),
                guardou: this.model.calculoGuardou()
            }
        )
            
        this.tabela.insertAdjacentHTML('beforeend', this.view.renderTr(this.id,  this.mes.value, this.model.calculoDespesa(), this.planejado.value, this.model.calculoGuardou()))
        this.id++
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
        this.resultado.innerHTML = ''
        this.addContainer.classList.add('d-none')
    }

    observe() {

        this.calcBtn.addEventListener('click', () => {

            this.addModel()
        })

        this.clearBtn.addEventListener('click', () => {

            this.clearForm()
        })

        this.addBtn.addEventListener('click', () => {

            this.addTable()
            this.clearForm()
        })
    }
}