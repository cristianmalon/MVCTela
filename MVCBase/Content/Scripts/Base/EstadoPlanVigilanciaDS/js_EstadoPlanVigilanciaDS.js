$(document).ready(function () {


});

function validDatosEstadoPlanVigilanciaDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorEstadoPlanVigilanciaDS").hide();
    }
    else {
        $("#divErrorEstadoPlanVigilanciaDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEstadoPlanVigilanciaDS"></ul>');
        errorAddJS("divErrorEstadoPlanVigilanciaDS", "ulListaErrorEstadoPlanVigilanciaDS", objData)
    }

    return flg;
}


$("#btnRegistrarEstadoPlanVigilanciaDS").bind("click", function () {


    if (validDatosEstadoPlanVigilanciaDS()) {


        var T_MAE_ESTADO_PLANVIGILANCIA_DS = {
            ID_ESTADO_PLANVIGILANCIA_DS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XESTADO_PLANVIGILANCIA_DS: $("#XESTADO_PLANVIGILANCIA_DS").val().trim()

        }

        console.log(T_MAE_ESTADO_PLANVIGILANCIA_DS);
       
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/EstadoPlanVigilanciaDS/SaveEstadoPlanVigilanciaDS',
            type: 'POST',
            data: JSON.stringify({ objEstadoPlanVigilanciaDS: T_MAE_ESTADO_PLANVIGILANCIA_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEstadoPlanVigilanciaDS", "ulListaErrorEstadoPlanVigilanciaDS", data.errores);
                } else {
                    
                    $("#contenedor").modal('hide');
                    cargarGridEstadoPlanVigilanciaDS();

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