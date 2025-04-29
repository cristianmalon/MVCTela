$(document).ready(function () {
    
    CargarGridTipoTela();

    $("#btnGuardarTipoTela").click(function () {
        BootstrapDialog.show({
            title: 'REGISTRAR TIPO DE TELA',
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
                    var TIPO_TELA = {
                        DESCRIPCION: $('#frmRegistroTipoTela').find('input[id="DESCRIPCION"]').val().trim(),
                        ESTADO: "A"
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/TipoTela/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: TIPO_TELA }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorTipoTela", "ulListaErrorTipoTela", data.errores);
                            } else {
                                ActualizarTablaTipoTela();
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

    $("#btnEditarTipoTela").click(function () {
        var data = $("#gridTipoTela").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR TIPO DE TELA',
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
                        var TIPO_TELA = {
                            DESCRIPCION: $('#frmEditarTipoTela').find('input[id="DESCRIPCION"]').val().trim(),
                            SerialKey: $('#frmEditarTipoTela').find('input[id="SerialKey"]').val(),
                            ESTADO: "A"
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/TipoTela/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: TIPO_TELA }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorTipoTela", "ulListaErrorTipoTela", data.errores);
                                } else {
                                    ActualizarTablaTipoTela();
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
            AlertMessage("DEBE SELECCIONAR EL TIPO DE TELA QUE DESEA EDITAR.");
        }
    });

    $("#btnEliminarTipoTela").click(function () {
        var data = $("#gridTipoTela").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            window.ConfirmMessage("Seguro que desea eliminar el siguiente Tipo de tela?").then(function () {
                var TIPO_TELA = {
                    DESCRIPCION: item.DESCRIPCION,
                    SerialKey: item.SerialKey,
                    ESTADO: "I"
                }
                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/TipoTela/Actualizar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: TIPO_TELA }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.rpta) {
                            ActualizarTablaTipoTela();
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
            AlertMessage("DEBE SELECCIONAR EL TIPO DE TELA QUE DESEA ELIMINAR.");
        }
    })

});

function CargarGridTipoTela() {
    $("#gridTipoTela").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoTela/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
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

    var grid = $("#gridTipoTela").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateTipoTela").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE TIPOS DE TELA ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "DESCRIPCION",
                title: "Descripcion",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaTipoTela() {
    var grid = $('#gridTipoTela').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}
