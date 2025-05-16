
// s O lid
// Open / Closed Principle
// Ejemplo funcional, aunque viola OCP
/*

class Rectangulo {
    ancho: number
    alto: number
    constructor(ancho: number, alto: number) {
        this.ancho = ancho
        this.alto = alto
    }
}

class Circulo {
    radio: number
    constructor(radio: number) {
        this.radio = radio
    }
}

class CalculadorAreaTotal {
    calcularArea(figuras: Array<Rectangulo | Circulo>): number {
        let area = 0

        for (const figura of figuras) {
            // Utilizamos comprobación de tipo para calcular el área
            if (figura instanceof Rectangulo) {
                area += figura.ancho * figura.alto
            } else if (figura instanceof Circulo) {
                area += Math.PI * figura.radio * figura.radio
            }
            // Si añadimos un nuevo tipo de figura (por ejemplo, Triangulo)
            // tendríamos que modificar esta clase para añadir un nuevo 'if'
        }

        return area
    }
}

// Uso del código que viola OCP
const rectangulo = new Rectangulo(5, 4)
const circulo = new Circulo(3)
const circulo2 = new Circulo(6)
const calculador = new CalculadorArea()
const areaTotal = calculador.calcularAreaTotal([rectangulo, circulo, circulo2])
console.log(`Área total: ${areaTotal}`)
*/

// Ejemplo refactorizado

interface Figura {
    calcularArea(): number
}


class Rectangulo implements Figura {
    constructor(private ancho: number, private alto: number) { }
    calcularArea(): number {
        return this.ancho * this.alto
    }
}

class Circulo implements Figura {
    constructor(private radio: number) { }
    calcularArea(): number {
        return Math.PI * this.radio * this.radio
    }
}

class Triangulo implements Figura {
    constructor(private base: number, private altura: number) { }

    calcularArea(): number {
        return (this.base * this.altura) / 2
    }
}

class CalculadorAreaTotal {
    calcularArea(figuras: Figura[]): number {
        return figuras.reduce((sumaArea, figura) => sumaArea + figura.calcularArea(), 0)
    }
}

const rectangulo = new Rectangulo(5, 4)
const circulo = new Circulo(3)
const triangulo = new Triangulo(9, 5)
const calculador = new CalculadorAreaTotal()
const areaTotal = calculador.calcularArea([triangulo, rectangulo, circulo])
console.log(`Área total: ${areaTotal}`)