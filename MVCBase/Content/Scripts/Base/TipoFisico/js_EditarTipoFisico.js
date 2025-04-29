$(document).ready(function () {
    //if ($("#DESCRIPCION").val().length==0)
    //{
    //    $("#DESCRIPCION").focus();
    //}
});

function validDatosTipoFisico() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoFisico").hide();
    }
    else {
        $("#divErrorTipoFisico").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoFisico"></ul>');
        errorAddJS("divErrorTipoFisico", "ulListaErrorTipoFisico", objData)
    }

    return flg;
}


$("#btnRegistrarTipoFisico").bind("click", function () {
    
    if (validDatosTipoFisico ()) {
        
        var T_MAE_TIPO_FISICO = {
            ID_TIPO_FISICO: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_FISICO: $("#XID_TIPO_FISICO").val().trim()

        }

        console.log(T_MAE_TIPO_FISICO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoFisico/SaveTipoFisico',
            type: 'POST',
            data: JSON.stringify({ objTipoFisico: T_MAE_TIPO_FISICO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoFisico", "ulListaErrorTipoFisico", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoFisico();

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