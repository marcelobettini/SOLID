/* <S>olid
Single Responsibility Principle
Principio de Responsabilidad Única (SRP)
Una clase debe tener una única razón para cambiar, lo que significa que debe tener una sola responsabilidad. Cada clase debe
encargarse de una sola funcionalidad. Cuando una clase tiene múltiples responsabilidades, se vuelve más propensa a errores y más difícil de mantener.

Ejemplo funcional violando SRP
/*
/*
class Usuario {
    private nombre: string
    private email: string
    private password: string

    constructor(nombre: string, email: string, password: string) {
        this.nombre = nombre
        this.email = email
        this.password = password
    }

    // Responsabilidad 1: Validación de datos
    validarEmail(): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(this.email)
    }

    validarPassword(): boolean {
        return this.password.length >= 8
    }

    // Responsabilidad 2: Persistencia de datos
    guardarEnBaseDeDatos(): void {
        console.log(`Guardando usuario ${this.nombre} en la base de datos`)
        // Código para conectar con la base de datos y guardar el usuario
    }

    // Responsabilidad 3: Envío de notificaciones
    enviarEmailBienvenida(): void {
        console.log(`Enviando email de bienvenida a ${this.email}`)
        // Código para enviar un email
    }
}

// Uso de la clase con múltiples responsabilidades
const usuario = new Usuario("Juan", "juan@ejemplo.com", "prd123")
if (usuario.validarEmail() && usuario.validarPassword()) {
    usuario.guardarEnBaseDeDatos()
    usuario.enviarEmailBienvenida()
}

*/

/*
La clase Usuario se encarga de validar datos, persistencia y envío de notificaciones
Si cambia la forma de validar emails, hay que modificar esta clase
Si cambia la forma de guardar en la base de datos, hay que modificar esta clase
Si cambia la forma de enviar emails, hay que modificar esta clase
La clase es más difícil de probar, ya que tiene demasiadas dependencias
*/

// Ejemplo refactorizado

class Usuario {
    private nombre: string
    private email: string
    private password: string

    constructor(nombre: string, email: string, password: string) {
        this.nombre = nombre
        this.email = email
        this.password = password
    }

    getNombre(): string {
        return this.nombre
    }
    getEmail(): string {
        return this.email
    }

    getPassword(): string {
        return this.password
    }
}

class ValidadorUsuario {
    validarEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }
    validarPassword(password: string): boolean {
        return password.length >= 8
    }
}

class RespositorioUsuario {
    guardarEnBaseDeDatos(usuario: Usuario): void {
        console.log(`Guardando usuario ${usuario} en la base de datos`)
        // Código para conectar con la base de datos y guardar el usuario
    }
}

class NotificadorUsuario {
    enviarEmailBienvenida(email: string): void {
        console.log(`Enviando email de bienvenida a ${email}`)
        // Código para enviar un email
    }
}

const usuario = new Usuario("Juan", "juan@ejemplo.com", "psdasdfrd123")
const validador = new ValidadorUsuario()
const repositorio = new RespositorioUsuario()
const notificador = new NotificadorUsuario()

if (validador.validarEmail(usuario.getEmail()) && validador.validarPassword(usuario.getPassword())) {
    repositorio.guardarEnBaseDeDatos(usuario)
    notificador.enviarEmailBienvenida(usuario.getEmail())
}
/*
Cada clase tiene una única responsabilidad (facilita el mantenimiento)
Las clases son más pequeñas y fáciles de entender
Las clases son más fáciles de probar de forma aislada
Los cambios en una responsabilidad no afectan a las demás
Mayor reutilización del código
*/