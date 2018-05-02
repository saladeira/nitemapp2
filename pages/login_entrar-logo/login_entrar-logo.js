loadView('nm-content', 'login_entrar-formulario', 'none', function () {
  $('.logo').addClass('up');
  setTimeout(check, 200);
});

//TESTES
// loadView('nm-content', 'login_senha-formulario', 'none', function () {
//   $('.logo').addClass('up');
//   setTimeout(check, 200);
// });

function check() {
  $('#login_entrar-formulario').removeClass('hide-opacity').addClass('show-opacity');
  //TESTES
  //$('#login_senha-formulario').removeClass('hide-opacity').addClass('show-opacity');
}
