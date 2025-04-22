$(document).ready(function () {


});

$("#btnRegistrarEstadoCard").bind("click", function () {

    if (validDatosEstadoCard()) {


        var T_MAE_ESTADO_CARD = {
            ID_ESTADO_CARD: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_ESTADO_CARD: $("#XID_ESTADO_CARD").val().trim()

        }

        console.log(T_MAE_ESTADO_CARD);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/EstadoCard/SaveEstadoCard',
            type: 'POST',
            data: JSON.stringify({ objEstadoCard: T_MAE_ESTADO_CARD }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEstadoCard", "ulListaErrorEstadoCard", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridEstadoCard();

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


function validDatosEstadoCard() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorEstadoCard").hide();
    }
    else {
        $("#divErrorCard").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEstadoCard"></ul>');
        errorAddJS("divErrorEstadoCard", "ulListaErrorEstadoCard", objData)
    }

    return flg;
}


