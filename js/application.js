
function createAddButton() {
  const addButton = $('<button class="btn-add" id="addButton" type="button">Ajouter un nouveau livre</button>');
  $('.h2').after(addButton);

  const form = $('\
    <form class="form hide"> \
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
    </form> \
  ')
  $('.h2').after(form);

  const searchBlock = $(' \
    <section id="section-result" class="grid-container hide"> \
      <hr> \
      <h2>Resultats de la recherche</h2> \
      <div id="results" class="result-block" ></div> \
    </section> \
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
    let author = 'Information manquante'
    if (item.volumeInfo.authors && item.volumeInfo.authors.length > 0) {
      author = item.volumeInfo.authors[0]
    }
    let desc = 'Information manquante'
    if (item.volumeInfo.description) {
      desc = item.volumeInfo.description
    }
    let img = './img/unavailable.png'
    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
      img = item.volumeInfo.imageLinks.thumbnail
    }
    const book = $(` \
      <div class="grid-item">\
        <img src="./img/bookmark.png" alt="bookmark icone" id="bookmark-${item.id}" class="action-icon" /> \
        <h3 class="book-title">Titre : ${item.volumeInfo.title}</h3> \
        <h3 class="book-id">Id : ${item.id}</h3> \
        <h4 class="book-author">Auteur : ${author}</h4> \
        <p class="book-desc">Description : ${desc}</p> \
        <div class="book-img"> \
          <img alt="image livre" src="${img}" /> \
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
  let pochList = sessionStorage.getItem("pochList");

  $('#pochlist').empty();
  if (!pochList) {
    $('#section-poch > .section-title').show();
    return;
  }

  pochList = JSON.parse(pochList);

  pochList.forEach(item => {
    let author = 'Information manquante'
    if (item.volumeInfo.authors && item.volumeInfo.authors.length > 0) {
      author = item.volumeInfo.authors[0]
    }
    let desc = 'Information manquante'
    if (item.volumeInfo.description) {
      desc = item.volumeInfo.description
    }
    let img = './img/unavailable.png'
    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
      img = item.volumeInfo.imageLinks.thumbnail
    }
    const book = $(` \
      <div class="grid-item">\
        <img alt="icone corbeille" src="./img/trash.png" id="trash-${item.id}" class="action-icon" /> \
        <h3 class="book-title">Titre : ${item.volumeInfo.title}</h3> \
        <h3 class="book-id">Id : ${item.id}</h3> \
        <h4 class="book-author">Auteur : ${author}</h4> \
        <p class="book-desc">Description : ${desc}</p> \
        <div class="book-img"> \
          <img alt="image livre" src="${img}" /> \
        </div>\
      </div>\
    `).appendTo('#pochlist')

    $(`#trash-${item.id}`).click(function() {
      deleteFromPochList(item)
    });

  });
  $('#section-poch > .section-title').hide();
}

function deleteFromPochList(book) {
  let pochList = sessionStorage.getItem("pochList");
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
  let pochList = sessionStorage.getItem("pochList");
  if(!pochList) {
    return false;
  }
  pochList = JSON.parse(pochList);
  let found = false;
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

  let pochList = sessionStorage.getItem("pochList");
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
  const title = $('#title').val();
  const author = $('#author').val();
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
  const pochBlock = $(' \
    <section id="section-poch" class="grid-container"> \
    <p class="section-title hide">Aucun livre dans votre pochList</p> \
      <div id="pochlist" class="result-block" ></div> \
    </section> \
  ');
  pochBlock.appendTo('#content');
}

$(function() {

  initPage();
  // Creer le bouton Ajout
  createAddButton();
  showPochList();

});
