$(document).ready(function () {
    //if ($("#DESCRIPCION").val().length==0)
    //{
    //    $("#DESCRIPCION").focus();
    //}
});

function validDatosCentroMedico() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if ($("#SIGLA").val().trim() == "") {
        flg = false;
        objData.push({ "SIGLA": [{ ErrorMessage: "Debe ingresar las siglas" }] })
    } 
    if (flg) {
        $("#divErrorCentroMedico").hide();
    }
    else {
        $("#divErrorCentroMedico").html('<strong>No se puede grabar</strong><ul id="ulListaErrorCentroMedico"></ul>');
        errorAddJS("divErrorCentroMedico", "ulListaErrorCentroMedico", objData)
    }

    return flg;
}


$("#btnRegistrarCentroMedico").bind("click", function () {


    if (validDatosCentroMedico()) {


        var T_MAE_TIPO_CENTRO_MEDICO = {
            ID_TIPO_CENTRO_MEDICO: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            SIGLA: $("#SIGLA").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_CENTRO_MEDICO: $("#XID_TIPO_CENTRO_MEDICO").val().trim()

        }

        console.log(T_MAE_TIPO_CENTRO_MEDICO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoCentroMedico/SaveTipoCentroMedico',
            type: 'POST',
            data: JSON.stringify({ objCentroMedico: T_MAE_TIPO_CENTRO_MEDICO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorCentroMedico", "ulListaErrorCentroMedico", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridCentroMedico();

                }

                desbloqObject();

            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

    }
});