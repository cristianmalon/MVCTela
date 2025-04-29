$(document).ready(function () {

    $("#FECHA_PROX_EVALUACION").kendoDatePicker();
    $("#FECHA_EXPEDICION").kendoDatePicker();
    $("#FECHA_VENCIMIENTO").kendoDatePicker();


    if ($("#FECHA_PROX_EVALUACION").data("kendoDatePicker").value() == null || $("#FECHA_PROX_EVALUACION").val() == "01/01/1900") {
        $("#FECHA_PROX_EVALUACION").data("kendoDatePicker").value("");
        $("#FECHA_PROX_EVALUACION").val('');
    }
    if ($("#FECHA_EXPEDICION").data("kendoDatePicker").value() == null || $("#FECHA_EXPEDICION").val() == "01/01/1900") {
        $("#FECHA_EXPEDICION").data("kendoDatePicker").value("");
        $("#FECHA_EXPEDICION").val('');
    }
    if ($("#FECHA_VENCIMIENTO").data("kendoDatePicker").value() == null || $("#FECHA_VENCIMIENTO").val() == "01/01/1900") {
        $("#FECHA_VENCIMIENTO").data("kendoDatePicker").value("");
        $("#FECHA_VENCIMIENTO").val('');
    }

    $("#FECHA_EXPEDICION").data("kendoDatePicker").enable(false);
    $("#FECHA_VENCIMIENTO").data("kendoDatePicker").enable(false);

});

function validDatosEvaluacionlic() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#FECHA_PROX_EVALUACION").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_PROX_EVALUACION").parents("span").addClass("valError");
        objData.push({ "FECHA_PROX_EVALUACION": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de evaluación" }] })
    }
    if ($("#FECHA_EXPEDICION").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_EXPEDICION").parents("span").addClass("valError");
        objData.push({ "FECHA_EXPEDICION": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de actualización" }] })
    }
    if ($("#FECHA_VENCIMIENTO").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_VENCIMIENTO").parents("span").addClass("valError");
        objData.push({ "FECHA_VENCIMIENTO": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vencimiento" }] })
    }
    if (flg) {
        $("#divErrorEvaluacionLic").hide();
    }
    else {
        $("#divErrorEvaluacionLic").html('<strong>No se puede grabar</strong><ul id="ulListaErrorEvaluacionLic"></ul>');
        errorAddJS("divErrorEvaluacionLic", "ulListaErrorEvaluacionLic", objData)
    }

    return flg;
}

$("#btnRegistrarEvalLic").bind("click", function () {


    if (validDatosEvaluacionlic()) {

        var T_GENM_EVALUACION_LIC = {
            ID_EVALUACION_LIC: 0,
            FECHA_EXPEDICION: $("#FECHA_EXPEDICION").val(),
            FECHA_VENCIMIENTO: $("#FECHA_VENCIMIENTO").val(),
            FECHA_PROX_EVALUACION: $("#FECHA_PROX_EVALUACION").val(),
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_EVALUACION_LIC: $("#XID_EVALUACION_LIC").val().trim(),
            XID_LICENCIA: $("#XID_LICENCIA").val().trim(),
            XID_PERSONAL_AERONAUTICO: $("#XID_PERSONAL_AERONAUTICO").val().trim()

        }

        console.log(T_GENM_EVALUACION_LIC);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/EvaluacionLic/SaveEvaluacionLic',
            type: 'POST',
            data: JSON.stringify({ objEvaluacionLic: T_GENM_EVALUACION_LIC }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorEvaluacionLic", "ulListaErrorEvaluacionLic", data.errores);
                } else {

                    $("#contenedor2").modal('hide');
                    cargarGridLicencia();

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