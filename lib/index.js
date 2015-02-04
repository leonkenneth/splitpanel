var _ = require('lodash/lodash');

exports = module.exports = Splitter;

function Splitter() {
  function relayout() {
    var HANDLE_WIDTH = 15;

    _.each(document.querySelectorAll('.split'), function (split) {
      // For each split item
      // Get size
      var parentSize;
      var isVertical = split.classList.contains('vertical');
      if (isVertical) {
        parentSize = split.offsetWidth;
      } else {
        parentSize = split.offsetHeight;
      }

      // Take all split content child
      var summedProportions = 0;
      var panelsCount = 0;
      _.each(split.querySelectorAll('.split-content'), function (splitContent) {
        if (splitContent.parentNode !== split) {
          return;
        }

        summedProportions += parseFloat(splitContent.getAttribute('data-ratio')) || 1;
        panelsCount++;
      });


      var gutter = (panelsCount + 1) * HANDLE_WIDTH;
      // Compute size for all
      _.each(split.querySelectorAll('.split-content'), function (splitContent) {
        if (splitContent.parentNode !== split) {
          return;
        }

        var ratio = (parseFloat(splitContent.getAttribute('data-ratio')) || 1) / summedProportions;
        if (isVertical) {
          splitContent.style.width = (ratio * (parentSize - gutter));
        } else {
          splitContent.style.height = (ratio * (parentSize - gutter));
        }
      });
    });
  }

  function updateRatio() {
    var HANDLE_WIDTH = 5;

    _.each(document.querySelectorAll('.split'), function (split) {
      // For each split item
      // Get size
      var parentSize;
      var isVertical = split.classList.contains('vertical');
      if (isVertical) {
        parentSize = split.offsetWidth;
      } else {
        parentSize = split.offsetHeight;
      }

      // Take all split content child
      var panelsCount = 0;
      _.each(split.querySelectorAll('.split-content'), function (splitContent) {
        if (splitContent.parentNode !== split) {
          return;
        }
        panelsCount++;
      });


      var gutter = (panelsCount + 1) * HANDLE_WIDTH;
      // Compute size for all
      _.each(split.querySelectorAll('.split-content'), function (splitContent) {
        if (splitContent.parentNode !== split) {
          return;
        }

        var ratio = parseFloat(isVertical ? splitContent.style.width : splitContent.style.height) / (parentSize - gutter);
        splitContent.setAttribute('data-ratio', ratio);
      });
    });
  }

  relayout();
  updateRatio();

  window.addEventListener('resize', function () {
    relayout();
  });

  _.each(document.querySelectorAll('.split-handle'), function (handle) {
    var parent = handle.parentNode;
    var isVertical = parent.classList.contains('vertical');
    var prevSibling = handle.previousSibling.previousSibling;
    var nextSibling = handle.nextSibling.nextSibling;

    interact(handle)
      .draggable({
        onmove: function (event) {
          if (isVertical) {
            prevSibling.style.width = parseFloat(prevSibling.style.width) + event.dx;
            nextSibling.style.width = parseFloat(nextSibling.style.width) - event.dx;
          } else {
            prevSibling.style.height = parseFloat(prevSibling.style.height) + event.dy;
            nextSibling.style.height = parseFloat(nextSibling.style.height) - event.dy;
          }
          updateRatio();
        }
      });
  });
}
