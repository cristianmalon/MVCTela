$(document).ready(function () {
    CargarCombos();
});

function CargarCombos() {
    $('#frmReubicarDestino').find('input[id="PABELLON"]').kendoDropDownList({
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

    $('#frmReubicarDestino').find('input[id="UBICACIONKey"]').kendoDropDownList({
        autoBind: false,
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
                        PABELLONKey: $('#frmReubicarDestino').find('input[id="PABELLON"]').val(),
                        FLG_DISPONIBLE: 1,
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
            var UBICACION_ESTADOKey_DESTINO = $('#frmReubicarDestino').find('select[id="UBICACION_ESTADOKey_DESTINO"]').data("kendoDropDownList");
            if (UBICACIONKey != "" && UBICACIONKey != undefined) {
                UBICACION_ESTADOKey_DESTINO.enable(true);
                UBICACION_ESTADOKey_DESTINO.search(UBICACIONKey);
            }
            else {
                UBICACION_ESTADOKey_DESTINO.enable(false);
                UBICACION_ESTADOKey_DESTINO.select(0);
            }
        },
    });

    $('#frmReubicarDestino').find('select[id="UBICACION_ESTADOKey_DESTINO"]').kendoDropDownList({
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

