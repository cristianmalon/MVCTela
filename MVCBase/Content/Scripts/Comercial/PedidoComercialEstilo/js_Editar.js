$(document).ready(function () {

    CargarCombos();
    CargarCalendarios();


    $("#OPCFReqAPT").data("kendoDatePicker").min(new Date());
    $("#OPCFReqExFty").data("kendoDatePicker").min(new Date());

    //CONFIGURANDO EL VALOR MAXIMO DE LA APT
    $("#OPCFReqExFty").change(function () {
        $("#OPCFReqAPT").data("kendoDatePicker").max($("#OPCFReqExFty").val());
    });

    //CONFIGURANDO EL VALOR MINIMO DE LA EXPORT FACTORY
    $("#OPCFReqAPT").change(function () {
        $("#OPCFReqExFty").data("kendoDatePicker").min($("#OPCFReqAPT").val());
    });

});

function CargarCombos() {
    $('#OPCCTipDes').kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });

    $('#OPCCTipPrc3').kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });

    $('#OPCSPreCT').kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });

   /* $('#EMBARQUESKey').kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });*/
}

function CargarCalendarios() {
    $("#OPCFReqAPT").kendoDatePicker({
        start: "year"
    });

    $("#OPCFReqExFty").kendoDatePicker({
        start: "year"
    });

    $('#OPCFReqAPT').attr('readonly', true);
    $('#OPCFReqExFty').attr('readonly', true);
}

