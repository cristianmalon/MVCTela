$(document).ready(function () {


});

$("#btnRegistrarTipoExamenMedico").bind("click", function () {

    if (validDatosTipoExamenMedico()) {


        var T_MAE_TIPO_EXAMEN_MEDICO = {
            ID_TIPO_EXAMEN_MEDICO: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            ABREVIATURA: $("#ABREVIATURA").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_EXAMEN_MEDICO: $("#XID_TIPO_EXAMEN_MEDICO").val().trim()

        }

        console.log(T_MAE_TIPO_EXAMEN_MEDICO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoExamenMedico/SaveTipoExamenMedico',
            type: 'POST',
            data: JSON.stringify({ objTipoExamenMedico: T_MAE_TIPO_EXAMEN_MEDICO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoExamenMedico", "ulListaErrorTipoExamenMedico", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoExamen();

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


function validDatosTipoExamenMedico() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorTipoExamenMedico").hide();
    }
    else {
        $("#divErrorTipoExamenMedico").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoExamenMedico"></ul>');
        errorAddJS("divErrorTipoExamenMedico", "ulListaErrorTipoExamenMedico", objData)
    }

    return flg;
}


