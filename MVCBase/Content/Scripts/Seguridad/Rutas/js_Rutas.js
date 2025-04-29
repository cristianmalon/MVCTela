
$(document).ready(function () {

    CargarGridRutas();
    CargarComboEstadosIndex();
    CargarComboRutasTipoIndex();
    CargarComboSistemasIndex();

    $("#btnBuscarRutas").click(function () {
        $('#gridRutas').data('kendoGrid').dataSource.read();
        $('#gridRutas').data('kendoGrid').refresh();
    });

    $("#btnGuardarRuta").click(function () {
        BootstrapDialog.show({
            title: 'REGISTRAR',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [{
                label: 'Cerrar',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                label: 'Registrar',
                icon: 'glyphicon glyphicon-save',
                action: function (dialog) {
                    var RUTAS = {
                        SerialKey: $('#frmRegistrarRutas :input[id="SerialKey"]').val().trim(),
                        SISTEMAKey: $('#frmRegistrarRutas :input[id="SISTEMAKey"]').val().trim(),
                        RUTAS_PADREKey: $('#frmRegistrarRutas :input[id="RUTAS_PADREKey"]').val().trim(),
                        RUTAS_TIPOKey: $('#frmRegistrarRutas :input[id="RUTAS_TIPOKey"]').val().trim(),
                        AREA: $('#frmRegistrarRutas :input[id="AREA"]').val().trim(),
                        CONTROLADOR: $('#frmRegistrarRutas :input[id="CONTROLADOR"]').val().trim(),
                        ACCION: $('#frmRegistrarRutas :input[id="ACCION"]').val().trim(),
                        DESCRIPCION: $('#frmRegistrarRutas :input[id="DESCRIPCION"]').val().trim(),
                        ESTADO: $('#frmRegistrarRutas :input[id="ESTADO"]').val().trim()
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Rutas/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: RUTAS }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorRutas", "ulListaErrorRutas", data.errores);
                            } else {
                                ActualizarTablaRutas();
                                dialog.close();
                            }
                            AlertMessage(data.result);
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }
            }]
        });
    });

    $("#btnEditarRutas").click(function () {
        var data = $("#gridRutas").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'Index=' + item.SerialKey)),
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: ' Editar',
                    icon: 'glyphicon glyphicon-pencil',
                    action: function (dialog) {
                        var RUTAS = {
                            SerialKey: $('#frmEditarRutas :input[id="SerialKey"]').val().trim(),
                            SISTEMAKey: $('#frmEditarRutas :input[id="SISTEMAKey"]').val().trim(),
                            RUTAS_PADREKey: $('#frmEditarRutas :input[id="RUTAS_PADREKey"]').val().trim(),
                            RUTAS_TIPOKey: $('#frmEditarRutas :input[id="RUTAS_TIPOKey"]').val().trim(),
                            AREA: $('#frmEditarRutas :input[id="AREA"]').val().trim(),
                            CONTROLADOR: $('#frmEditarRutas :input[id="CONTROLADOR"]').val().trim(),
                            ACCION: $('#frmEditarRutas :input[id="ACCION"]').val().trim(),
                            DESCRIPCION: $('#frmEditarRutas :input[id="DESCRIPCION"]').val().trim(),
                            ESTADO: $('#frmEditarRutas :input[id="ESTADO"]').val().trim()
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Rutas/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: RUTAS }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorRutas", "ulListaErrorRutas", data.errores);
                                } else {
                                    ActualizarTablaRutas();
                                    dialog.close();
                                }
                                AlertMessage(data.result);
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                }]
            });
        }
        else {
            AlertMessage("Debe seleccionar el item que desea Editar.");
        }
    });

});

function CargarGridRutas() {
    $("#gridRutas").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Rutas/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    SISTEMAKey: $('#frmIndexRutas :input[id="ListaSistemas"]').val(),
                    RUTAS_TIPOKey: $('#frmIndexRutas :input[id="ListaRutasTipo"]').val(),
                    ESTADO: $('#frmIndexRutas :input[id="ListaEstado"]').val()
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    DESCRIPCION: { type: "string" },
                    ESTADO: { type: "string" },
                    DESCRIPCION_CORTA_SIS: { type: "string" },
                    DESCRIPCION_RUTA_TIPO: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridRutas").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        toolbar: kendo.template($("#templateRutas").html()),
        noRecords: {
            template: '<br/> ' +
            ' <div class="row"> ' +
            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
            ' <div class="alert alert-info alert-dismissable" align="center"> ' +
            ' NO SE ENCONTRARON REGISTROS DE RUTAS ' +
            ' </div> ' +
            ' </div> ' +
            ' </div>'
        },
        columns: [
            {
                field: "AREA",
                title: "Area",
                width: 100
            }, {
                field: "CONTROLADOR",
                title: "Controlador",
                width: 100
            }, {
                field: "ACCION",
                title: "Accion",
                width: 100
            }, {
                field: "DESCRIPCION",
                title: "Descripcion",
                width: 100
            }, {
                field: "DESCRIPCION_RUTA_TIPO",
                title: "Tipo",
                width: 150
            }, {
                field: "DESCRIPCION_CORTA_SIS",
                title: "Sistema",
                width: 100
            }, {
                field: "ESTADO",
                title: "Estado",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaRutas() {
    var grid = $('#gridRutas').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}


function CargarComboRutasTipoIndex() {
    $('#frmIndexRutas :input[id="ListaRutasTipo"]').kendoDropDownList({
        placeholder: "[TODOS]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });
}


function CargarComboSistemasIndex() {
    $('#frmIndexRutas :input[id="ListaSistemas"]').kendoDropDownList({
        placeholder: "[TODOS]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });
}

function CargarComboEstadosIndex() {
    $('#frmIndexRutas :input[id="ListaEstado"]').kendoDropDownList({
        placeholder: "[TODOS]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });
}