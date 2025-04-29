$(document).ready(function () {
    CargarCombos();
});

function CargarCombos() {

    $('#frmReubicarOrigen').find('input[id="PABELLON"]').kendoDropDownList({
        optionLabel: "[SELECCIONE]",
        dataTextField: "DESCRIPCION_LARGA",
        dataValueField: "SerialKey",
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: "/Pabellon/Listar",
                    contentType: "application/json",
                    dataType: 'json'
                },
            },
            schema: {
                data: "lista",
                type: 'json',
            },
        }),
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $('#frmReubicarOrigen').find('input[id="UBICACIONKey"]').kendoDropDownList({
        autoBind: true,
        cascadeFrom: "PABELLON",
        optionLabel: "[SELECCIONE]",
        dataTextField: "DESCRIPCION",
        dataValueField: "DataKey",
        dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
                read: {
                    type: "POST",
                    url: "/Ubicacion/Listar",
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        PABELLONKey: $('#frmReubicarOrigen').find('input[id="PABELLON"]').val(),
                        ESTADO: "A"
                    });
                }
            },
            schema: {
                data: "lista",
                type: 'json',
            },
        }),
        change: function () {
            var UBICACIONKey = $("#UBICACIONKey").val().split("|")[1];
            var UBICACION_ESTADOKey_ORIGEN = $('#frmReubicarOrigen').find('select[id="UBICACION_ESTADOKey_ORIGEN"]').data("kendoDropDownList");
            if (UBICACIONKey != "" && UBICACIONKey != undefined) {
                UBICACION_ESTADOKey_ORIGEN.enable(true); 
                UBICACION_ESTADOKey_ORIGEN.search(UBICACIONKey);
            }
            else {
                UBICACION_ESTADOKey_ORIGEN.enable(false); 
                UBICACION_ESTADOKey_ORIGEN.select(0);
            }
        },
    });

    $('#frmReubicarOrigen').find('select[id="UBICACION_ESTADOKey_ORIGEN"]').kendoDropDownList({
        enable: false,
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
