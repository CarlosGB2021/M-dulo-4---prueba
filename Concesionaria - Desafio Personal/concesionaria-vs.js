let autos = require('./autos.js');
let persona = require('./persona.js');

const concesionaria = {
   autos: autos.leerListaDeAutos(),
   persona: persona,

   buscarAuto: function(patente){//FUNCIONA
        let autoEncontrado = null
        let encontrado = this.autos.find(unAuto => unAuto.patente == patente)
        if(encontrado != undefined){
            autoEncontrado = encontrado
            //console.log('auto encontrado: ', autoEncontrado)
        }
        return autoEncontrado
    },

    venderAuto: function(patente){//FUNCIONA
        let autoEncontrado = this.buscarAuto(patente)
        this.autos.map(function(unAuto){
            if (unAuto == autoEncontrado){
                    unAuto.vendido = 'true'
            }
          })
        autos.escribirListaDeAutos(this.autos)
    },
    
    autosParaLaVenta: function(){//FUNCIONA
        let listaVenta = concesionaria.autos.filter(function(unAuto){// si pongo this.autos.filter - no funciona
            if (unAuto.vendido == 'false'){
                return unAuto
            }
        })
        return listaVenta
    },
    
    autosNuevos: function(){//FUNCIONA
        let disponiblesVenta = this.autosParaLaVenta()
        let autos0Km = disponiblesVenta.filter(function(unAuto){
            if(unAuto.km < 100){//Convierte string a number para comparar
                return unAuto
            }
        })
        return autos0Km
    },

    listaDeVentas: function(){//FUNCIONA
        //devuelve una lista que contiene el precio de venta de cada auto vendido
        //Recordá utilizar el this para llamar a una funcionalidad dentro del mismo objeto literal.
        //La función debe retornar un array de números.
        let autosVendidos = concesionaria.autos.filter(function(unAuto){
            if(unAuto.vendido == 'true'){
                return unAuto
            }
        })
        let totalAutosVendidos = []
        autosVendidos.forEach(unAuto => {
            totalAutosVendidos.push(unAuto.precio)
        })
        return totalAutosVendidos
    },

    totalDeVentas: function(){//FUNCIONA
        //devuelva la sumatoria del valor de todas las ventas realizadas. 
        //Acá el único requerimiento técnico explícito es que utilices la función reduce
        let totalVentas = this.listaDeVentas().reduce(function(acumulador, unPrecio){
            return parseInt(acumulador) + parseInt(unPrecio)
        })
        console.log(totalVentas)
        return totalVentas
    },

    puedeComprar: function(unAuto, unaPersona){//FUNCIONA
    // reciba por parámetro un auto y una persona y devuelva true si la misma puede comprar el auto.
    //Las personas solo sacan los autos en cuotas y tomando dos factores como condición de compra.
    // Una es el costo total: si el total de un auto excede lo que la persona considera caro, no va a comprar el auto. 
    //Otra condición es su capacidad de pago en cuotas: si la capacidad de pago en cuotas supera al costo de la cuota, va a poder pagarlo. 
    //Si ambas condiciones se cumplen, se realiza la compra.
        let puedeComprar = false //bandera
        let costoTotal = unaPersona.capacidadDePagoTotal - unAuto.precio
        let capacidadPago = unaPersona.capacidadDePagoEnCuotas - (unAuto.precio / unAuto.cuotas)
        if(costoTotal >= 0 && capacidadPago >= 0){
            puedeComprar = true
        }
        return puedeComprar
    },

    autosQuePuedeComprar: function(unaPersona){//FUNCIONA
        //recibe una persona y devuelve la lista de autos que puede comprar.
        //La función debe de realizar los siguientes pasos:
        //1) Obtener los autos para la venta
        //2) Por cada uno de los autos debe de probar si la persona puede comprarlo, ¿ya hay alguna funcionalidad que me permita hacer esto?.
        //3) Luego debemos retornar los que pueda comprar, ¿hay alguna manera de poder filtrar la lista de autos para la venta del punto 1 con el paso 2?
        let autosDisponiblesVenta = this.autosParaLaVenta()
        let disponibles = []
        autosDisponiblesVenta.forEach(function(unAuto){
            let puedeComprar = concesionaria.puedeComprar(unAuto, unaPersona)
            if(puedeComprar){
                disponibles.push(unAuto)
            }
        })
        //console.log('Autos que puede comprar: ', autosDisponiblesVenta)
        return disponibles
    }
}
//concesionaria.buscarAuto("APL124");
//concesionaria.venderAuto('APL123');
//console.log(concesionaria.listaDeVentas());
//concesionaria.puedeComprar(autos[0],persona);
//concesionaria.autosQuePuedeComprar(persona);
//console.log(concesionaria.autosParaLaVenta());
//console.log(concesionaria.autosNuevos());
//concesionaria.totalDeVentas();