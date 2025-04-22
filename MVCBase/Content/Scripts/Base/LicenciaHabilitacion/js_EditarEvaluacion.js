$(document).ready(function () {
    CargarDatosKendoUi();

    if ($("#XID_EVALUACION_LIC").val().trim() == "") {
        $("#FECHA_EXPEDICION").val('');
        $("#FECHA_ACTUALIZACION").val('');
        $("#FECHA_VENCIMIENTO").val('');
        $("#FECHA_PRORROGA").val('');
        $("#FECHA_PROX_EVALUACION").val('');
    }
});

function CargarDatosKendoUi() {
    $("#FECHA_EXPEDICION").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
    $("#FECHA_ACTUALIZACION").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
    $("#FECHA_VENCIMIENTO").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
    $("#FECHA_PRORROGA").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
    $("#FECHA_PROX_EVALUACION").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
}

$("#btnRegistrarEvaluacion").bind("click", function () {

    if (validDatosEvaluacion()) {

        var T_GENM_EVALUACION = {
            ID_EVALUACION_LIC: 0,
            XID_TIPO_EVALUACION_LIC: $("#XID_TIPO_EVALUACION_LIC").data("kendoComboBox").value(),
            XID_LICENCIA: $("#XID_LICENCIA").val().trim(),
            XID_PERSONAL_AERONAUTICO: $("#XID_PERSONAL_AERONAUTICO").val().trim(),
            FECHA_EXPEDICION: $("#FECHA_EXPEDICION").data("kendoDatePicker").value(),//$("#FECHA_EXPEDICION").data("kendoDatePicker").value(),
            //FECHA_ACTUALIZACION: $("#FECHA_ACTUALIZACION").data("kendoDatePicker").value(),
            FECHA_VENCIMIENTO: $("#FECHA_VENCIMIENTO").data("kendoDatePicker").value(),
            FECHA_PRORROGA: $("#FECHA_PRORROGA").data("kendoDatePicker").value(),
            FECHA_PROX_EVALUACION: $("#FECHA_PROX_EVALUACION").data("kendoDatePicker").value(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_HABILITACION_LIC: $("#XID_EVALUACION_LIC").val().trim()

        }

        console.log(T_GENM_EVALUACION);


        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/LicenciaHabilitacion/SaveEvaluacion',
            type: 'POST',
            data: JSON.stringify({ objEvaluacion: T_GENM_EVALUACION }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEvaluacion", "ulListaErrorEvaluacion", data.errores);
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

    }
});

function validDatosEvaluacion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if (isDate($("#FECHA_EXPEDICION").val()) == false) {
        flg = false;
        $("#FECHA_EXPEDICION").parents("span").addClass("valError");
        objData.push({ "FECHA_EXPEDICION": [{ ErrorMessage: "Debe ingresar una fecha de expedición válida" }] })
    }

    if (flg) {
        $("#divErrorEvaluacion").hide();
    }
    else {
        $("#divErrorEvaluacion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEvaluacion"></ul>');
        errorAddJS("divErrorEvaluacion", "ulListaErrorEvaluacion", objData)
    }

    return flg;
}