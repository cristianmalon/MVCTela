$(document).ready(function () {


});

function validDatosTipoActividadDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoActividadDS").hide();
    }
    else {
        $("#divErrorTipoActividadDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoActividadDS"></ul>');
        errorAddJS("divErrorTipoActividadDS", "ulListaErrorTipoActividadDS", objData)
    }

    return flg;
}


$("#btnRegistrarTipoActividadDS").bind("click", function () {


    if (validDatosTipoActividadDS()) {


        var T_MAE_TIPO_ACTIVIDAD_DS = {
            ID_TIPO_ACTIVIDAD_DS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XTIPO_ACTIVIDAD_DS: $("#XTIPO_ACTIVIDAD_DS").val().trim()

        }

        console.log(T_MAE_TIPO_ACTIVIDAD_DS);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoActividadDS/SaveTipoActividadDS',
            type: 'POST',
            data: JSON.stringify({ objTipoActividadDS: T_MAE_TIPO_ACTIVIDAD_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoActividadDS", "ulListaErrorTipoActividadDS", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoActividadDS();

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