
function createAddButton() {
  var addButton = $('<button class="btn-add" id="addButton" type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);

  var form = $('\
    <div class="form hide"> \
      <div class="form-input"> \
        <label for="title">Titre du livre</label> \
        <input type="text" name="title" id="title"> \
      </div> \
      <div class="form-input"> \
        <label for="author">Auteur</label> \
        <input type="text" name="author" id="author"> \
      </div> \
      <button class="btn-search" id="searchButton" type="button">Rechercher</button> \
      <button class="btn-cancel" id="cancelButton" type="button">Annuler</button> \
    </div> \
  ')
  $('.h2').after(form);

  var searchBlock = $(' \
    <div id="section-result" class="grid-container hide"> \
      <hr> \
      <h2>Resultats de la recherche</h2> \
      <div id="results" class="result-block" ></div> \
    </div> \
  ')
  $('#cancelButton').after(searchBlock);

  $('#searchButton').click(function() {
    searchBooks();
  })

  $('#cancelButton').click(function() {
    cancelSearch();
  })

  addButton.click(function() {
    showSearchForm();
  })
}

function showSearchForm() {
  $('#addButton').hide();
  $('.form-input > input').val('');
  $('.form').show();
}

function showResults(data) {

  $('#results').empty();

  if (data.totalItems == 0) {
    $(`<p>Aucun livre n’a été trouvé</p>`).appendTo('#results');
    $('#section-result').show();
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
        <img src="./img/bookmark.png" id="bookmark-${item.id}" class="action-icon" /> \
        <h3 class="book-title">Titre : ${item.volumeInfo.title}</h3> \
        <h3 class="book-id">Id : ${item.id}</h3> \
        <h4 class="book-author">Auteur : ${author}</h4> \
        <p class="book-desc">Description : ${desc}</p> \
        <div class="book-img"> \
          <img src="${img}" /> \
        </div>
      </div>\
    `).appendTo('#results')

    $(`#bookmark-${item.id}`).click(function() {
      addBookToPochList(item)
    });
    $('#section-result').show();
  });
}

function showPochList() {
  var pochList = sessionStorage.getItem("pochList");

  $('#pochlist').empty();
  if (!pochList) {
    $(`<p>Aucun livre dans votre pochList</p>`).appendTo('#pochlist');
    return;
  }

  pochList = JSON.parse(pochList);

  pochList.forEach(item => {
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
        <img src="./img/trash.png" id="trash-${item.id}" class="action-icon" /> \
        <h3 class="book-title">Titre : ${item.volumeInfo.title}</h3> \
        <h3 class="book-id">Id : ${item.id}</h3> \
        <h4 class="book-author">Auteur : ${author}</h4> \
        <p class="book-desc">Description : ${desc}</p> \
        <div class="book-img"> \
          <img src="${img}" /> \
        </div>
      </div>\
    `).appendTo('#pochlist')

    $(`#trash-${item.id}`).click(function() {
      deleteFromPochList(item)
    });

  });
}

function deleteFromPochList(book) {
  var pochList = sessionStorage.getItem("pochList");
  if(!pochList) {
    return false;
  }
  pochList = JSON.parse(pochList);

  pochList = pochList.filter(function(item) {
    return item.id != book.id;
  })
  sessionStorage.setItem("pochList", JSON.stringify(pochList));
  showPochList();
}

function isExist(id) {
  var pochList = sessionStorage.getItem("pochList");
  if(!pochList) {
    return false;
  }
  pochList = JSON.parse(pochList);
  var found = false;
  pochList.forEach(book => {
    if(book.id == id) {
      found = true;
    }
  });
  return found;
}

function addBookToPochList(book) {
  if (isExist(book.id)) {
    alert('Vous ne pouvez ajouter deux fois le même livre');
    return;
  }

  var pochList = sessionStorage.getItem("pochList");
  if(!pochList) {
    pochList = [];
  } else {
    pochList = JSON.parse(pochList);
  }
  pochList.push(book);
  sessionStorage.setItem('pochList', JSON.stringify(pochList));
  showPochList();
}

function searchBooks() {
  var title = $('#title').val();
  var author = $('#author').val();
  if (title === "" || author ===""){
    alert("Veuillez saisir l'auteur et le titre du livre");
    return;
  }  

  $.get( `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`, function( data ) {
    showResults(data);
  });
}

function cancelSearch() {
  $('#addButton').show();
  $('#section-result').hide();
  $('.form').hide();
}

function initPage() {
  var pochBlock = $(' \
    <div id="section-poch" class="grid-container"> \
      <div id="pochlist" class="result-block" ></div> \
    </div> \
  ');
  pochBlock.appendTo('#content');
}

$(function() {

  initPage();
  // Creer le bouton Ajout
  createAddButton();
  showPochList();

});
