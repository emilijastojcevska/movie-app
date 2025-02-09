<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class MovieController extends Controller
{
    protected $token;
    public function __construct()
    {
        $this->token = env('MOVIE_API_READ_ACCESS_TOKEN');
    }
    public function index(){
        return view('index');
    }
    public function getMovies(Request $request){
    
        $search = $request->search;  
        $page = 1;
        if($request->page && $request->page != null){
          
            $page = $request->page;
        }
      
        $url = "https://api.themoviedb.org/3/search/multi?include_adult=false&page=$page&query=$search";
        if($request->searchType && $request->searchType != "null"){
           
                $url = "https://api.themoviedb.org/3/search/$request->searchType?include_adult=false&page=$page&query=$search";
            
           
        }

        try{
            $response = Http::withToken( $this->token )->get($url);
            if ($response->successful()) {
                $results =  $response->json();
                return response()->json(
                    [     
                        'status' => true,
                        'message' => 'success',
                        'results' => $results,    
                    ], 200);
            }else{
                $response->throw();
            }
       
        } catch (\Exception $e){
         dd($e->getMessage());
            return response()->json(
                [     
                    'status' => false,
                    'message' => 'error',
                    'results' => $e->getMessage(),    
                ], 404);
          
        }
      
      
        
    }

    public function getMovie(Request $request){
       
     
        $id = $request->id;
        $type = "movie";
      
        if($request->type){
            $type = $request->type;
        }
        
        try{
            $response = Http::withToken( $this->token )->get("https://api.themoviedb.org/3/$type/$id");
            if ($response->successful()) {

                $results =  $response->json();
                return response()->json(
                    [     
                        'status' => true,
                        'message' => 'success',
                        'results' => $results,    
                    ], 200);
            }else{
                $response->throw();
            }
       
        } catch (\Exception $e){
            dd($e);
            return response()->json(
                [     
                    'status' => false,
                    'message' => 'error',
                    'results' => $e->getMessage(),    
                ], 500);
          
        }
        
    }
}
