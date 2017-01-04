/**
 * @author Eray Arslan
 */

var app = {
  title: document
    .getElementById('title')
    .innerText,
  clickEl: function (el, next) {
    return (function (e) {
      e.preventDefault();
      this.capture(el, next)
    }).bind(this);
  },
  capture: function (el, next) {
    el._list.classList.remove("open");
    html2canvas(el, {
      onrendered: function (canvas) {
        el._list.classList.add("open");
        next(el, canvas.toDataURL());
      }
    });
  },
  createImage: function (base64) {
    var image = new Image();
    image.src = base64;

    return image;
  },
  openImage: function (image) {
    var w = window.open("");
    w.document.write(image.outerHTML);
  },
  success: function (el, base64) {
    var data = {
      id: el.getAttribute("data-id"),
      author: el.getAttribute("data-author"),
      title: this.title,
      image: base64
    };

    this.openImage(this.createImage(data.image));
  },
  init: function (entryList) {
    var entryListChildren = entryList.children;
    for (var i = 0; i < entryListChildren.length; i++) {
      var element = entryListChildren[i];
      if (element.tagName === 'LI') {
        var list = element
          .querySelectorAll(".dropdown-menu.right.toggles-menu")[0];

        element._list = list;

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.title = 'başlık başa kalmasın';
        a.href = '#';
        a.innerText = 'yakala';
        li.appendChild(a);
        list.appendChild(li);

        var event = this.clickEl(element, this.success.bind(this));
        li.addEventListener('click', event);
      }
    }
  }
};

var entryList = document
  .getElementById('entry-list');

if (entryList) {
  app.init(entryList);
}
