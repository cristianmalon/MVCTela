$(document).ready(function () {
    $("#FECHA_INICIO").kendoDatePicker();
    $("#FECHA_FIN").kendoDatePicker();
    $("#FECHA_INSPECCION").kendoDatePicker();
    $("#FechaVencimientoDiscrepancia").kendoDatePicker();
    $("#FECHA_INICIO").val('');
    $("#FECHA_FIN").val('');
    $("#FECHA_INSPECCION").val('');
    $("#FechaVencimientoDiscrepancia").val('');

    $(window).load(function () {

        $(".AsignaOrdenInspeccion").click(function () {
            var month = $(this).attr("data-month");
            var week = $(this).attr("data-week");

            $("#modalListaInspeccion").modal('show');
        });
        
        $("#btnAddInspeccion").click(function () {
            $("#modalOrdenInspeccion").modal('show');
        });
        $("#addOrdenInspeccion").click(function () {
            $("#modalOrdenInspeccion").modal('show');
        });
        $("#btnAddInspeccion").click(function () {
            $("#modalOrdenInspeccion").modal('show');
        });
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
        $("#btnVerPlanProgramado").click(function () {
            $("#modalPlanVigilanciaProgramado").modal('show');
        });
        $("#btnVerInspectorResponsable").click(function () {
            $("#modalInspectorPrincipalEmpresa").modal('show');
        });
        $("#btnAddInspeccionNoProgramada").click(function () {
            $("#modalOrdenInspeccionNoProgramada").modal('show');
        });
        $("#btnAddOtro").click(function () {
            $("#modalOtroServicio").modal('show');
        });
        
    });
});
