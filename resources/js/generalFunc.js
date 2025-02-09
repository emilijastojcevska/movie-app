export function windowScrollTop(){
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
}

export function loaderShow(){
  document.getElementById('loader').style.display = '';
}
export function loaderHide(){
  document.getElementById('loader').style.display = 'none';
}