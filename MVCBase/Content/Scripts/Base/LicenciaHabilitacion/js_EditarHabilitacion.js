$(document).ready(function () {


    if ($("#XFLG_SUSPENCION").val() == "0") {
        $("#btnSuspender").show();
        $("#btnActivar").hide();
    } else {
        $("#btnSuspender").hide();
        $("#btnActivar").show();
    }


});


$("#btnSuspender").bind("click", function () {
    modalAjaxRequestGet2($(this).attr("data-url"), "", "", "Id_Licencia=" + $('#XID_LICENCIA').val() + "&Id_Habilitacion" + $('#XID_HABILITACION_LIC').val());
});

$("#btnActivar").bind("click", function () {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/LicenciaHabilitacion/ActivarHabilitacion',
        type: 'POST',
        data: JSON.stringify({ Id_Habilitacion: $('#XID_HABILITACION_LIC').val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divErrorHabilitacion", "ulListaErrorHabilitacion", data.errores);
            } else {

                bootbox.alert("La Activación de la Licencia se realizó con éxito", function () {
                    $("#btnSuspender").show();
                    $("#btnActivar").hide();
                });



            }

            desbloqObject();

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
});

$("#btnRegistrarHabilitacion").bind("click", function () {

    var T_GENM_HABILITACION = {
            ID_HABILITACION_LIC: 0,
            OBSERVACION: $("#OBSERVACION").val().trim(),
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_HABILITACION_LIC: $("#XID_HABILITACION_LIC").val().trim()
        }

    console.log(T_GENM_HABILITACION);


        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/LicenciaHabilitacion/SaveHabilitacion',
            type: 'POST',
            data: JSON.stringify({ objHabilitacion: T_GENM_HABILITACION }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorHabilitacion", "ulListaErrorHabilitacion", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    $("body").find("#gridLicencias").data('kendoGrid').dataSource.read();
                    $("body").find("#gridLicencias").data('kendoGrid').refresh();
                }

                desbloqObject();

            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

});