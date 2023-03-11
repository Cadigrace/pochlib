
function createAddButton() { 
  var addButton = $('<button type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);
  addButton.click(function() {
    showSearchForm();
  })
}

function showSearchForm() {
  var form = $('\
    <div>
      <label></label>
      <input type="text" name="title" />
  ')
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});