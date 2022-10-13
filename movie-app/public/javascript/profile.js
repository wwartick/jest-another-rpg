async function deleteMovieHandler() {
    
    document.getElementById("movieList").addEventListener('click', async function(event) {
        event.preventDefault();
        const id = event.target.id.replace("btn", "");
        const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE'
            });
         if (response.ok) {
      document.location.replace('/profile/');
        } else {
         alert(response.statusText);
     }
 });
}
