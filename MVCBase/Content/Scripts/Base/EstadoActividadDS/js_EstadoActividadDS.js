$(document).ready(function () {


});

function validDatosEstadoActividadDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorEstadoActividadDS").hide();
    }
    else {
        $("#divErrorEstadoActividadDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEstadoActividadDS"></ul>');
        errorAddJS("divErrorEstadoActividadDS", "ulListaErrorEstadoActividadDS", objData)
    }

    return flg;
}


$("#btnRegistrarEstadoActividadDS").bind("click", function () {


    if (validDatosEstadoActividadDS()) {


        var T_MAE_ESTADO_ACTIVIDAD_DS = {
            ID_ESTADO_ACTIVIDAD_DS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XESTADO_ACTIVIDAD_DS: $("#XESTADO_ACTIVIDAD_DS").val().trim()

        }

        console.log(T_MAE_ESTADO_ACTIVIDAD_DS);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/EstadoActividadDS/SaveEstadoActividadDS',
            type: 'POST',
            data: JSON.stringify({ objEstadoActividadDS: T_MAE_ESTADO_ACTIVIDAD_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEstadoActividadDS", "ulListaErrorEstadoActividadDS", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridEstadoActividadDS();

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