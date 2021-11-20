let autos = [
    {
        marca: 'Ford',//string
        modelo: 'Fiesta',//entero
        precio: 150000,//real
        km: 200,//entero
        color: 'Azul',//string
        cuotas: 12,//entero
        anio:2019,//entero
        patente: 'APL123',//string
        vendido: false//boolean
        },
        {
        marca: 'Toyota',//string
        modelo: 'Corolla',//number
        precio: 100000,//number
        km: 0,//number
        color: 'Blanco',//string
        cuotas: 14,//number
        anio:2019,//number
        patente: 'JJK116',//string
        vendido: false//boolean
    }
]

let persona = {
   nombre: 'nombre',//string
   capacidadDePagoEnCuotas: 20000, //number
   capacidadDePagoTotal: 200000//number
}

let concesionaria = {
    autos: autos,
    buscarAuto: function(patente){//FUNCIONA
           let encontrado = null
           autos.forEach(function(elemento){
                 if(elemento.patente == patente){
                     encontrado = elemento
                    // console.log('Auto encontrado',encontrado)
                 }
            })
         return encontrado
      },

    venderAuto: function(patente){//FUNCIONA
             let encontrado = this.buscarAuto(patente)
             if(encontrado != null){
               encontrado.vendido = true
               //console.log('Auto vendido: ', encontrado)
               }   
     },

    autosParaLaVenta: function(){//FUNCIONA
        let listaVenta = autos.filter(function(elemento){
        if (elemento.vendido == false){
               return elemento
        }
    })
            //console.log('Autos para la venta: ', listaVenta)  
            return listaVenta
     },

     autosNuevos: function(){//FUNCIONA
       let disponiblesVenta = this.autosParaLaVenta()
       let autos0Km = disponiblesVenta.filter(function(elemento){
           if(elemento.km < 100){
               return elemento
           }
       })
       //console.log('Autos 0km: ',autos0Km)
       return autos0Km
   },

   listaDeVentas: function(){//FUNCIONA
      let autosVendidos = autos.filter(function(elemento){
           if(elemento.vendido == true){
               return elemento
           }
       })
       let vendidos = []
       autosVendidos.forEach(elemento => {
           vendidos.push(elemento.precio)
       })
       //console.log('Lista de Venta: ', vendidos)
       return vendidos
   },

   totalDeVentas: function(){ //FUNCIONA
       let total =  this.listaDeVentas().reduce(function(elemento, acumulador){
          return acumulador + elemento },0)
        //console.log('Total de Ventas: ', total)
        return total
   },

  puedeComprar: function(auto,persona){
       let puedeComprar = false 
       let costoTotal = persona.capacidadDePagoTotal - auto.precio
       let capacidadPago = persona.capacidadDePagoEnCuotas - (auto.precio / auto.cuotas)
       if(costoTotal >= 0 && capacidadPago >= 0){
           puedeComprar = true
       }
       return puedeComprar
   },

   autosQuePuedeComprar: function(persona){//FUNCIONA
       let autosDisponiblesVenta = this.autosParaLaVenta()
       let disponibles = []
       autosDisponiblesVenta.forEach(function(elemento){
           let puedeComprar = concesionaria.puedeComprar(elemento, persona)
           if(puedeComprar){
               disponibles.push(elemento)
           }
       })
       //console.log('Autos que puede comprar: ', disponibles)
       return disponibles
   }

}

//concesionaria.buscarAuto('JJK116');
//concesionaria.venderAuto('JJK116');
//concesionaria.autosParaLaVenta();
//concesionaria.autosNuevos();
//concesionaria.listaDeVentas();
//concesionaria.totalDeVentas();
//concesionaria.autosQuePuedeComprar(persona);