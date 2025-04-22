$(document).ready(function () {
    $('input:radio[name=rdSatisfactoria]').click(function () {
        if ($(this).val() == "true") {
            $("#divobservacion").hide()
            $("#gridDiscrepancias").show();
        }
        else {
            $("#gridDiscrepancias").hide();
            $("#divobservacion").show()
        }
    });

    $(".btnAddDiscrepancia").click(function () {
        $("#modalDiscrepancia").modal('show');
    });


    $("#FECHA_INICIO").kendoDatePicker();
    $("#FECHA_FIN").kendoDatePicker();
    $("#FECHA_INSPECCION").kendoDatePicker();
    $("#FECHA_INICIO").val('');
    $("#FECHA_FIN").val('');
    $("#FECHA_INSPECCION").val('');
    $("#modalDiscrepancia").modal('hide');


});