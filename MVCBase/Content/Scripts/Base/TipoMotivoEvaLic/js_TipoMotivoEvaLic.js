$(document).ready(function () {

    
});

function validDatosTipoMotivoEvaLic() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoMotivoEvaLic").hide();
    }
    else {
        $("#divErrorTipoMotivoEvaLic").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoMotivoEvaLic"></ul>');
        errorAddJS("divErrorTipoMotivoEvaLic", "ulListaErrorTipoMotivoEvaLic", objData)
    }

    return flg;
}

$("#btnRegistrarTipoMotivoEvaLic").bind("click", function () {

    if (validDatosTipoMotivoEvaLic()) {

        var T_MAE_TIPO_MOTIVO_EVA_LIC = {
            ID_TIPO_MOTIVO_EVA_LIC: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_MOTIVO_EVA_LIC: $("#XID_TIPO_MOTIVO_EVA_LIC").val().trim()
        }

        console.log(T_MAE_TIPO_MOTIVO_EVA_LIC);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoMotivoEvaLic/SaveTipoMotivoEvaLic',
            type: 'POST',
            data: JSON.stringify({ objTipoMotivoEvaLic: T_MAE_TIPO_MOTIVO_EVA_LIC }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoMotivoEvaLic", "ulListaErrorTipoMotivoEvaLic", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarTipoMotivoEvaLic();

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