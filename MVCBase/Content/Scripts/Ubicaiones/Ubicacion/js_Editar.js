$(document).ready(function () {
    CargarConfiguraciones();
    CargarSpinners();
    CargarCombos();
    SelectedComboPabellones();
});


function CargarCombos() {
    $("#UBICACION_ESTADOKey").kendoDropDownList({
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

    $("#PABELLONKey").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        select: SetNumeroDigitos,
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#ESTADO").kendoDropDownList({
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
    $("#NIVEL").kendoNumericTextBox({
        decimals: 0,
        min: 1,
        max: 100,
        format: "#####",
        step: 1,
        change: GenerarDescripcion,
        spin: GenerarDescripcion
    });

    $("#COLUMNA").kendoNumericTextBox({
        decimals: 0,
        min: 1,
        max: 100,
        format: "#####",
        step: 1,
        change: GenerarDescripcion,
        spin: GenerarDescripcion
    });
}

function CargarConfiguraciones() {
    $("#OBSERVACION").prop('maxLength', 200);
    $("#DESCRIPCION").prop('maxLength', 5);
}

function SetNumeroDigitos(e) {
    var dataItem = this.dataItem(e.item);

    var NIVEL = dataItem.value.split('#')[2];
    var COLUMNA = dataItem.value.split('#')[3];

    $('#NIVEL').data("kendoNumericTextBox").value(null);
    $('#NIVEL').data("kendoNumericTextBox").focus();
    $("#NIVEL").data("kendoNumericTextBox").max(NIVEL);

    $('#COLUMNA').data("kendoNumericTextBox").value(null);
    $("#COLUMNA").data("kendoNumericTextBox").max(COLUMNA);

    $("#DESCRIPCION").val("");
}

function GenerarDescripcion() {
    var PABELLON = $("#PABELLONKey").val();
    var NIVEL = $("#NIVEL").val();
    var COLUMNA = $("#COLUMNA").val();
    var DESCRIPCION = "";

    if (PABELLON != "" && PABELLON != undefined && NIVEL != "" && NIVEL != undefined && COLUMNA != "" && COLUMNA != undefined) {

        DESCRIPCION = PABELLON.split('#')[1] + NIVEL + "-" + FormatearDigitos(COLUMNA);
        $("#DESCRIPCION").val(DESCRIPCION);
    }
}

function FormatearDigitos(COLUMNA) {
    if (COLUMNA.length < 2) {
        COLUMNA = "0" + COLUMNA;
    }

    return COLUMNA;
}

function SelectedComboPabellones() {
    var PABELLON_DESCRIPCION_LARGA = $("#PABELLON_DESCRIPCION_LARGA").val().trim();
    if (PABELLON_DESCRIPCION_LARGA != "" && PABELLON_DESCRIPCION_LARGA != undefined) {
        $('#frmEditarUbicacion').find('select[id="PABELLONKey"]').data('kendoDropDownList').search(PABELLON_DESCRIPCION_LARGA);
    }
}

$("#OBSERVACION").dblclick(function () {
    $("#OBSERVACION").val("Ninguna");
});