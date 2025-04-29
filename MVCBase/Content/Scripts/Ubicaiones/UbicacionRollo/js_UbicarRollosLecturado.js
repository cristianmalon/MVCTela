$(document).ready(function () {
    CargarCombos();
});

function CargarCombos() {
    $('#frmUbicarRollosLecturado').find('input[id="PABELLON"]').kendoDropDownList({
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

    $('#frmUbicarRollosLecturado').find('input[id="UBICACIONKey"]').kendoDropDownList({
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
                        PABELLONKey: $('#frmUbicarRollosLecturado').find('input[id="PABELLON"]').val(),
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
            MostrarEstadoUbicacion();
        },
    });

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

}

function MostrarEstadoUbicacion() {
    var ESTADO_UBICACION = $('#frmUbicarRollosLecturado').find('input[id="UBICACIONKey"]').val();
    if (ESTADO_UBICACION != "" && ESTADO_UBICACION != undefined) {
        var KeyArray = ESTADO_UBICACION.split("|");
        $("#ESTADO_UBICACION").val(KeyArray[1]);
        $("#ESTADO_UBICACION").css({ 'background-color': KeyArray[3] });
        $("#ESTADO_UBICACION").css('font-weight', 'bold');
    }
    else {
        $("#ESTADO_UBICACION").val('');
        $("#ESTADO_UBICACION").css({ 'background-color': '#DFD8D1' });
    }
}