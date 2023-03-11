
function createAddButton() { 
  var addButton = $('<button type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);
}

$(function() {

  // Creer le bouton Ajout
  createAddButton();

});