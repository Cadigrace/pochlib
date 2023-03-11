
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

function searchBooks() {
  var title = $('#title').val()
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});