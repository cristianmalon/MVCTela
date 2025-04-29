$(document).ready(function () {


});

$("#btnRegistrarTipoRestriccion").bind("click", function () {

    if (validDatosTipoRestriccion()) {


        var T_MAE_TIPO_RESTRICCION = {
            ID_NACIONALIDAD: 0,
            DESCRIPCION_ESPANOL: $("#DESCRIPCION_ESPANOL").val().trim(),
            DESCRIPCION_INGLES: $("#DESCRIPCION_INGLES").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_RESTRICCION: $("#XID_TIPO_RESTRICCION").val().trim()

        }

        console.log(T_MAE_TIPO_RESTRICCION);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoRestriccion/SaveTipoRestriccion',
            type: 'POST',
            data: JSON.stringify({ objTipoRestriccion: T_MAE_TIPO_RESTRICCION }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoRestriccion", "ulListaErrorTipoRestriccion", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoRestriccion();

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


function validDatosTipoRestriccion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION_ESPANOL").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_ESPANOL": [{ ErrorMessage: "Debe ingresar la descripción en español" }] })
    }
    if ($("#DESCRIPCION_INGLES").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_INGLES": [{ ErrorMessage: "Debe ingresar la descripción en ingles" }] })
    }
    if (flg) {
        $("#divErrorTipoRestriccion").hide();
    }
    else {
        $("#divErrorTipoRestriccion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoRestriccion"></ul>');
        errorAddJS("divErrorTipoRestriccion", "ulListaErrorTipoRestriccion", objData)
    }

    return flg;
}


