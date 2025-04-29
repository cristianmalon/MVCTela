$(document).ready(function () {

    

});

$("#btnGuardarAno").bind("click", function () {

    if (validDatosAno()) {

        var T_MAE_ANO = {
            ID_ANO: 0,
            XANO: $("#XANO").val(),
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false
        }

        console.log(T_MAE_ANO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Ano/SaveAno',
            type: 'POST',
            data: JSON.stringify({ objAno: T_MAE_ANO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorAno", "ulListaErrorAno", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    ConsultaAno();
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


function validDatosAno() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

        if ($("#DESCRIPCION").val().trim() == "") {
            flg = false;
            objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
        }

        if (flg) {
            $("#divErrorAno").hide();
        }
        else {
            $("#divErrorAno").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAno"></ul>');
            errorAddJS("divErrorAno", "ulListaAno", objData)
        }

    return flg;
}