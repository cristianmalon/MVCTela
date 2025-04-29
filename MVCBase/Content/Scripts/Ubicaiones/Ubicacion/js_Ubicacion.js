$(document).ready(function () {

    CargarGridUbicaciones();
    CargarCombosIndex();

    $("#btnBuscarUbicacion").click(function () {
        $('#gridUbicacion').data('kendoGrid').dataSource.read();
        $('#gridUbicacion').data('kendoGrid').refresh();
    });

    $("#btnGuardarUbicacion").click(function () {
        BootstrapDialog.show({
            title: 'REGISTRAR UBICACION',
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
                    var UBICACION = {
                        COLUMNA: $('#frmRegistroUbicacion').find('input[id="COLUMNA"]').val(),
                        NIVEL: $('#frmRegistroUbicacion').find('input[id="NIVEL"]').val(),
                        DESCRIPCION: $('#frmRegistroUbicacion').find('input[id="DESCRIPCION"]').val(),
                        CAPACIDAD_UTILIZADA: 0,
                        PABELLONKey: $('#frmRegistroUbicacion').find('select[id="PABELLONKey"]').val().split('#')[0],
                        UBICACION_ESTADOKey: $('#frmRegistroUbicacion').find('select[id="UBICACION_ESTADOKey"]').val(),
                        SerialKey: $('#frmRegistroUbicacion').find('input[id="SerialKey"]').val(),
                        ESTADO: 'A'
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Ubicacion/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: UBICACION }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorUbicacion", "ulListaErrorUbicacion", data.errores);
                            } else {
                                ActualizarTablaUbicacion();
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

    $("#btnEditarUbicacion").click(function () {
        var data = $("#gridUbicacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR UBICACION',
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
                        var UBICACION_ESTADO_DESC = $('#frmEditarUbicacion').find('select[id="UBICACION_ESTADOKey"]').data("kendoDropDownList").text();
                        var ESTADO = $('#frmEditarUbicacion :input[id="ESTADO"]').val().trim();

                        if (UBICACION_ESTADO_DESC != "DISPONIBLE" && ESTADO == "I") {
                            AlertMessage("SOLO PUEDEN INHABILITARSE UBICACIONES EN ESTADO DISPONIBLE")
                        }
                        else {
                            var UBICACION = {
                                COLUMNA: $('#frmEditarUbicacion').find('input[id="COLUMNA"]').val(),
                                NIVEL: $('#frmEditarUbicacion').find('input[id="NIVEL"]').val(),
                                DESCRIPCION: $('#frmEditarUbicacion').find('input[id="DESCRIPCION"]').val(),
                                CAPACIDAD_UTILIZADA: 0,
                                PABELLONKey: $('#frmEditarUbicacion').find('select[id="PABELLONKey"]').val().split('#')[0],
                                UBICACION_ESTADOKey: $('#frmEditarUbicacion').find('select[id="UBICACION_ESTADOKey"]').val(),
                                OBSERVACION: $('#frmEditarUbicacion').find('textarea[id="OBSERVACION"]').val(),
                                SerialKey: $('#frmEditarUbicacion').find('input[id="SerialKey"]').val(),
                                ESTADO: $('#frmEditarUbicacion :input[id="ESTADO"]').val().trim()
                            }
                            $.ajax({
                                datatype: 'json',
                                contentType: "application/json",
                                url: '/Ubicacion/Actualizar',
                                type: 'POST',
                                data: JSON.stringify({ entidad: UBICACION }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (!data.rpta) {
                                        errorAddModelo("divErrorUbicacion", "ulListaErrorUbicacion", data.errores);
                                    } else {
                                        ActualizarTablaUbicacion();
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
                    }
                }]
            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR LA UBICACION QUE DESEA EDITAR.");
        }
    });

    $("#btnEliminarUbicacion").click(function () {
        var data = $("#gridUbicacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            window.ConfirmMessage("Seguro que desea eliminar la siguiente Ubicacion?").then(function () {
                var UBICACION = {
                    COLUMNA: item.COLUMNA,
                    NIVEL: item.NIVEL,
                    DESCRIPCION: item.DESCRIPCION,
                    CAPACIDAD_UTILIZADA: item.CAPACIDAD_UTILIZADA,
                    PABELLONKey: item.PABELLONKey,
                    UBICACION_ESTADOKey: item.UBICACION_ESTADOKey,
                    OBSERVACION: item.OBSERVACION,
                    SerialKey: item.SerialKey,
                    ESTADO: "I"
                }
                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/Ubicacion/Actualizar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: UBICACION }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.rpta) {
                            ActualizarTablaUbicacion();
                        }
                        AlertMessage(data.result);
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });
            })
        }
        else {
            AlertMessage("DEBE SELECCIONAR LA UBICACION QUE DESEA EDITAR.");
        }
    })

});

function CargarGridUbicaciones() {
    $("#gridUbicacion").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Ubicacion/ListarPaginado",
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function () {
                    bloquoteObject();
                },
                complete: function () {
                    desbloqObject();
                }
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    PABELLONKey: $('#frmIndexUbicacion :input[id="ListaPabellones"]').val(),
                    UBICACION_ESTADOKey: $('#frmIndexUbicacion :input[id="ListaEstadosUbicacion"]').val(),
                    DESCRIPCION: $('#frmIndexUbicacion :input[id="UBICACION_DESCRIPCION"]').val(),
                    ESTADO: $('#frmIndexUbicacion :input[id="ListaEstado"]').val()
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    COLUMNA: { type: "number" },
                    NIVEL: { type: "number" },
                    DESCRIPCION: { type: "string" },
                    PABELLON_DESCRIPCION_LARGA: { type: "string" },
                    OBSERVACION: { type: "string" },
                    CAPACIDAD_UTILIZADA: { type: "number" },
                    PABELLON_DESCRIPCION: { type: "string" },
                    PABELLON_COLUMNAS: { type: "string" },
                    PABELLON_NIVELES: { type: "string" },
                    PABELLON_CAPACIDAD_UBICACION: { type: "string" },
                    UBICACION_ESTADO_DESCRIPCION: { type: "string" },
                    UBICACION_ESTADO_FLG_DISPONIBLE: { type: "string" },
                    UBICACION_ESTADO_COLOR: { type: "string" },
                    ESTADO: { type: "string" },
                    SerialKey: { type: "string" },
                    PABELLONKey: { type: "string" },
                    UBICACION_ESTADOKey: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridUbicacion").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateUbicacion").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE UBICACIONES ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "PABELLON_DESCRIPCION_LARGA",
                title: "Pabellon",
                width: 100
            }, {
                field: "DESCRIPCION",
                title: "Ubicacion",
                width: 100
            }, {
                field: "UBICACION_ESTADO_DESCRIPCION",
                title: "Estado en almacen",
                width: 100
            }, {
                field: "ESTADO",
                title: "Estado",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaUbicacion() {
    var grid = $('#gridUbicacion').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarCombosIndex() {
    $('#frmIndexUbicacion :input[id="ListaPabellones"]').kendoDropDownList({
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

    $('#frmIndexUbicacion :input[id="ListaEstadosUbicacion"]').kendoDropDownList({
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

    $('#frmIndexUbicacion :input[id="ListaEstado"]').kendoDropDownList({
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