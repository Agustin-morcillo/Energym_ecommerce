
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{2,}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // que sea email
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/, //minimo 8, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico
    avatar: /(.jpg|.jpeg|.png|.gif)$/i //que sea de esos formatos.
}



/* Clases para los errores
- "front-error-inactive" -- oculta el mensaje de error de las expresiones.
- "front-error-active" -- hace visible el mensaje de error de las expresiones.
- "wrong-input" -- pinta de rojo el input.
- "wrong-label" -- pinta de rojo la label.
- "front-blank-error-inactive" -- oculta el mensaje de campo en blanco.
- "front-blank-error-active" -- activa el mensaje de campo en blanco. */




