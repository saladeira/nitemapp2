//Aqui carregam os primeiros js para o index
$(document).ready(function () {

  $.getScript('js/script.js')
    .done(function (script, textStatus) {
      loadView('nm-content', 'index_valida-logado', 'none')
    })
    .fail (function (jqxhr, settings, exception) {
      window.alert(exception)
    })

});

FontAwesomeConfig = { autoReplaceSvg: 'nest' };

document.addEventListener("ready", onDeviceReady, false);
function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
}
