var prosseguir = false;
$('#storagemail').val(localStorage.getItem('email'));

$('input').on('focus', function () {
  $(this).parent().removeClass('invalido').removeClass('valido').removeClass('erro').addClass('focus');
  prosseguir = false;
});

$('#bt-salvar').on('click', function(e){

  var data5 = $('#formulario-trocar').serialize();

  e.preventDefault();

  let senha1 = $('#senha-trocar-1').val();
  let senha2 = $('#senha-trocar-2').val();

  if (senha1 == '' || senha2 == '') {
    $('input').each(function () {
      if ($(this).val() == '') {
        $(this).parent().addClass('invalido').find('.feedback').html('Esse campo não pode ficar em vazio.');
      }
    })
  } else if (senha1 != senha2) {
    $('#senha-trocar-2').parent().addClass('invalido').find('.feedback').html('As senhas estão diferentes.');
  } else {

    renovarSenha(e.target, data5, function (data, response) {

      if (response == 'ok') {
        trocaSubview('login_entrar-formulario', $(this).parent().parent().attr('id'));
        localStorage.setItem('email', '');
      }
    });
  }

  return false;
});

$('.click').on('click', function () {
  trocaSubview($(this).attr('data-target'), $(this).parent().parent().attr('id'))
});
