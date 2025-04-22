const arrPalabras = [];
var words = "";
$(document).ready(function () {

    $("#txtSCECDesArt").keyup(function (e) {
        arrPalabras[0] = $(this).val();
        ConcatenarDescripcion(); 
    });

    $("#txtSCECTit").keyup(function (e) {
        arrPalabras[2] = $(this).val();
        ConcatenarDescripcion();
    });

    $("#txtSCENDens").keyup(function (e) {
        arrPalabras[6] = $(this).val();
        ConcatenarDescripcion();
    });

    $("#chkSCECFlgPesTe").change(function (e) {
        if (this.checked) {
            arrPalabras[6] = "DENSIDAD AL PESO DE LA MUESTRA DE LA TELA";
            $("#txtSCENDens").attr("disabled","disabled");
        } else {
            $("#txtSCENDens").removeAttr("disabled", "disabled");
            arrPalabras[6] = ""
        }
        ConcatenarDescripcion();
    });

    

    //$("#txtSCECDesArt").keyup(function (e) {
    //    arrPalabras[0] = $(this).val();
    //    for (var i = 0; i < arrPalabras.length; i++) {
    //        console.log(i + " - " + arrPalabras);
    //        $("#frmIndexTelaComercial").find("textarea[id='txtSCECObsTel']").html(arrPalabras[i] + " ");
    //    }
    //});

    //$("#txtSCECDesArt").keyup(function (e) {
    //    arrPalabras[0] = $(this).val();
    //    for (var i = 0; i < arrPalabras.length; i++) {
    //        console.log(i + " - " + arrPalabras);
    //        $("#frmIndexTelaComercial").find("textarea[id='txtSCECObsTel']").html(arrPalabras[i] + " ");
    //    }
    //});
});

$('.check').on('change', function () {
    $('.check').not(this).prop('checked', false);
    ViewChecks(this.id, this.value);
});

$('.checkHeathMelan').on('change', function () {
    $('.checkHeathMelan').not(this).prop('checked', false);
});

function ViewChecks(id, value) {

    if (id == "chkFlgListado" && $("#" + id).is(':checked')) {
        $("#lblcheckListadoI").show();
        $("#lblcheckListadoF").show();
    }
    else {
        $("#lblcheckListadoI").hide();
        $("#lblcheckListadoF").hide();
        arrPalabras[1] = ($("#" + id).is(':checked')== true) ?  $("#" + id).parent()[0].textContent.trim() : '';
    }
    $("#chkSCECFlgLisF").prop("checked", false);
    $("#chkSCECFlgLisI").prop("checked", false);
       
    ConcatenarDescripcion();
}

function ConcatenarDescripcion() {
    words = "";
    for (var i = 0; i < arrPalabras.length; i++) {
        if (arrPalabras[i] != undefined) {
            words = words + arrPalabras[i] + " ";
        }
        $("#frmIndexTelaComercial").find("textarea[id='txtSCECObsTel']").html(words);
    }
}
