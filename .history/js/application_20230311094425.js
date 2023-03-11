
function createAddButton() { 
  var addButton = $('<button type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);
  addButton.click(function() {
    showSearchForm();
  })
}

function showSearchForm() {
  console.log('Form')
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});