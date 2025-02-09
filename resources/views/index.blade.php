<x-app-layout>

<div class="flex flex-wrap flex-col max-w-[1440px] h-full mx-auto px-5">
  <div class=" w-full text-2xl text-center text-bold"> Search your favorite Movies </div>
    <div class="w-full flex flex-row justify-center my-5">
      <div class="px-1.5 py-1 w-full min-[450px]:w-auto">
        <div class="relative w-auto min-[450px]:w-[500px]">
        
            
            <input name="search" id="search"  class="border w-full max-w-full border-[#E5E5E5] bg-white rounded-[10px] py-2.5 pl-12 pr-9 min-h-[44px] focus:bg-[#FAFAFA] focus:border-[#FAFAFA] transition-all duration-150 !ring-0 !outline-none" placeholder="Search">
            <svg class="absolute left-[14px] top-1/2 -translate-y-1/2 z-10" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M20.5 11.8984C20.5 16.869 16.4706 20.8984 11.5 20.8984C6.52944 20.8984 2.5 16.869 2.5 11.8984C2.5 6.92788 6.52944 2.89844 11.5 2.89844C16.4706 2.89844 20.5 6.92788 20.5 11.8984Z" fill="#737373" stroke="#737373"/>
                <path d="M21.3005 21.897C21.2461 21.897 21.1955 21.8749 21.1641 21.8435L19.3041 19.9835C19.2337 19.9131 19.224 19.7873 19.3072 19.6976C19.3784 19.6297 19.5026 19.6216 19.5911 19.7047L21.447 21.5606C21.5156 21.6292 21.5266 21.7507 21.4498 21.8399C21.4026 21.8794 21.3481 21.897 21.3005 21.897Z" fill="#737373" stroke="#737373"/>
            </svg>
            <a onClick="clickSearch()" class="absolute right-[14px] top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                Search
            </a>

            

        
        </div>
        <div id="errorSearch" class="text-red-500 text-center error"></div>
        

        <div class="relative w-auto flex justify-evenly items-center mt-3">
          <div class="flex items-center mb-5">
            <input checked
             onchange="showHideSortOptions()" 
             id="movie" type="checkbox" value="movie" name="movie" class="h-5 w-5 border bg-white checked:bg-colorgreen checked:focus:bg-colorgreen checked:hover:bg-colorgreen  border-neutral-200 checked:border-colorgreen focus:outline-none transition duration-200 rounded-[5px] align-top bg-no-repeat bg-center bg-contain cursor-pointer focus:ring-0 focus:ring-offset-0 z-20 searchType" >
            <label for="movie" class="ms-2 text-[15px] leading-tight text-colormain">Movies</label>
          </div>
          <div class="flex items-center mb-5">
            <input checked 
            onchange="showHideSortOptions()" 
            id="tv" type="checkbox" value="tv"  name="tv" class="h-5 w-5 border bg-white checked:bg-colorgreen checked:focus:bg-colorgreen checked:hover:bg-colorgreen  border-neutral-200 checked:border-colorgreen focus:outline-none transition duration-200 rounded-[5px] align-top bg-no-repeat bg-center bg-contain cursor-pointer focus:ring-0 focus:ring-offset-0 z-20 searchType" >
            <label for="tv" class="ms-2 text-[15px] leading-tight text-colormain">Tv</label>
          </div>

          
        </div>
        <div class="relative w-auto flex justify-evenly items-center mt-3 " id="sortByOptions" style="display: none">
          <div class="w-1/2 px-1">
            <div class="relative">
                <select class="w-full border border-[#E5E5E5] bg-white rounded-[8px] block placeholder:text-[#737373] text-black text-base !leading-tight min-h-[56px] px-4 py-3 hover:border-colorgreen focus:border-colorgreen transition-all duration-300 !outline-none !ring-0 disabled:bg-gray-100 disabled:border-[#E5E5E5] autofill:!bg-white placeholder-shown:!bg-white peer" id="sortBy" name="sortBy"  placeholder="">

                    <option value="">Sort By</option>
                    <option value="title">Title</option>
                    <option value="year">Release Year </option>
                  
                    
                </select>
                <label for="sortBy" class="hidden absolute text-[#737373] rounded-sm text-base !leading-tight duration-300 transform -translate-y-[18px] scale-75 top-2 z-10 origin-[0] bg-white  px-3.5 peer-focus:px-3.5 peer-focus:[#737373] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] start-1">Sort By</label>
            </div>
          </div>
          <div class="inline-flex items-center">
            <label class="relative flex items-center cursor-pointer" for="asc">
              <input name="order" type="radio" class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id="asc" value="asc" checked >
              <span class="absolute bg-blue-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              </span>
            </label>
            <label class="ml-2 text-slate-600 cursor-pointer text-sm" for="asc">ASC</label>
          </div>
          <div class="inline-flex items-center">
            <label class="relative flex items-center cursor-pointer" for="desc">
              <input name="order" type="radio" class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id="desc" value="desc">
              <span class="absolute bg-blue-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              </span>
            </label>
            <label class="ml-2 text-slate-600 cursor-pointer text-sm" for="desc">DESC</label>
          </div>
        </div>

        <div id="errorSearchTypes" class="text-red-500 text-center error"></div>
        <div id="globalError" class="text-red-500 text-center error"></div>
      </div>
    </div>
    <div class="w-full">
      <div id="moviesMainDiv" class="flex flex-wrap flex-row items-center justify-center -mx-3">
        <div class="w-full"><p class="text-2xl text-center "> Enter title and start your search for movie or Tv show </p></div>
      
      
      </div>
      <div id="pagination" class="flex flex-center justify-center items-center my-3">

      </div>
    </div>
