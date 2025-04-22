$(document).ready(function () {


});

function validDatosEstadoPlanVigilanciaAnualDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorEstadoPlanVigilanciaAnualDS").hide();
    }
    else {
        $("#divErrorEstadoPlanVigilanciaAnualDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEstadoPlanVigilanciaAnualDS"></ul>');
        errorAddJS("divErrorEstadoPlanVigilanciaAnualDS", "ulListaErrorEstadoPlanVigilanciaAnualDS", objData)
    }

    return flg;
}


$("#btnRegistrarEstadoPlanVigilanciaAnualDS").bind("click", function () {


    if (validDatosEstadoPlanVigilanciaAnualDS()) {


        var T_MAE_ESTADO_PLAN_VIGI_ANUALDS = {
            ID_ESTADO_PLAN_VIGI_ANUALDS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XESTADO_PLAN_VIGI_ANUALDS: $("#XESTADO_PLAN_VIGI_ANUALDS").val().trim()

        }

        console.log(T_MAE_ESTADO_PLAN_VIGI_ANUALDS);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/EstadoPlanVigilanciaAnualDS/SaveEstadoPlanVigilanciaAnualDS',
            type: 'POST',
            data: JSON.stringify({ objEstadoPlanVigilanciaAnualDS: T_MAE_ESTADO_PLAN_VIGI_ANUALDS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEstadoPlanVigilanciaAnualDS", "ulListaErrorEstadoPlanVigilanciaAnualDS", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridgridEstadoPlanVigilanciaAnualDS();

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