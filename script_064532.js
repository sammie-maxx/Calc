class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }
    clear() {
        this.prevOper = ''
        this.currOper = ''
        this.operation = undefined
    }
    del() {
        this.currOper = this.currOper.toString().slice(0, -1)

    }
    appendnum(number) {
        if (number === '.' && this.currOper.includes('.')) return
        this.currOper = this.currOper.toString() + number.toString()
    }
    chooseoperation(operation) {
        if (this.currOper === '') return
        if (this.prevOper !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOper = this.currOper
        this.currOper = ''

    }
    compute() {
        let computation
        const prev = parseFloat(this.prevOper)
        const curr = parseFloat(this.currOper)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOper = computation
        this.operation = undefined
        this.prevOper = ''
    }
    update() {
        this.currOperandTextElement.innerText = this.currOper
        this.prevOperandTextElement.innerText = this.prevOper

    }
}


const numButs = document.querySelectorAll('[data-number]')
const operationButs = document.querySelectorAll('[data-operation]')
const equalButs = document.querySelector('[equals]')
const clearButs = document.querySelector('[clear]')
const delButs = document.querySelector('[data-del]')
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currOperandTextElement = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numButs.forEach(butt => {
    butt.addEventListener('click', () => {
        calculator.appendnum(butt.innerText)
        calculator.update()

    })
})

operationButs.forEach(butt => {
    butt.addEventListener('click', () => {
        calculator.chooseoperation(butt.innerText)
        calculator.update()

    })
})


equalButs.addEventListener('click', butt => {
    calculator.compute()
    calculator.update()

})


clearButs.addEventListener('click', butt => {
    calculator.clear()
    calculator.update()
})

delButs.addEventListener('click', butt => {
    calculator.del()
    calculator.update()
})

