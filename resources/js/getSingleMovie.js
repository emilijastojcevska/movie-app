import { windowScrollTop } from "./generalFunc";
import img1 from '../images/no-images.png';
var loader = document.getElementById('loader');
export function showModal(id, type){
    if(id != undefined){
        loader.style.display = '';
        let url = '/get-movie';
        const data = new URLSearchParams();
        data.append('id', id);
        data.append('type', type);
        url = url+"?"+ data;
        fetch(url,{ 
            method: 'GET', 
         })
         .then(function(response) {
     
            if (!response.ok) {
              
                throw new Error(response.statusText);
            }
            return response.json();
        }) 
        .then(responce => {
            if(responce.status){
                let movie = responce.results
                displayModal(movie);

                loader.style.display = 'none';
            }
            
            
        })
        .catch(errorMsg => {
            loader.style.display = 'none';
            let error = document.getElementById('globalError');
            error.innerHTML += errorMsg;
            windowScrollTop();
            
        }); 
    }
  
}

// display movie details
function displayModal(movie){
    let modal = document.getElementById('modalShowMovie');
    let modalBody = document.getElementById('movieModalBody');
    let title;
    if(movie.title != undefined){
        title = movie.title;
    }else if(movie.name != undefined){
        title = movie.name;
    }
    let image = img1;
    if(movie.backdrop_path != null){
        image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    }
    let rightBottomVar;
    if(movie.runtime != undefined){
        let runtime = `${movie.runtime / 60 ^ 0}:` + movie.runtime % 60;

        rightBottomVar = `
         <div class="flex flex-row justify-center items-center">
            
            <?xml version="1.0" encoding="iso-8859-1"?>
           
                    <svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 489.42 489.42" xml:space="preserve">
                    <g>
                    <g>
                            <path d="M46.1,138.368c4.2,2.1,16.1,8.4,29.1-6.2c5.2-7.3,10.4-14.6,16.6-21.8c7.3-8.3,6.2-21.8-2.1-29.1
                                c-8.3-7.3-21.8-6.2-29.1,2.1s-14.6,17.7-20.8,27C33.7,119.668,36.8,132.068,46.1,138.368z"/>
                            <path d="M249,40.568c19.8,0,39.5,3.1,58.3,9.4c12.6,3.7,21.8-4.2,26-12.5c3.1-11.4-3.1-22.9-13.5-26
                                c-22.9-7.3-45.8-11.4-69.7-11.4c-11.4,0-20.8,8.3-20.8,19.8S237.6,40.568,249,40.568z"/>
                            <path d="M434.2,167.468c7.3,17.7,11.4,36.4,13.5,55.1c0,0,1.2,23.2,22.9,19.8c21.5-2.8,18.7-23.9,18.7-23.9
                                c-2.1-22.9-8.3-45.8-16.6-66.6c-5.2-10.4-16.6-15.6-27-11.4C435.2,145.668,430,157.068,434.2,167.468z"/>
                            <path d="M359.3,75.968c16.6,11.4,31.2,25,43.7,40.6c9.3,11.6,25,6.8,28.1,3.1c8.3-7.3,10.4-20.8,3.1-29.1
                                c-14.6-17.7-32.3-34.3-52-47.9c-9.4-6.2-21.8-4.2-28.1,5.2S349.9,69.668,359.3,75.968z"/>
                            <path d="M134.6,72.768c16.6-10.4,35.4-18.7,54.1-23.9c11.4-3.1,17.7-14.6,14.6-25c-3.1-11.4-14.6-17.7-25-14.6
                                c-22.9,6.2-44.7,15.6-64.5,28.1c-9.4,6.2-12.5,18.7-6.2,28.1C111.7,71.768,120.5,77.968,134.6,72.768z"/>
                            <path d="M468.5,268.368c-11.4-3.1-21.8,4.2-23.9,15.6c-2.1,9.4-8.5,31.3-8.6,33.4c-27.5,71.5-93.5,121.8-169.3,129.9
                                c-74.6,7.8-147.2-25.9-189.3-86.5l38.5,8.5c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-81.1-17.7
                                c-5.2-1-21.4,0-25,15.6l-17.7,82.2c-2.1,10.4,4.2,21.8,15.6,23.9c12.7,1.3,21.8-6.2,25-16.6l6.2-28.2
                                c46.3,62.7,129.9,109.1,223.7,99c94.6-10.2,174.8-73.9,206-163.3c1-2.6,5.7-24.4,7.3-32.3
                                C487.3,280.868,480,270.468,468.5,268.368z"/>
                            <path d="M164.6,265.268h95.9c11.4,0,19.8-9.4,20.8-20.8v-142.2c0-11.4-9.4-20.8-20.8-20.8c-11.4,0-20.8,9.4-20.8,20.8v121.4h-75.1
                    c-11.4,0-20.8,9.4-20.8,20.8S153.1,265.268,164.6,265.268z"/>
                    </g>
                    </g>
                </svg>
                <span class="ml-1">${runtime}</span>
            </div>
        
        `


    }else{
     rightBottomVar = `
       <div class="flex flex-row justify-center items-center">
            <span class="ml-1">E: ${movie.number_of_episodes}</span>
            <span class="ml-1">S: ${movie.number_of_seasons}</span>

            </div>`;
    }
    

  

    modalBody.innerHTML = ""; 

    modalBody.innerHTML += `
        <div class="h-[200px] ">
         <img src="${image}" alt="#" class="w-full h-full object-cover object-center transition-all duration-150">
       </div>

       <div class=" p-2">
            <p class='text-neutral-800r text-2xl min-h-[70px]'>${title}</p>
            <p class="line-clamp-6 text-neutral-500 text-sm min-h-[70px] !leading-snug mb-3 pt-3">${movie.overview}</p>
         

        </div>
       
      
        `
        if(movie.genres != undefined){
            movie.genres.forEach(function(item){
            
                modalBody.innerHTML+= `
                <div class="inline-block mt-2 text-sm border rounded-md border-indigo-900 p-1"> ${item.name}</div>
            `   
            })
        }
        



        modalBody.innerHTML+=  `
        
        
        <div class="flex flex-row flex-wrap justify-between mt-3">
            <div class="flex flex-row justify-center items-center"> 
                <?xml version="1.0" encoding="iso-8859-1"?>

                <svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 473.486 473.486" xml:space="preserve">
                <polygon points="473.486,182.079 310.615,157.952 235.904,11.23 162.628,158.675 0,184.389 117.584,299.641 91.786,462.257 
                    237.732,386.042 384.416,460.829 357.032,298.473 "/>
                </svg>
                
                <span class="ml-1"> ${movie.vote_average} </span>
            
            </div>
            ${rightBottomVar}
            
            </div>
        </div>
    `

   

    modal.style.display = '';
}

export function closeModal(id){
    let modal = document.getElementById(id);
     modal.style.display = 'none';
 }
 