</div>
@push('modals')

<div id="modalShowMovie" style="display: none" class="fixed inset-0 z-[9990] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-center justify-center min-h-screen px-4 text-center sm:p-0">
      <div 
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40" aria-hidden="true"
      ></div>

      <div 
          class="inline-block w-full p-5 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl max-w-[440px]"
      >

          <button onclick="closeModal('modalShowMovie')" class="text-gray-600 focus:outline-none hover:text-gray-700 absolute right-[18px] top-[18px]">
              <svg class="fill-black" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.40994 6.00019L11.7099 1.71019C11.8982 1.52188 12.004 1.26649 12.004 1.00019C12.004 0.733884 11.8982 0.478489 11.7099 0.290185C11.5216 0.101882 11.2662 -0.00390625 10.9999 -0.00390625C10.7336 -0.00390625 10.4782 0.101882 10.2899 0.290185L5.99994 4.59019L1.70994 0.290185C1.52164 0.101882 1.26624 -0.00390625 0.999939 -0.00390625C0.733637 -0.00390625 0.478243 0.101882 0.289939 0.290185C0.101635 0.478489 -0.00415277 0.733884 -0.00415277 1.00019C-0.00415278 1.26649 0.101635 1.52188 0.289939 1.71019L4.58994 6.00019L0.289939 10.2902C0.196211 10.3831 0.121816 10.4937 0.0710478 10.6156C0.0202791 10.7375 -0.00585938 10.8682 -0.00585938 11.0002C-0.00585938 11.1322 0.0202791 11.2629 0.0710478 11.3848C0.121816 11.5066 0.196211 11.6172 0.289939 11.7102C0.382902 11.8039 0.493503 11.8783 0.615362 11.9291C0.737221 11.9798 0.867927 12.006 0.999939 12.006C1.13195 12.006 1.26266 11.9798 1.38452 11.9291C1.50638 11.8783 1.61698 11.8039 1.70994 11.7102L5.99994 7.41019L10.2899 11.7102C10.3829 11.8039 10.4935 11.8783 10.6154 11.9291C10.7372 11.9798 10.8679 12.006 10.9999 12.006C11.132 12.006 11.2627 11.9798 11.3845 11.9291C11.5064 11.8783 11.617 11.8039 11.7099 11.7102C11.8037 11.6172 11.8781 11.5066 11.9288 11.3848C11.9796 11.2629 12.0057 11.1322 12.0057 11.0002C12.0057 10.8682 11.9796 10.7375 11.9288 10.6156C11.8781 10.4937 11.8037 10.3831 11.7099 10.2902L7.40994 6.00019Z"/>
              </svg>
          </button>

          <div class="mx-auto w-[260px] max-w-full text-center mb-5" id="movieModalBody" >
             
            
          </div>

          
      </div>
  </div>
</div>

@endpush
@push('scripts')

@vite(['resources/js/getMovies.js'])



@endpush
</x-app-layout>