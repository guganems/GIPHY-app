let OLD_SEARCH_STR = "";
let COUNT = 6;
let STEP = 3;
let INITIALIZED = false;
init();
document.getElementById('submitBtn').addEventListener('click', function(e){
    e.preventDefault();
    search(0)
});
document.getElementById('show_more').addEventListener('click', e => {
    e.preventDefault();
    search(COUNT - STEP);
})
document.getElementById('searchInput').addEventListener('keyup', function () {
    if (this.value !== OLD_SEARCH_STR) hideShowMore();
})

function init() {
    let showMore = document.getElementById('show_more_parent');
    if (!INITIALIZED) showMore.style.display = 'none';
}
function deleteMe(me){
    console.log(me);
    let realMe = me.parentNode.parentNode;
    let mom = realMe.parentNode;
    mom.removeChild(realMe);
}
function hideShowMore() {
    document.getElementById('show_more_parent').style.display = "none";
}
function search(offset) {
    let searchString = document.getElementById('searchInput').value;
    if (!searchString) return;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=aHSpMcQvtdCnBuVunE8ZkkUmwUIwMID9&q=${searchString}&limit=${STEP}&offset=${offset}&rating=G&lang=en`).then(response => response.json()).then(response => {
        let parentOfCard = document.getElementById('container');
        console.log(searchString, OLD_SEARCH_STR);
        if (searchString !== OLD_SEARCH_STR) {
            parentOfCard.innerHTML = "";
        }
        for (let image of response.data){
            parentOfCard.innerHTML += `
                <div class="card col-md-3" style="width: 18rem; margin: 5px">
                    <iframe class="img-container" src="${image.embed_url}"></iframe>
                    <div class="card-body">
                        <button class='btn btn-outline-danger' onclick="deleteMe(this)">Delete Me <br /> <i><small>but what's the purpose of this?</small></i></button>
                    </div>
                </div>
        `;
        }
        COUNT += STEP;
        document.getElementById('show_more_parent').style.display = "";
        if (offset === 0) setOldSearchString();
    });
}
function setOldSearchString() {
    OLD_SEARCH_STR = document.getElementById('searchInput').value;
}