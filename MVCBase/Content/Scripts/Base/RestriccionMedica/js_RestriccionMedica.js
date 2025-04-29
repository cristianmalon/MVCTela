$(document).ready(function () {

    
});

function validDatosRestriccionMedica() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorRestriccionMedica").hide();
    }
    else {
        $("#divErrorRestriccionMedica").html('<strong>No se puede grabar</strong><ul id="ulListaErrorRestriccionMedica"></ul>');
        errorAddJS("divErrorRestriccionMedica", "ulListaErrorRestriccionMedica", objData)
    }

    return flg;
}

$("#btnRegistrarRestriccionMedica").bind("click", function () {

    if (validDatosRestriccionMedica()) {

        var T_MAE_RESTRICCION_MEDICA = {
            ID_RESTRICCION_MEDICA: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_RESTRICCION_MEDICA: $("#XID_RESTRICCION_MEDICA").val().trim()
        }

        console.log(T_MAE_RESTRICCION_MEDICA);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/RestriccionMedica/SaveRestriccionMedica',
            type: 'POST',
            data: JSON.stringify({ objRestriccionMedica: T_MAE_RESTRICCION_MEDICA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorRestriccionMedica", "ulListaErrorRestriccionMedica", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridRestriccionMedica();

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