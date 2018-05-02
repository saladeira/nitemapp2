var oldValue;
var newValue;
var classAtiva;

$('input').on('focus', function () {
  classAtiva = $(this).parent().attr('class');
  $(this).parent().removeClass('invalido').removeClass('valido').removeClass('erro').addClass('focus');
  oldValue = $(this).val();
});

$('input').on('blur', function () {
  $(this).parent().removeClass('focus');
  newValue = $(this).val()

  if (newValue != oldValue) {
    validarCampos ($(this));
  } else {
    return
  }

});


function validarCampos (div) {
  let val = div.val();
  let campo = div.attr('id');

  if (campo == 'email' && val != '') {
    validarEmail(val, div, function (response) {
      if (response.responseText == 'false') {
        div.parent().addClass('invalido').find('.feedback').html('E-mail não está cadastrado.');
      } else if (response.responseText == 'true'){
        div.parent().addClass('valido');
      } else {
        div.parent().addClass('erro').find('.feedback').html('Eita, um erro estranho :~');
      }
    });
  };

};

$('#bt-entrar').on('click', function(e) {

  var data2 = $('#formulario-entrar').serialize();

  e.preventDefault();

  let email = $('#email').val();
  let senha = $('#senha').val();

  if (email == '' || senha == '') {

    $('input').each(function () {
      if ($(this).val() == '') {
        $(this).parent().addClass('invalido').find('.feedback').html('Esse campo não pode ficar em vazio.');
      }
    })
  } else {
    loginEmail(e.target, data2, function (data, response) {
      if (response.login) {
        setUserId(response.id, response.new);
      } else {
        $('#senha').parent().addClass('invalido').find('.feedback').html('Senha incorreta. <span>Recuperar a senha?</span>');
        $('#'+e.target.id).prop( "disabled", false ).find('.fas').removeClass('fa-spinner fa-pulse');
      }
    });
  };

  return false;
});

$('.click').on('click', function (e) {
  trocaSubview($(this).attr('data-target'), $(this).parent().parent().attr('id'))
});
