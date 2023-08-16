let pagina = 1;

document.getElementById('btnSiguiente').addEventListener('click',()=>{
    if(pagina<1000){
        pagina++;
        cargarPelicula();
        }
});


document.getElementById('btnAnterior').addEventListener('click',()=>{

    if(pagina>1){
    pagina--;
    cargarPelicula();
    }
    
});

const cargarPelicula = async ()=>{ 
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4179656d6bd32ef6bfd1ff7cb835b74c&language=es-MX&page=${pagina}`);

    const datos = (await respuesta.json()).results.sort(compararPorVotacion);
    
    
    


    let peliculas = '';

    datos.forEach(elemento => {



        let color = votacionColor(elemento.vote_average);
        
        
        peliculas+= 
        `<div class="pelicula">
            <img src="https://image.tmdb.org/t/p/w500/${elemento.poster_path}">     
            <div class = "intro">
             <p class = "description">${elemento.overview}</p>
            </div>    
                <div class = "puntajeTitle">    
                <div class = "title">${elemento.title}</div>
                <div class = "vote"  style = "color:${color}">${elemento.vote_average}</div>
            </div>        
        </div> `;



    });

    document.querySelector('.contenedor').innerHTML =peliculas;
}

function compararPorVotacion(pelicula1, pelicula2) {
    return pelicula1.vote_average - pelicula2.vote_average;

}

function votacionColor(vote){
    if(vote<5){ 
        return 'red';
    }else if(vote>=5 && vote<=7.4){ 
        return 'orange';
    }else if(vote >= 7.5){
        return 'green';
    }
}


cargarPelicula();