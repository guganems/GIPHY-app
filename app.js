// async function init(){
//     let response = await request('https://api.giphy.com/v1/gifs/search?api_key=oBVyjgWmQoAWxj8I6sDcc01uiY802ps3&q=car&limit=25&offset=0&rating=G&lang=en');

//     console.log(response.data[0].embed_url);
//     document.getElementById('example').src = response.data[0].embed_url;
// }

document.getElementById('submitBtn').addEventListener('click', async function(e){
    e.preventDefault();
    searchString = document.getElementById('searchInput').value;
    let response =  await fetch(`https://api.giphy.com/v1/gifs/search?api_key=aHSpMcQvtdCnBuVunE8ZkkUmwUIwMID9&q=${searchString}&limit=6&offset=0&rating=G&lang=en`).then(response => response.json());

    var parentOfCard = document.getElementById('container');
    parentOfCard.innerHTML = "";
    for (let image of response.data){
        // console.log(parentOfCard);
        parentOfCard.innerHTML += `
        <div class="card col-md-3" style="width: 18rem; margin: 5px">
        <iframe src="${image.embed_url}" frameBorder="0"></iframe>
        <div class="card-body">
            <button class='btn btn-outline-danger' onclick="deleteMe(this)">Delete Me <br /> <i><small>but what's the purpose of this?</small></i></button>
        </div>
      </div>
        `;
    }

    console.log(response.data);
    // document.getElementById('example').src = response.data[0].embed_url;
})

function deleteMe(me){
    console.log(me);
    realMe = me.parentNode.parentNode;
    mom = realMe.parentNode;
    mom.removeChild(realMe);
}

// init();