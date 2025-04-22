$(document).ready(function () {
    
    $("#btnRegistrarEstadoDiscrepanciaDS").click(function () {
        if (validDatosEstadoDiscrepancia()) {
            var o_T_Mae_Estado_Discrepancia_DS = {
                DESCRIPCION: $("#DESCRIPCION").val().trim(),               
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,                
                XESTADO_DISCREPANCIA_DS: $("#XESTADO_DISCREPANCIA_DS").val().trim()
            }
            console.log(o_T_Mae_Estado_Discrepancia_DS);

            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/EstadoDiscrepanciaDS/SaveEstadoDiscrepanciaDS',
                type: 'POST',
                data: JSON.stringify({ objEstadoDiscrepanciasDS: o_T_Mae_Estado_Discrepancia_DS }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    console.log(data);
                    if (!data.rpta) {
                        errorAddModelo("divErrorEstadoDiscrepanciaDS", "ulListaErrorEstadoDiscrepanciaDS", data.errores);
                    } else {

                        $("#contenedor").modal('hide');
                        cargarEstadoDiscrepanciaDS();

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

});

function validDatosEstadoDiscrepancia() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorEstadoDiscrepanciaDS").hide();
    }
    else {
        $("#divErrorEstadoDiscrepanciaDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEstadoDiscrepanciaDS"></ul>');
        errorAddJS("divErrorEstadoDiscrepanciaDS", "ulListaErrorEstadoDiscrepanciaDS", objData)
    }

    return flg;
}