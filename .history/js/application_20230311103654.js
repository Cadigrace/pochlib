
function createAddButton() { 
  var addButton = $('<button id="addButton" type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);
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

  $('#searchButton').click(function() {
    searchBooks();
  })
}

function showResults(data) {
  var searchBlock = $(' \
    <hr> \
    <div id="results"> \
      <h2>Resultats de la recherche</h2> \
    </div> \
  ')
  $('#cancelButton').after(searchBlock);
  data.items.forEach(item => {
    var book = $(` \
      <div>\
        <h3 class="book-title">${item.volumeInfo.title}</h3> \
        <h3 class="book-id">${item.id}</h3> \
        <h4 class="book-author">${item.volumeInfo.authors[0]}</h4> \
        <p class="book-desc">${item.volumeInfo.description}</p> \
      </div>\
    `).appendTo('#results')
  });
}

function searchBooks() {
  var title = $('#title').val();
  var author = $('#author').val();

  $.get( `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`, function( data ) {
    showResults(data);
  });
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});