$(document).ready(function () {

    CargarCombosIndex();
    CargarGridPabellon();

    $("#btnBuscarPabellon").click(function () {
        $('#gridPabellon').data('kendoGrid').dataSource.read();
        $('#gridPabellon').data('kendoGrid').refresh();
    });

    $("#btnGuardarPabellon").click(function () {
        BootstrapDialog.show({
            title: 'REGISTRAR PABELLON',
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
                    var PABELLON = {
                        TIPO_TELAKey: $('#frmRegistrarPabellon').find('select[id="TIPO_TELAKey"]').val(),
                        DESTINOKey: $('#frmRegistrarPabellon').find('select[id="DESTINOKey"]').val(),
                        DESCRIPCION: $('#frmRegistrarPabellon').find('input[id="DESCRIPCION"]').val().trim(),
                        NIVELES: $('#frmRegistrarPabellon').find('input[id="NIVELES"]').val(),
                        ROLLOS_PALETA: $('#frmRegistrarPabellon').find('input[id="ROLLOS_PALETA"]').val(),
                        COLUMNAS: $('#frmRegistrarPabellon').find('input[id="COLUMNAS"]').val(),
                        PALETAS: $('#frmRegistrarPabellon').find('input[id="PALETAS"]').val(),
                        TOTAL_ROLLOS: $('#frmRegistrarPabellon').find('input[id="TOTAL_ROLLOS"]').val(),
                        TOTAL_KILOS: $('#frmRegistrarPabellon').find('input[id="TOTAL_KILOS"]').val(),
                        ESTADO: "A"
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Pabellon/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: PABELLON }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorPabellon", "ulListaErrorPabellon", data.errores);
                            } else {
                                ActualizarTablaPabellon();
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
        }).setSize(BootstrapDialog.SIZE_WIDE);
    });

    $("#btnEditarPabellon").click(function () {
        var data = $("#gridPabellon").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR PABELLON',
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
                        var PABELLON = {
                            TIPO_TELAKey: $('#frmEditarPabellon').find('select[id="TIPO_TELAKey"]').val(),
                            DESTINOKey: $('#frmEditarPabellon').find('select[id="DESTINOKey"]').val(),
                            DESCRIPCION: $('#frmEditarPabellon').find('input[id="DESCRIPCION"]').val().trim(),
                            NIVELES: $('#frmEditarPabellon').find('input[id="NIVELES"]').val(),
                            ROLLOS_PALETA: $('#frmEditarPabellon').find('input[id="ROLLOS_PALETA"]').val(),
                            COLUMNAS: $('#frmEditarPabellon').find('input[id="COLUMNAS"]').val(),
                            PALETAS: $('#frmEditarPabellon').find('input[id="PALETAS"]').val(),
                            TOTAL_ROLLOS: $('#frmEditarPabellon').find('input[id="TOTAL_ROLLOS"]').val(),
                            TOTAL_KILOS: $('#frmEditarPabellon').find('input[id="TOTAL_KILOS"]').val(),
                            SerialKey: $('#frmEditarPabellon').find('input[id="SerialKey"]').val(),
                            ESTADO: "A"
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Pabellon/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: PABELLON }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorPabellon", "ulListaErrorPabellon", data.errores);
                                } else {
                                    ActualizarTablaPabellon();
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
            }).setSize(BootstrapDialog.SIZE_WIDE);
        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PABELLON QUE DESEA EDITAR.");
        }
    });

    $("#btnEliminarPabellon").click(function () {
        var data = $("#gridPabellon").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            window.ConfirmMessage("Seguro que desea eliminar el siguiente Pabellon?").then(function () {
                var PABELLON = {
                    TIPO_TELAKey: item.TIPO_TELAKey,
                    DESTINOKey: item.DESTINOKey,
                    DESCRIPCION: item.DESCRIPCION,
                    NIVELES: item.NIVELES,
                    ROLLOS_PALETA: item.ROLLOS_PALETA,
                    COLUMNAS: item.COLUMNAS,
                    PALETAS: item.PALETAS,
                    TOTAL_ROLLOS: item.TOTAL_ROLLOS,
                    TOTAL_KILOS: item.TOTAL_KILOS,
                    SerialKey: item.SerialKey,
                    ESTADO: "I"
                }
                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/Pabellon/Actualizar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: PABELLON }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.rpta) {
                            ActualizarTablaPabellon();
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
            AlertMessage("DEBE SELECCIONAR EL PABELLON QUE DESEA ELIMINAR.");
        }
    })

});

function CargarGridPabellon() {
    $("#gridPabellon").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Pabellon/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    TIPO_TELAKey: $('#frmIndexPabellon :input[id="ListaTipoTela"]').val(),
                    DESTINOKey: $('#frmIndexPabellon :input[id="ListaDestinos"]').val(),
                    ESTADO: 'A'
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
                    NIVELES: { type: "number" },
                    COLUMNAS: { type: "number" },
                    ROLLOS_PALETA: { type: "number" },
                    PALETAS: { type: "number" },
                    TOTAL_ROLLOS: { type: "number" },
                    TOTAL_KILOS: { type: "number" },
                    TIPO_TELAKey: { type: "string" },
                    DESTINOKey: { type: "string" },
                    TIPO_DELA: { type: "string" },
                    DESTINO: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridPabellon").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templatePabellon").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE PABELLONES ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "DESCRIPCION",
                title: "Descripcion",
                width: 100
            }, {
                field: "TIPO_DELA",
                title: "Tipo de Tela",
                width: 100
            }, {
                field: "DESTINO",
                title: "Destino",
                width: 100
            }, {
                field: "NIVELES",
                title: "Niveles",
                width: 100
            }, {
                field: "COLUMNAS",
                title: "Columnas",
                width: 100
            }, {
                field: "ROLLOS_PALETA",
                title: "Rollos / Paleta",
                width: 100
            }, {
                field: "PALETAS",
                title: "Paletas",
                width: 100
            }, {
                field: "TOTAL_KILOS",
                title: "Capacidad / Nicho",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaPabellon() {
    var grid = $('#gridPabellon').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarCombosIndex() {
    $('#frmIndexPabellon :input[id="ListaTipoTela"]').kendoDropDownList({
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

    $('#frmIndexPabellon :input[id="ListaDestinos"]').kendoDropDownList({
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