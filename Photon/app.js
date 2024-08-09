const auth = "563492ad6f91700001000001c2fec565e923483485cc2158ac202c7b";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;


searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchPhotos(searchValue);
})

function updateInput(e){
searchValue = e.target.value;
}



async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method: "GET",
        headers:{
            Accept: 'application/json',
            Authorization: auth
        }
    } );
    const data = await dataFetch.json();
    return data;
}






function generatePictures(data){
    data.photos.forEach(photo =>{
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('galleryImg'); 
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
});
}






async function curatedPhotos(){
   
        const data = await fetchApi (`https://api.pexels.com/v1/curated?per_page=2`);
        generatePictures(data)
}




async function searchPhotos(query){

    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`);
        
    generatePictures(data);
 
}









curatedPhotos();