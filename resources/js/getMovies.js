
import { pagination, getPage, setPage } from "./pagination";

import { loaderHide, loaderShow, windowScrollTop } from "./generalFunc";



import img1 from '../images/no-images.png';



var divMovies = document.getElementById('moviesMainDiv');

export function callOnLoad(){
    var hash = window.location.hash;
   
    if(hash != ""){
        hash = hash.substring(1)
        let split = hash.split("#");
     
        if(split.length > 0){
            let array = [];
            for(let i = 0; i< split.length; i++){
                array[i] = split[i].split("=");
            }
         
            if(array[0][0] != undefined && array[0][0] == 'page'){
                let page = array[0][1];
                setPage(page);
             
            }
            if(array[1] && array[1][0] != undefined && array[1][0] == 'search'){
                let search = array[1][1];
                document.getElementById('search').value = search.replace("%20", " ");
               

            }
            if(array[2] && array[2][0] && array[2][0] == 'searchType'){
                let searchType = array[2][1];
                if(searchType){
                    let types = searchType.split(",");
                    if(types.length > 0){
                        document.querySelectorAll('.searchType').forEach(function(item){item.checked = false});
                        types.forEach(function(item){
                            document.querySelector('[name="'+item+'"]').checked = true;
                           
                        })
                    }
                }
            }

            getMovies();
        }
    }
}


export function clickSearch(){

    setPage(1);
    getMovies();
}


export function getMovies(newpage){
   
    document.querySelectorAll(".error").forEach(el => el.innerHTML = '');
  
    loaderShow();
    let url = '/get-movies';
    let search = document.getElementById('search').value;
    // let sortBy;
    // let sortByOrder;

    // let values = document.querySelector('.searchType:checked').value;
    let searchTypes =  Array.from(document.querySelectorAll('.searchType:checked')).map((p) => p.value);
    let searchType = searchTypes;
    if(searchTypes.length > 1){
        searchType = null;
    }else if(searchTypes.length == 1){
        // sortBy = document.querySelector('[name="sortBy"]').value;
        // sortByOrder = document.querySelector('[name = "order"]:checked').value;
    }
    let page = getPage();
    if(newpage != undefined){
        page = newpage
    }

    // add hash to url
        var url_ob = new URL(document.URL);
        url_ob.hash =  'page='+page+"#search="+search+"#searchType="+searchTypes+"#";
        var new_url = url_ob; 
        document.location = new_url, false;


    if(search != '' && searchTypes.length  > 0){
          
        const data = new URLSearchParams();

    
      
        data.append('search', search);
        data.append('page', page);
        data.append('searchType', searchType);
        // data.append('sortBy', sortBy);
        // data.append('sortByOrder', sortByOrder);
        callAjax(url, data);
    }else if(search == ''){
   
        loaderHide();;
       let error = document.getElementById('errorSearch');
       error.innerHTML +='Please enter what Movie/Tv show you like to search for';
    }else if(searchTypes.length  <= 0){
        loaderHide();;
        let error = document.getElementById('errorSearchTypes');
        error.innerHTML +='Please select type for your search';
    }
   
}

//call to get all the movies with search
function callAjax(url, data){
    
    url = url+"?"+data;
    // Making  request to route 
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
                divMovies.innerHTML = '';
               
              let movies = responce.results.results;
            //   let sortBy = document.querySelector('[name="sortBy"]').value;
            //  let sortByOrder = document.querySelector('[name = "order"]:checked').value;
            //   if(sortBy != undefined){
            //     movies.sort((a, b) => (a.title < b.title ? 1 : -1));
            //   }
              movies.forEach(appendMovie);
              loaderHide();
              windowScrollTop();
              
              if(responce.results.total_pages > 1){
                pagination(responce.results.total_pages)
              }
            }
        })
        .catch(errorMsg => {
            loaderHide();
            let error = document.getElementById('globalError');
            error.innerHTML += errorMsg;
            windowScrollTop();
            
        }); 
}

