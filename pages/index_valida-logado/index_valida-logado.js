//Verifica se tem o ID esta no local storage, assim o usuario esta logado e continua para o uso do aplicativo

if (localStorage.getItem('id')) {
  if (localStorage.getItem('first') == 'true') {
    loadView('nm-header', '', 'none');
    loadView('nm-content', 'intermedia_termo', 'none');
  } else {
    console.log('watchpos');

    watchPos(function (position) {
      loadView('nm-header', '', 'none');
      loadView('nm-content', '_home', 'none', function () {
        initMap(position);
      });
    })
  }
} else {
  loadView('nm-header', 'login_entrar-logo', 'none')
  loadView('nm-content', '', 'none')
};
