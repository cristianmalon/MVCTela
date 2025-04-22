$(document).ready(function () {


});

$("#btnRegistrarTipoActividad").bind("click", function () {

    if (validDatosTipoActividad()) {


        var T_MAE_TIPO_ACTIVIDAD = {
            ID_NACIONALIDAD: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_ACTIVIDAD_AUTORIZAC: $("#XID_TIPO_ACTIVIDAD_AUTORIZAC").val().trim()

        }

        console.log(T_MAE_TIPO_ACTIVIDAD);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoActividadAutorizacion/SaveTipoActividad',
            type: 'POST',
            data: JSON.stringify({ objTipoActividad: T_MAE_TIPO_ACTIVIDAD }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoActividad", "ulListaErrorTipoActividad", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoActividad();

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


function validDatosTipoActividad() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoActividad").hide();
    }
    else {
        $("#divErrorTipoActividad").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoActividad"></ul>');
        errorAddJS("divErrorTipoActividad", "ulListaErrorTipoActividad", objData)
    }

    return flg;
}


