$(document).ready(function () {
    //if ($("#DESCRIPCION").val().length == 0) {
    //    $("#DESCRIPCION").focus();
    //}
});

function validDatosColorOjo() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorColorOjo").hide();
    }
    else {
        $("#divErrorColorOjo").html('<strong>No se puede grabar</strong><ul id="ulListaErrorColorOjo"></ul>');
        errorAddJS("divErrorColorOjo", "ulListaErrorColorOjo", objData)
    }

    return flg;
}


$("#btnRegistrarColorOjo").bind("click", function () {


    if (validDatosColorOjo()) {


        var T_MAE_COLOR_OJO = {
            ID_COLOR_OJO: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_COLOR_OJO: $("#XID_COLOR_OJO").val().trim()

        }

        console.log(T_MAE_COLOR_OJO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/ColorOjo/SaveColorOjo',
            type: 'POST',
            data: JSON.stringify({ objColorOjo: T_MAE_COLOR_OJO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorColorOjo", "ulListaErrorColorOjo", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridcolorOjo();

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