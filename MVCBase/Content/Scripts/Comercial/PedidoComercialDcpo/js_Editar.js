$(document).ready(function () {
    CargarCalendarios();


    $("#DCPOPCFReqAPT").data("kendoDatePicker").min(new Date());
    $("#DCPOPCFReqExFty").data("kendoDatePicker").min(new Date());

    //CONFIGURANDO EL VALOR MAXIMO DE LA APT
    //$("#DCPOPCFReqExFty").change(function () {
    //    $("#DCPOPCFReqAPT").data("kendoDatePicker").max($("#DCPOPCFReqExFty").val());
    //});

    //CONFIGURANDO EL VALOR MINIMO DE LA EXPORT FACTORY
    $("#DCPOPCFReqAPT").change(function () {
        $("#DCPOPCFReqExFty").data("kendoDatePicker").min($("#DCPOPCFReqAPT").val());
    });

  
});

function CargarCalendarios() {
    console.log('DCPO CALENDAR');
    $("#DCPOPCFReqAPT").kendoDatePicker({
        start: "year"
    });

    $("#DCPOPCFReqExFty").kendoDatePicker({
        start: "year"
    });

    //$('#DCPOPCFReqAPT').attr('readonly', true);
    //$('#DCPOPCFReqExFty').attr('readonly', true);
}