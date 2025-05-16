/*
so<L>id
Liskov Substitution Principle
Principio de Sustitución de Liskov (LSP)
Este es un poco más complejo de entender. Paciencia: Los objetos de una superclase deben poder ser reemplazados por objetos de sus subclases sin afectar la corrección del programa. Este principio establece que las subclases deben comportarse de manera consistente con sus superclases. Las subclases pueden ampliar el comportamiento de la superclase, pero no deben alterarlo de forma que se rompa la funcionalidad existente.

Ejemplo funcional que viola LSP
*/

/*
class Ave {
    comer(): void {
        console.log("El ave está comiendo")
    }
    volar(): void {
        console.log("El ave está volando")
    }
}

class Pinguino extends Ave {
    // Los pingüinos no pueden volar, por lo que sobrescribimos el método
    // de una manera que rompe el comportamiento esperado
    volar(): void {
        throw new Error("Los pingüinos no pueden volar")
    }
}

function hacerVolarAve(ave: Ave): void {
    // Esta función espera que cualquier Ave pueda volar
    ave.volar()
}

// Uso del código que viola LSP
const gorrion = new Ave()
const pinguino = new Pinguino()

hacerVolarAve(gorrion) // Funciona correctamente
try {
    hacerVolarAve(pinguino) // Error: Los pingüinos no pueden volar
} catch (error: any) {
    console.error(error.message)
}
*/

/*
El pingüino no puede cumplir con el contrato establecido por la clase Ave
El código falla en tiempo de ejecución (se le rompe al usuario), lo que es peor que fallar en tiempo de compilación (se le rompe al programador)
Rompe el comportamiento esperado de la superclase
Cualquier código que use Ave podría fallar con un Pinguino
*/

interface AveComedora {
    comer(): void
}

interface AveVoladora extends AveComedora {
    volar(): void
}

class AveBase implements AveComedora {
    comer(): void {
        console.log("El ave está comiendo.")
    }
}

class AveVoladoraBase extends AveBase implements AveVoladora {
    volar(): void {
        console.log("El ave vuela graciosamente.")
    }
}

class Gorrion extends AveVoladoraBase {
    hacerNido(lugar: string): void {
        console.log(`El gorrión está haciendo un nido en ${lugar}`)
    }
}

class Pinguino extends AveBase {
    nadar(): void {
        console.log("El Pingüino está nadando.")
    }
}

function hacerVolarAve(ave: AveVoladora): void {
    ave.volar()
}

const gorrion = new Gorrion()
const pinguino = new Pinguino()
hacerVolarAve(gorrion)
pinguino.nadar()


/*
La jerarquía de clases refleja mejor la realidad del dominio (es decir, de la realidad de los objetos en el mundo)
Se evitan errores en tiempo de ejecución
El código es más seguro debido a la verificación de tipos en compilación
Las interfaces definen claramente qué comportamiento se espera
Se puede reutilizar el código común sin forzar comportamientos inapropiados
*/
