
function createAddButton() {
  var addButton = $('<button id="addButton" type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);

  // TODO : to remove
  showSearchForm();
  addButton.click(function() {
    showSearchForm();
  })
}

function showSearchForm() {
  $('#addButton').hide();

  var form = $('\
    <div> \
      <label for="title">Titre du livre</label> \
      <input type="text" name="title" id="title"> \
    </div> \
    <div> \
      <label for="author">Auteur</label> \
      <input type="text" name="author" id="author"> \
    </div> \
    <button id="searchButton" type="button">Rechercher</button> \
    <button id="cancelButton" type="button">Annuler</button> \
  ')
  $('.h2').after(form);

  // TODO : to remove
  searchBooks();
  $('#searchButton').click(function() {
    searchBooks();
  })
}

function showResults(data) {
  var searchBlock = $(' \
    <hr> \
    <div id="section-result" class="grid-container"> \
      <h2>Resultats de la recherche</h2> \
      <div id="results" class="result-block" ></div> \
    </div> \
  ')
  $('#cancelButton').after(searchBlock);

  if (data.totalItems == 0) {
    $(`<p>Aucun livre n’a été trouvé</p>`).appendTo('#results');
    return;
  }

  data.items.forEach(item => {
    var author = 'Information manquante'
    if (item.volumeInfo.authors && item.volumeInfo.authors.length > 0) {
      author = item.volumeInfo.authors[0]
    }
    var desc = 'Information manquante'
    if (item.volumeInfo.description) {
      desc = item.volumeInfo.description
    }
    var img = './img/unavailable.png'
    if (item.volumeInfo.imageLinks.thumbnail) {
      img = item.volumeInfo.imageLinks.thumbnail
    }
    var book = $(` \
      <div class="grid-item">\
        <img src="" /> \
        <h3 class="book-title">Titre : ${item.volumeInfo.title}</h3> \
        <h3 class="book-id">Id : ${item.id}</h3> \
        <h4 class="book-author">Auteur : ${author}</h4> \
        <p class="book-desc">Description : ${desc}</p> \
        <div class="book-img"> \
          <img src="${img}" /> \
        </div>
      </div>\
    `).appendTo('#results')
  });
}

function searchBooks() {
  var title = $('#title').val();
  var author = $('#author').val();

  // TODO : to remove
  title = 'javascript'
  $.get( `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`, function( data ) {
    showResults(data);
  });
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});
