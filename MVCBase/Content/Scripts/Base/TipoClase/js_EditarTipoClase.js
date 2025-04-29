$(document).ready(function () {
    //if ($("#DESCRIPCION").val().length==0)
    //{
    //    $("#DESCRIPCION").focus();
    //}
});

function validDatosTipoClase() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoClase").hide();
    }
    else {
        $("#divErrorTipoClase").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoClase"></ul>');
        errorAddJS("divErrorTipoClase", "ulListaErrorTipoClase", objData)
    }

    return flg;
}


$("#btnRegistrarTipoClase").bind("click", function () {


    if (validDatosTipoClase()) {


        var T_MAE_TIPO_CLASE = {
            ID_TIPO_CLASE: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_CLASE: $("#XID_TIPO_CLASE").val().trim()

        }

        console.log(T_MAE_TIPO_CLASE);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoClase/SaveTipoClase',
            type: 'POST',
            data: JSON.stringify({ objTipoClase: T_MAE_TIPO_CLASE }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoClase", "ulListaErrorTipoClase", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoClase();

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