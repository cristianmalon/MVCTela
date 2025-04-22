
$(document).ready(function () {
    CargarConfiguraciones();
    CargarSpinners();
    CargarCombos();
});


function CalcularCapacidadNicho() {
    var ROLLOS_PALETA = $("#ROLLOS_PALETA").val();
    var PALETAS = $("#PALETAS").val();
    var ROLLO_PESO = $("#ROLLO_PESO").val();

    if (ROLLOS_PALETA != "" && PALETAS != "" && ROLLOS_PALETA != undefined && PALETAS != undefined && ROLLOS_PALETA > 0 && PALETAS > 0) {

        var _ROLLO_PESO = parseFloat(ROLLO_PESO);
        var _ROLLOS_PALETA = parseFloat(ROLLOS_PALETA);
        var _PALETAS = parseFloat(PALETAS);

        var TOTAL_KILOS = _ROLLOS_PALETA * _PALETAS * _ROLLO_PESO;
        var TOTAL_ROLLOS = _ROLLOS_PALETA * _PALETAS

        $("#LblTOTAL_KILOS").text(TOTAL_KILOS);
        $("#TOTAL_KILOS").val(TOTAL_KILOS);
        $("#TOTAL_ROLLOS").val(TOTAL_ROLLOS);
    }
}

function CargarCombos() {
    $("#TIPO_TELAKey").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#DESTINOKey").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });
}

function CargarSpinners() {
    $("#NIVELES").kendoNumericTextBox({
        decimals: 0,
        min: 0,
        max: 100,
        format: "#####",
        step: 1
    });


    $("#COLUMNAS").kendoNumericTextBox({
        decimals: 0,
        min: 0,
        max: 100,
        format: "#####",
        step: 1
    });

    $("#ROLLOS_PALETA").kendoNumericTextBox({
        decimals: 0,
        min: 0,
        max: 100,
        format: "#####",
        step: 1,
        change: CalcularCapacidadNicho,
        spin: CalcularCapacidadNicho
    });

    $("#PALETAS").kendoNumericTextBox({
        decimals: 0,
        min: 0,
        max: 100,
        format: "#####",
        step: 1,
        change: CalcularCapacidadNicho,
        spin: CalcularCapacidadNicho
    });
}

function CargarConfiguraciones() {
    $("#DESCRIPCION").prop('maxLength', 100);
}