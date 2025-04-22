$(document).ready(function () {


});

$("#btnRegistrarTipoEvaluacion").bind("click", function () {

    if (validDatosTipoEvaluacion()) {


        var T_MAE_TIPO_EVALUACION = {
            ID_NACIONALIDAD: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_LICENCIA: $('#FLG_LICENCIA').is(':checked') == true ? true : false,
            FLG_HABILITACION: $('#FLG_HABILITACION').is(':checked') == true ? true : false,
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_EVALUACION_LIC: $("#XID_TIPO_EVALUACION_LIC").val().trim()

        }

        console.log(T_MAE_TIPO_EVALUACION);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoEvaluacionLic/SaveTipoEvaluacion',
            type: 'POST',
            data: JSON.stringify({ objTipoEvaluacion: T_MAE_TIPO_EVALUACION }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoEvaluacion", "ulListaErrorTipoEvaluacion", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoEvaluacion();

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


function validDatosTipoEvaluacion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if ($('#FLG_LICENCIA').is(':checked') == false && $('#FLG_HABILITACION').is(':checked') == false) {
        flg = false;
        objData.push({ "": [{ ErrorMessage: "Debe Seleccionar una Licencia o Habilitación" }] })
    }
        if (flg) {
        $("#divErrorTipoEvaluacion").hide();
    }
    else {
        $("#divErrorTipoEvaluacion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoEvaluacion"></ul>');
        errorAddJS("divErrorTipoEvaluacion", "ulListaErrorTipoEvaluacion", objData)
    }

    return flg;
}


