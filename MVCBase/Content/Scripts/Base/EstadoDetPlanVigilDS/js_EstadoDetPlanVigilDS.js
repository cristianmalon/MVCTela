$(document).ready(function () {


    


});


function validDatosEstadoDetPlanVigilDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    
    if (flg) {
        $("#divErrorEstadoDetPlanVigilDS").hide();
    }
    else {
        $("#divErrorEstadoDetPlanVigilDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEstadoDetPlanVigilDS"></ul>');
        errorAddJS("divErrorEstadoDetPlanVigilDS", "ulListaErrorEstadoDetPlanVigilDS", objData)
    }

    return flg;
}

$("#btnRegistrarEstadoDetPlanVigilDS").bind("click", function () {


    if (validDatosEstadoDetPlanVigilDS()) {


        var T_MAE_ESTADODPLANVIGILANCIA_DS = {
            ID_ESTADODPLANVIGILANCIA_DS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XESTADODPLANVIGILANCIA_DS: $("#XESTADODPLANVIGILANCIA_DS").val().trim()

        }

        console.log(T_MAE_ESTADODPLANVIGILANCIA_DS);
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/EstadoDetPlanVigilDS/SaveRegistroEstadoDetPlanVigilDS',
            type: 'POST',
            data: JSON.stringify({ objEstadoDetVigiDS: T_MAE_ESTADODPLANVIGILANCIA_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEstadoDetPlanVigilDS", "ulListaErrorEstadoDetPlanVigilDS", data.errores);
                } else {
                    //console.log(data.newcontregistro);

                    $("#contenedor").modal('hide');
                    cargarGridEstadoDetVigilanciaDS();

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