export default function validateDni(dni: string): boolean {
  //Validamos que la cédula solo contenga 10 dígitos
  if (dni.length === 10) {
    //Definimos el último dígito o tambien llamado dígito verificador
    const lastDigit = parseInt(dni[dni.length - 1]);

    //Definimos variables a utilizar
    let pares = 0;
    let impares = 0;
    let suma = 0;

    //Iteramos cada item excluyendo el último digito, aplicando el Algoritmo de Luhn
    for (let i = 1; i <= dni.length - 1; i++) {
      if (i % 2 === 0) {
        pares += parseInt(dni[i - 1]);
      } else {
        let x = parseInt(dni[i - 1]) * 2;
        x > 9 ? (impares += x - 9) : (impares += x);
      }
    }

    suma += pares + impares;

    //extraemos el primer digito de la suma
    const firstDigit = parseInt(suma.toString()[0]);

    //Obtenemos la decena
    const decena = (firstDigit + 1) * 10;

    //Obtenemos el digito validador
    let validatorDigit = decena - suma;

    //Si el dígito verificador es mayor a 10 lo igualamos a 0
    if (validatorDigit >= 10) {
      validatorDigit = 0;
    }

    //Codigo de provincia
    //Validamos si la cedula pertenece a alguna provincia
    const provinceCode = parseInt(dni[0] + dni[1]);

    //Valida cédulas locales y de Ecuatorianos en el exterior
    if (provinceCode > 24 && provinceCode != 30) {
      return false;
    }

    if (validatorDigit == lastDigit) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
