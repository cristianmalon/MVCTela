$(document).ready(function () {
    //if ($("#DESCRIPCION").val().length==0)
    //{
    //    $("#DESCRIPCION").focus();
    //}
});

function validDatosColorCabello() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorColorCabello").hide();
    }
    else {
        $("#divErrorColorCabello").html('<strong>No se puede grabar</strong><ul id="ulListaErrorColorCabello"></ul>');
        errorAddJS("divErrorColorCabello", "ulListaErrorColorCabello", objData)
    }

    return flg;
}


$("#btnRegistrarColorCabello").bind("click", function () {


    if (validDatosColorCabello()) {


        var T_MAE_COLOR_CABELLO = {
            ID_COLOR_CABELLO: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_COLOR_CABELLO: $("#XID_COLOR_CABELLO").val().trim()

        }

        console.log(T_MAE_COLOR_CABELLO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/ColorCabello/SaveColorCabello',
            type: 'POST',
            data: JSON.stringify({ objColorCabello: T_MAE_COLOR_CABELLO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorColorCabello", "ulListaErrorColorCabello", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridcolorCabello();

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