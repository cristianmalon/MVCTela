$(document).ready(function () {


});

function validDatosTipoResultadoExamen() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoResultadoExamen").hide();
    }
    else {
        $("#divErrorTipoResultadoExamen").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoResultadoExamen"></ul>');
        errorAddJS("divErrorTipoResultadoExamen", "ulListaErrorTipoResultadoExamen", objData)
    }

    return flg;
}

$("#btnRegistrarTipoResultadoExamen").bind("click", function () {

    if (validDatosTipoResultadoExamen()) {

        var T_MAE_TIPO_RESULTADO_EXAMEN = {
            ID_TIPO_RESULTADO_EXAMEN: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_RESULTADO_EXAMEN: $("#XID_TIPO_RESULTADO_EXAMEN").val().trim()
        }

        console.log(T_MAE_TIPO_RESULTADO_EXAMEN);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoResultadoExamen/SaveTipoResultadoExamen',
            type: 'POST',
            data: JSON.stringify({ objTipoResultadoExamen: T_MAE_TIPO_RESULTADO_EXAMEN }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoResultadoExamen", "ulListaErrorTipoResultadoExamen", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarTipoResultadoExamen();

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