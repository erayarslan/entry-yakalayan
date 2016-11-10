var app = function () {
  var title = document.getElementById("title").innerText;

  var config = {
    apiKey: " AIzaSyDR27TLmDbWwX5JhIXXs0blK5SR6EJ-ts8",
    authDomain: "bbk-savar.firebaseapp.com",
    databaseURL: "https://bbk-savar.firebaseio.com",
    storageBucket: "bbk-savar.appspot.com"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  database.bbk = {};
  database.bbk.writeImage = function (data) {
    database.ref('entries/' + data.id).set(data);
  };

  var capture = function (el, li) {
    return function (e) {
      e.preventDefault();

      html2canvas(el, {
        onrendered: function (canvas) {
          var data = {
            id: el.getAttribute("data-id"),
            author: el.getAttribute("data-author"),
            title: title,
            image: canvas.toDataURL()
          };

          database.bbk.writeImage(data);
          li.className = 'dropdown-menu right toggles-menu';
          window.open('http://eray.js.org/entry-yakalayan/' + data.id);
        }
      });
    }
  };

  var entryList = document.getElementById('entry-list');

  if (entryList) {
    var entryListChildren = entryList.children;
    for (var i = 0; i < entryListChildren.length; i++) {
      var element = entryListChildren[i];
      if (element.tagName === 'LI') {
        var reportLink = element.getElementsByClassName('report-link')[0];
        var list = reportLink.parentElement.parentElement;

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.title = 'başlık başa kalmasın';
        a.href = '#';
        a.innerText = 'yakala';
        li.appendChild(a);
        list.appendChild(li);

        li.addEventListener('click', capture(element, li));
      }
    }
  }
};

var entryList = document.getElementById('entry-list');

if (entryList) {
  app();
}
