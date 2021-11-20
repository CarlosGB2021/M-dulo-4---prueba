const fs = require('fs');

let archivoAutos = {
    listaAutos: './listaDeAutos.json',
    leerListaDeAutos: function () {//FUNCIONA
        return JSON.parse(fs.readFileSync(this.listaAutos, 'utf-8'))
    },
    
    escribirListaDeAutos: listaAutosActualizado => {
        let nuevaListaDeAutos = JSON.stringify(listaAutosActualizado,null,' ')
        fs.writeFileSync('./listaDeAutos.json',nuevaListaDeAutos) // poner la ruta si o si.
    },
}
module.exports = archivoAutos;
