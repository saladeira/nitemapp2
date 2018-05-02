var prosseguir = true;

$('input').on('focus', function () {
  $(this).parent().removeClass('invalido').removeClass('valido').removeClass('erro').addClass('focus');
  prosseguir = true;
});

$('input').on('blur', function () {
  $(this).parent().removeClass('focus');
  newValue = $(this).val()

  if (newValue != oldValue) {
    validarCampos($(this))
  } else {
    $(this).parent().attr('class', classAtiva)
  }

});

function validarCampos (div) {
  let val = div.val();
  let campo = div.attr('id');

  if (campo == 'email-cadastro' && val != '') {
    validarEmail(val, div, function (response) {
      if (response.responseText == 'false') {
        prosseguir = true;
      } else if (response.responseText == 'true'){
        prosseguir = false;
        div.parent().addClass('invalido').find('.feedback').html('E-mail já está cadastrado.');
      } else {
        div.parent().addClass('erro').find('.feedback').html('Eita, um erro estranho :~');
      }
    });
  };

};

$('#bt-cadastro').on('click', function(e){

  var data2 = $('#formulario-cadastrar').serialize();

  e.preventDefault();

  let email = $('#email-cadastro').val();
  let senha1 = $('#senha-cadastro').val();
  let senha2 = $('#senha-cadastro-2').val();

  let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

  if (email == '' || senha1 == '' || senha2 == '') {

    $('input').each(function () {
      if ($(this).val() == '') {
        $(this).parent().addClass('invalido').find('.feedback').html('Esse campo não pode ficar em vazio.');
      }
    })
  } else if (senha1 != senha2){
    $('#senha-cadastro-2').parent().addClass('invalido').find('.feedback').html('As senhas estão diferentes.');
  } else if (!testEmail.test(email)) {
    $('#email-cadastro').parent().addClass('invalido').find('.feedback').html('Colocar um email valido.');
  } else if (!prosseguir) {
    $('#email-cadastro').parent().addClass('invalido').find('.feedback').html('Colocar um email não registrado.');
  } else {
    addRowUser(e.target, data2, function (data, response) {
      setUserId(data, 'sim');
    });
  }

  return false;
});

$('.click').on('click', function () {
  trocaSubview($(this).attr('data-target'), $(this).parent().parent().attr('id'))
})
