
function createAddButton() { 
  var addButton = $('<button type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);
  addButton.click(function() {
    showSearchForm();
  })
}

function showSearchForm() {
  var form = $('\
    <div> \
      <label for="title">Titre du livre</label> \
      <input type="text" name="title"> \
    </div> \
  ')
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});