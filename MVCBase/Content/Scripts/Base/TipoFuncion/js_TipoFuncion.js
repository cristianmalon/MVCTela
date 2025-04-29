$(document).ready(function () {
    if ($("#DESCRIPCION").val().length == 0) {
        $("#DESCRIPCION").focus();
    }
});

function validDatosTipoFuncion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoFuncion").hide();
    }
    else {
        $("#divErrorTipoFuncion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoFuncion"></ul>');
        errorAddJS("divErrorTipoFuncion", "ulListaErrorTipoFuncion", objData)
    }

    return flg;
}


$("#btnRegistrarTipoFuncion").bind("click", function () {


    if (validDatosTipoFuncion()) {


        var T_MAE_TIPO_FUNCION = {
            ID_TIPO_FUNCION: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_FUNCION: $("#XID_TIPO_FUNCION").val().trim()

        }

        console.log(T_MAE_TIPO_FUNCION);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoFuncion/SaveTipoFuncion',
            type: 'POST',
            data: JSON.stringify({ objTipoFuncion: T_MAE_TIPO_FUNCION }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoFuncion", "ulListaErrorTipoFuncion", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoFuncion();

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