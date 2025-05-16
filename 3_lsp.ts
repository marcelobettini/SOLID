// so L id
// Liskov Substitution Principle
// Ejemplo funcional, aunque viola LSP

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
