'use strict';

window.myApp = {
    // Function to use for the `focus` event.
    onFocus: function () {
        document.title = 'web-boilerplate-1';
    },
    // Function to use for the `blur` event.
    onBlur: function () {
        document.title = 'not focused';
    }
};

if (window.addEventListener) {
    // Handle window's `load` event.
    window.addEventListener('load', function () {
        document.title = "web-boilerplate-1";
        window.addEventListener('focus', window.myApp.onFocus);
        window.addEventListener('blur', window.myApp.onBlur);
    });
} 
/* Detect if the browser supports `attachEvent`
  Only Internet Explorer browsers support that. */
else if (window.attachEvent) {
    // Handle window's `load` event.
    window.attachEvent('onload', function () {
        // Wire up the `focus` and `blur` event handlers.
        document.title = "web-boilerplate-1";
        window.attachEvent('onfocus', window.myApp.onFocus);
        window.attachEvent('onblur', window.myApp.onBlur);
    });
}
/* If neither event handler function exists, then overwrite 
the built-in event handers. With this technique any previous event
handlers are lost. */
else {
    // Handle window's `load` event.
    window.onload = function () {
        // Wire up the `focus` and `blur` event handlers.
        document.title = "web-boilerplate-1";
        window.onfocus = window.myApp.onFocus;
        window.onblur = window.myApp.onBlur;
    };
}