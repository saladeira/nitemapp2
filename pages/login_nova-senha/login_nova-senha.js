var prosseguir = false;

$('input').on('focus', function () {
  $('.aparece2').addClass('remove-display');
  $(this).parent().removeClass('invalido').removeClass('valido').removeClass('erro').addClass('focus');
  prosseguir = false;
});

function validarCampos (div, callback) {
  let val = div.val();
  let campo = div.attr('id');

  if (campo == 'email-novasenha' && val != '') {
    validarEmail(val, div, function (response) {
      if (response.responseText == 'false') {
        prosseguir = false;
        div.parent().addClass('invalido').find('.feedback').html('E-mail não cadastrado.');
      } else if (response.responseText == 'true'){
        prosseguir = true;
      } else {
        div.parent().addClass('erro').find('.feedback').html('Eita, um erro estranho :~');
      };

      if (callback && typeof(callback) === "function") {
        callback();
      };

    });
  };

};

$('#bt-recuperar').on('click', function(e){

  var data3 = $('#formulario-novasenha').serialize();

  e.preventDefault();

  validarCampos($('#email-novasenha'), function () {

    let email = $('#email-novasenha').val();

    if (email == '') {
      $('input').each(function () {
        if ($(this).val() == '') {
          $(this).parent().addClass('invalido').find('.feedback').html('Esse campo não pode ficar em vazio.');
        }
      })
    } else if (!prosseguir) {
      $('#email-cadastro').parent().addClass('invalido').find('.feedback').html('Colocar um e-mail registrado.');
    } else {

      recuperaSenha(e.target, data3, function (data, response) {
        $('#email-novasenha').prop( "readonly", true );
        $('.aparece').removeClass('remove-display');
        $('.some').addClass('remove-display');
      });
    }
  });

  return false;
});

$('#bt-enviar-codigo').on('click', function(e){

  var data4 = $('#formulario-novasenha').serialize();
  console.log('data4: '+data4)
  e.preventDefault();

  validarCampos($('#email-novasenha'), function () {

    let email = $('#email-novasenha').val();

    if (email == '') {
      $('input').each(function () {
        if ($(this).val() == '') {
          $(this).parent().addClass('invalido').find('.feedback').html('Esse campo não pode ficar em vazio.');
        }
      })
    } else if (!prosseguir) {
      $('#email-cadastro').parent().addClass('invalido').find('.feedback').html('Colocar um e-mail registrado.');
    } else {

      verificaCodigo(e.target, data4, function (data, response) {

        if (response.trocar) {
          localStorage.setItem('email', email);
          trocaSubview('login_senha-formulario', $(this).parent().parent().attr('id'));
        } else {
          $('#codigo-novasenha').parent().addClass('invalido').find('.feedback').html('Código errado.');
          $('.aparece2').removeClass('remove-display');
        }

      });
    }
  });

  return false;
});

$('.click').on('click', function () {
  trocaSubview($(this).attr('data-target'), $(this).parent().parent().attr('id'))
});

$('#outro-codigo').on('click', function (e) {
  $('#codigo-novasenha').parent().removeClass('invalido');
  var dataZ = $('#formulario-novasenha').serialize();
  console.log(dataZ)
  recuperaSenha($('#outro-codigo'), dataZ);
});
