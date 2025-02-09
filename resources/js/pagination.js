var page = 1;

export function pagination(totalPages){
    
      let paginationDiv = document.getElementById('pagination');  
      paginationDiv.innerHTML = "";
      
      //list genres
      let ul = document.createElement('ul');
      ul.classList.add("flex","flex-row");
      if(page!=1){
        let li = document.createElement('li');
        li.classList.add( 'p-2', 'hover:text-blue-500', 'cursor-pointer');
        li.appendChild(document.createTextNode('<<'));

        li.addEventListener("click", function(){ prevPage(page)});
        ul.appendChild(li);
      }

       // Loop through
       let onSides = 3;

       let start = 1;
       let end = totalPages;
       if( parseInt(page) > (1 + 6)){
            start = page - 6;
            let li = document.createElement('li');
          
            li.classList.add( 'p-2', 'hover:text-blue-500', 'cursor-pointer');
           
            li.appendChild(document.createTextNode(1));
            li.addEventListener("click", function(){ changePage(1)});
            ul.appendChild(li);
       }

       if(page <= (totalPages - 5)){
        end = parseInt(page) + 6;
       }


       for (let i = start; i <= end; i++) {
      
           // Define offset
           let offset = (i == 1 || totalPages) ? onSides + 1 : onSides;
           // If added
           if (i == 1 || (page - offset <= i && page + offset >= i) || 
               i == page || i == page) {
                let li = document.createElement('li');
                if(i == page){
                    li.classList.add('text-gray-500', 'border', 'border-gray-500', 'p-2');
                }else{
                    li.classList.add( 'p-2', 'hover:text-blue-500', 'cursor-pointer');
                }
                li.appendChild(document.createTextNode(i));
                li.addEventListener("click", function(){ changePage(i)});
                ul.appendChild(li);
           } else if (i == page - (offset + 1) || i == page + (offset + 1)) {
                let li = document.createElement('li');
                li.classList.add( 'p-2', 'hover:text-blue-500', 'cursor-pointer');
                li.appendChild(document.createTextNode('...'));
              
                ul.appendChild(li);
              
           }
       }

        let li = document.createElement('li');
        if(totalPages > page + onSides + 1){
            if(totalPages == page){
                li.classList.add('text-gray-500', 'border', 'border-gray-500', 'p-2');
            }else{
                li.classList.add( 'p-2', 'hover:text-blue-500', 'cursor-pointer');
            }
            li.appendChild(document.createTextNode(totalPages));
            li.addEventListener("click", function(){ changePage(totalPages)});
            ul.appendChild(li);
        }
       if(page != totalPages){
        let li = document.createElement('li');
        li.classList.add('p-2', 'hover:text-blue-500', 'cursor-pointer');
        li.appendChild(document.createTextNode('>>'));
        li.addEventListener("click", function(){ nextPage(page)});
        ul.appendChild(li);
      }


      paginationDiv.append(ul);
}

export function getPage(){
    return page;
}
export function setPage(newpage){
    page = parseInt(newpage);
}

function prevPage(){
    page = page - 1;
    getMovies();
}
function nextPage(){
    page = page + 1;
    getMovies();
}
function changePage(selectedpage){
    page = selectedpage;
    getMovies(page);
}
