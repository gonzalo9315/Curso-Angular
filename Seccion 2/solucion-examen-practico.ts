(()=>{

    // Uso de Let y Const
    let nombre = 'Ricardo Tapia';
    let edad = 23;
    
    const PERSONAJE = {
        nombre: nombre,
        edad: edad
    };
    console.log(`Nombre: ${PERSONAJE.nombre} y edad: ${PERSONAJE.edad}`);

    // Cree una interfaz que sirva para validar el siguiente objeto
    interface superhero{
        nombre: string,
        artesMarciales:string[]
    }
    
    const batman: superhero = {
        nombre: "Bruno Díaz",
        artesMarciales: ['Karate','Aikido','Wing Chun','Jiu-Jitsu']
    }
    
    // Convertir esta funcion a una funcion de flecha
    const resultadoDoble = (a:number, b:number) => (a+b)*2;
    console.log(`Resultado doble: ${resultadoDoble(5,5)}`);

    // Función con parametros obligatorios, opcionales y por defecto
    // donde NOMBRE = obligatorio
    //       PODER  = opcional
    //       ARMA   = por defecto = 'arco'
    const getAvenger = (nombre:string, poder?:string, arma:string ="arco") => {
        let mensaje:string;
        if(poder){
            mensaje = `${nombre} tiene el poder de ${poder} y un ${arma}`;
        }else
            mensaje = `${nombre} tiene un ${arma}`;

        return mensaje;
    };
    
    console.log(getAvenger("superman", "volar"));

    // Cree una clase que permita manejar la siguiente estructura
    // La clase se debe de llamar rectangulo,
    // debe de tener dos propiedades:
    //   * base
    //   * altura
    // También un método que calcule el área  =  base * altura,
    // ese método debe de retornar un numero.

    class Rectangulo{

        constructor(private base:number, private altura:number){}

        area = () => this.base*this.altura;
    }

    const rectangulo = new Rectangulo(5,5);
    console.log(rectangulo.area());
})();