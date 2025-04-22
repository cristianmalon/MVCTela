$(document).ready(function () {


});

$("#btnRegistrarNacionalidad").bind("click", function () {
    
    if (validDatosNacionalidad()) {


        var T_MAE_NACIONALIDAD = {
            ID_NACIONALIDAD: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null, 
            XID_NACIONALIDAD: $("#XID_NACIONALIDAD").val().trim()

        }

        console.log(T_MAE_NACIONALIDAD);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Nacionalidad/SaveNacionalidad',
            type: 'POST',
            data: JSON.stringify({ objNacionalidad: T_MAE_NACIONALIDAD }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorNacionalidad", "ulListaErrorNacionalidad", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridNacionalidad();

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


function validDatosNacionalidad() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if (flg) {
        $("#divErrorNacionalidad").hide();
    }
    else {
        $("#divErrorNacionalidad").html('<strong>No se puede grabar</strong><ul id="ulListaErrorNacionalidad"></ul>');
        errorAddJS("divErrorNacionalidad", "ulListaErrorNacionalidad", objData)
    }

    return flg;
}


