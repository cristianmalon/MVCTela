$(document).ready(function () {


});

function validDatosTipoLugarDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoLugarDS").hide();
    }
    else {
        $("#divErrorTipoLugarDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoLugarDS"></ul>');
        errorAddJS("divErrorTipoLugarDS", "ulListaErrorTipoLugarDS", objData)
    }

    return flg;
}


$("#btnRegistrarTipoLugarDS").bind("click", function () {


    if (validDatosTipoLugarDS()) {


        var T_MAE_TIPO_LUGAR_DS = {
            ID_TIPO_LUGAR_DS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XTIPO_LUGAR_DS: $("#XTIPO_LUGAR_DS").val().trim()

        }

        console.log(T_MAE_TIPO_LUGAR_DS);
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoLugarDS/SaveTipoLugarDS',
            type: 'POST',
            data: JSON.stringify({ objTipoLugarDS: T_MAE_TIPO_LUGAR_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoLugarDS", "ulListaErrorTipoLugarDS", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoLugarDS();

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