/**
 * @author Eray Arslan
 */

var app = function () {
  var title = document
    .getElementById("title")
    .innerText;

  var capture = function (el) {
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

          var image = new Image();
          image.src = data.image;

          var w = window.open("");
          w.document.title = data.author + " #" + data.title;
          w.document.write(image.outerHTML);
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
        var reportLink = element
          .getElementsByClassName('report-link')[0];

        var list = reportLink
          .parentElement
          .parentElement;

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.title = 'başlık başa kalmasın';
        a.href = '#';
        a.innerText = 'yakala';
        a.className = 'report-link';
        li.appendChild(a);
        list.appendChild(li);

        li.addEventListener('click', capture(element));
      }
    }
  }
};

var entryList = document
  .getElementById('entry-list');

if (entryList) {
  app();
}