// creating div to show the movie item
function appendMovie(item) {
   
    let image = img1;
    let description;
    if(item.overview != undefined){
         description = item.overview.substring(0, 140) + '...';
    }
   
   
    let title;
    if(item.title != undefined){
        title = item.title;
    }else if(item.name != undefined){
        title = item.name;
    }

    let release_date;
    if(item.release_date != undefined){
        let date = new Date(item.release_date).toLocaleDateString();
        release_date = ` <p class="mb-0 text-sm !leading-snug text-neutral-800r">Release on: ${date}</p>`
    }else if(item.first_air_date != undefined){
        
        let date = new Date(item.first_air_date).toLocaleDateString();
         release_date = ` <p class="mb-0 text-sm !leading-snug text-neutral-800r">First air date: ${date}</p>`
    }
  

    if(item.backdrop_path != null){
        image = `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`;
    }
    let div = document.createElement('div');
    div.classList.add("w-full","md:w-1/3", "p-3");

    div.innerHTML += ` <div class="border border-gray-500 rounded-md  cursor-pointer">
        <div class="h-[200px] ">
         <img src="${image}" alt="#" class="w-full h-full object-cover object-center transition-all duration-150">
       </div>

        <div class=" p-2">
            <p class='text-neutral-800r text-2xl min-h-[70px]'>${title}</p>
          <p class="line-clamp-6 text-neutral-500 text-sm min-h-[70px] !leading-snug mb-3 pt-3">${description}</p>
          <p class="mb-0 text-sm !leading-snug text-neutral-800r">${release_date}</p>
        </div>
      </div> `;
   


    //get saved movies from storage
    let favoriteString = localStorage.getItem("favorite");
    let exist = -1;
    if(favoriteString){
        favoriteString = JSON.parse(favoriteString);
        exist = favoriteString.indexOf(item.id);
    }

    

    let buttonContent = getFavoriteBtnContent(exist);


    
    let button = document.createElement('button');
    button.classList.add("w-full","flex", "justify-center", "items-center", "rounded-[10px]", "text-center", "py-2", "px-2", "min-h-[40px]", "border", "border-red-500");
    button.innerHTML += buttonContent;


    button.addEventListener("click", function(){ addToFavorite(item.id, event)});
    div.addEventListener("click", function(){ showModal(item.id, item.media_type)});

    div.append(button);
    divMovies.append(div);
}

function getFavoriteBtnContent(exist){
    //set the icon -- red if is favorite 
    let svg;
     if( exist < 0){
        svg = `Save to favorite <?xml version="1.0" encoding="iso-8859-1"?>
        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 471.701 471.701" xml:space="preserve">
        <g>
            <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                C444.801,187.101,434.001,213.101,414.401,232.701z"/>
        </g>
        </svg>`
     }else{
        svg = `Favorite <svg height="15px" width="15px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.39"><defs><style>.cls-1{fill:#ed1b24;fill-rule:evenodd;}</style></defs><title>red-heart</title><path class="cls-1" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"/></svg>`
     }

     return svg;
}

// add or remove from local storage as favorite 
export function addToFavorite(id, e){
e.stopPropagation();  

let favArray = [];
    let favoriteString = localStorage.getItem("favorite");
    if(favoriteString){
        favArray = JSON.parse(favoriteString); 
    }

    let exist = favArray.indexOf(id);
    let buttonContent;
    if( exist < 0){
        favArray.push(id);
        buttonContent = getFavoriteBtnContent(1);
    }else{
        favArray.splice(exist, 1);
        buttonContent = getFavoriteBtnContent(-1);
    }
  
    e.target.innerHTML += "";
    e.target.innerHTML = buttonContent;

localStorage.setItem("favorite", JSON.stringify(favArray));

}

export function showHideSortOptions(){
    setPage(1);

    // let searchTypes =  Array.from(document.querySelectorAll('.searchType:checked')).map((p) => p.value);
    // let sortByOptions = document.getElementById('sortByOptions');
    // if(searchTypes.length > 1){
    //     sortByOptions.style.display = 'none';
    // }else{
    //     sortByOptions.style.display = '';;
    // }
}












