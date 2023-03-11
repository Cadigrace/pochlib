
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
      <input type="text" name="title"> \
    </div> \
    <div> \
      <label for="author">Auteur</label> \
      <input type="text" name="author"> \
    </div> \
  ')
  $('.h2').after(form);
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});