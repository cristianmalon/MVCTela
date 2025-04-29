$(document).ready(function () {
    $(window).load(function () {

        $(".AsignaOrdenInspeccion").click(function () {
            var month = $(this).attr("data-month");
            var week = $(this).attr("data-week");

            $("#modalListaInspeccion").modal('show');
        });

        $("#btnAddInspeccion").click(function () {
            $("#btnReProgramar").hide();
            $("#modalOrdenInspeccion").modal('show');
            $("#btnRegistroModalMotor").show();
        });
        $("#btnModifyInspeccion").click(function () {
            $("#btnReProgramar").show();
            $("#modalOrdenInspeccion").modal('show');
            $("#btnRegistroModalMotor").hide();
        });
        
        $("#addOrdenInspeccion").click(function () {
            $("#modalOrdenInspeccion").modal('show');
        });

        $(".addInspeccion").click(function () {
            $("#modalOrdenInspeccion").modal('show');
        });

        $("#btnDeleteInspeccion").click(function () {
            $("#modalHistoricoInspeccion").modal('show');
        });
        $("#chFilterGiro").click(function () {
            if ($(this).is(':checked')) {
                $("#cbGiro").show();
            }
            else {
                $("#cbGiro").hide();
            }
        });

        $("#detalleMes").kendoGrid({
            selectable: "multiple",
        });

    });
});
