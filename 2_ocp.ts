
/* s<O>lid
Open / Closed Principle
Principio de Abierto / Cerrado (OCP)
Las entidades de software (clases, módulos, funciones) deben estar abiertas para extensión pero cerradas para modificación.
Deberíamos poder añadir nuevas funcionalidades sin modificar el código existente. En lugar de cambiar código que ya funciona, debemos extenderlo.

Ejemplo funcional violando OCP
*/

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
    calcularAreaTotal(figuras: Array<Rectangulo | Circulo>): number {
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

/*
Cada vez que se añade un nuevo tipo de figura, hay que modificar el método calcularAreaTotal
El código es propenso a errores, (podríamos olvidar añadir un nuevo tipo)
La clase CalculadorAreaTotal tiene que conocer los detalles internos de cada tipo de figura
La clase no está cerrada para modificación
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
    calcularAreaTotal(figuras: Figura[]): number {
        return figuras.reduce((sumaArea, figura) => sumaArea + figura.calcularArea(), 0)
    }
}

const rectangulo = new Rectangulo(5, 4)
const circulo = new Circulo(3)
const triangulo = new Triangulo(9, 5)
const calculador = new CalculadorAreaTotal()
const areaTotal = calculador.calcularAreaTotal([triangulo, rectangulo, circulo])
console.log(`Área total: ${areaTotal}`)

/*
Podemos añadir nuevas figuras sin modificar el código existente
El código es más flexible y extensible
Las responsabilidades están mejor distribuidas (cada figura sabe cómo calcular su propia área)
Mayor cohesión y menor acoplamiento
Facilita cumplir con el Principio de Responsabilidad Única (por eso dijimos que los principios suelen interconectarse)
 */