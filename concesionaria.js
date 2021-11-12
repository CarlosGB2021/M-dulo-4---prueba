let autos = require('./autos.js');
let persona = require('./persona');
const concesionaria = {
   autos: autos,
   persona: persona,

   buscarAuto: function(patente){
        let encontrado = null//funciona como bandera, si encuentra, devuelve el elemento, sino, se mantiene en null.
        autos.forEach(function(elemento){//itera por cada objeto del array
          if(elemento.patente == patente){//compara las patentes de cada objeto
              encontrado = elemento//asigna el objeto encontrado
            }
        })

        return encontrado// devuelve un objeto o null.
    },

    venderAuto: function(patente){
        let encontrado = this.buscarAuto(patente)
        if(encontrado != null){
          encontrado.vendido = true
        }   
    },

    autosParaLaVenta: function(){//poder tener la lista de autos para la venta.
        //no deberían de aparecer los autos que ya fueron vendidos.
        let listaVenta = autos.filter(function(elemento){
            if (elemento.vendido == false){
                return elemento
            }
        })
        return listaVenta
    },
    /*
    autosParaLaVenta : function (){
        let lista = this.autos();
        let resultado = lista.filter((item)=> {return item.vendido == false} );
        return resultado
    }*/

    autosNuevos: function(){
        let disponiblesVenta = this.autosParaLaVenta()
        let autos0Km = disponiblesVenta.filter(function(elemento){
            if(elemento.km < 100){
                return elemento
            }
        })
        return autos0Km
    },

    listaDeVentas: function(){//devuelve una lista que contiene el precio de venta de cada auto vendido
        //Recordá utilizar el this para llamar a una funcionalidad dentro del mismo objeto literal.
        //La función debe retornar un array de números.
    
        let autosVendidos = autos.filter(function(elemento){
            if(elemento.vendido == true){
                return elemento
            }
        })
        let vendidos = []
        autosVendidos.forEach(elemento => {
            vendidos.push(elemento.precio)
        })
        return vendidos
    },

    totalDeVentas: function(){//devuelva la sumatoria del valor de todas las ventas realizadas. 
        //Acá el único requerimiento técnico explícito es que utilices la función reduce
        let totalVentas = this.listaDeVentas().reduce(function(acumulador, elemento){
            return acumulador + elemento
        })
        console.log(totalVentas)
        return totalVentas
    },

    puedeComprar: function(auto,persona){// reciba por parámetro un auto y una persona y devuelva true si la misma puede comprar el auto.
    //Las personas solo sacan los autos en cuotas y tomando dos factores como condición de compra.
    // Una es el costo total: si el total de un auto excede lo que la persona considera caro, no va a comprar el auto. 
    //Otra condición es su capacidad de pago en cuotas: si la capacidad de pago en cuotas supera al costo de la cuota, va a poder pagarlo. 
    //Si ambas condiciones se cumplen, se realiza la compra.
        let puedeComprar = false //bandera
        let costoTotal = persona.capacidadDePagoTotal - auto.precio
        let capacidadPago = persona.capacidadDePagoEnCuotas - (auto.precio / auto.cuotas)
        if(costoTotal >= 0 && capacidadPago >= 0){
            puedeComprar = true
        }
        if(puedeComprar){
            console.log ('puede comprar')
        } else {
            console.log('no puede comprar')
        }
        return puedeComprar
    },

    autosQuePuedeComprar: function(persona){
        //recibe una persona y devuelve la lista de autos que puede comprar.
        //La función debe de realizar los siguientes pasos:
        //1) Obtener los autos para la venta
        //2) Por cada uno de los autos debe de probar si la persona puede comprarlo, ¿ya hay alguna funcionalidad que me permita hacer esto?.
        //3) Luego debemos retornar los que pueda comprar, ¿hay alguna manera de poder filtrar la lista de autos para la venta del punto 1 con el paso 2?
        let autosDisponiblesVenta = this.autosParaLaVenta()
        let disponibles = []
        autosDisponiblesVenta.forEach(function(elemento){
            let puedeComprar = concesionaria.puedeComprar(elemento, persona)
            if(puedeComprar){
                disponibles.push(elemento)
            }
        })
        console.log('autos disponibles', autosDisponiblesVenta)
        return disponibles
    }
}

concesionaria.listaDeVentas()
concesionaria.puedeComprar(autos[0],persona);
concesionaria.autosQuePuedeComprar(persona);