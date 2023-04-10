export function valida(input) {
  
  const tipoDeInput = input.dataset.tipo;//dataset que colocamos en el index

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML="";//borrando el mensaje del Span.
    }else{
    input.parentElement.classList.add("input-container--invalid");  
    input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input);
  }
}
/**Arreglo de tipos de errores posibles*/
const tipoDeErrores = [
  "valueMissing","typeMismatch","patternMismatch","customError"
];
/**cuando acceden a este arreglo enviar tipo de input:nombre
 * y el error: valueMissing entonces se devuelve el mensaje caracteristico 
 * que se desea mostrar 
 */
const mensajesDeError={
  nombre :{
    valueMissing: "El campo nombre no puede estar vacío"  
  },
  email : {
    valueMissing: "El campo email no puede estar vacío", 
    typeMismatch: "El correo no es válido"
  },
  password:{
    valueMissing: "Debe introducir una contraseña", 
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
  },
  nacimiento: {
    valueMissing: "Ingrese su fecha de nacimiento", 
    customError:"Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "Ingrese su número telefónico",
    patternMismatch:"El formato requerido es xxxxxxxxxx 10 números"
  },
  direccion: {
    valueMissing: "Ingrese su dirección",
    patternMismatch:"La dirección debe contener entre 10 a 40 caracteres."
  },
  ciudad: {
    valueMissing: "Ingrese la ciudad",
    patternMismatch:"La ciudad debe contener entre 4 a 30 caracteres."
  },
  estado: {
    valueMissing: "Ingrese el estado, este campo no puede estar vacío",
    patternMismatch:"El estado debe contener entre 4 a 30 caracteres."
  }
}


const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};
/**recorro el arreglo de tipos de errores*/
function mostrarMensajeDeError(tipoDeInput,input) {
  let mensaje= "";
  tipoDeErrores.forEach(error =>{
    if(input.validity[error]){
      console.log(tipoDeInput,error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje=mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
