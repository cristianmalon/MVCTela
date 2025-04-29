$(document).ready(function () {

    CargarGridUbicacionEstado();

    $("#btnGuardarUbicacionEstado").click(function () {
        BootstrapDialog.show({
            title: 'REGISTRAR ESTADO',
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
                    var UBICACION_ESTADO = {
                        DESCRIPCION: $('#frmRegistroUbicacionEstado').find('input[id="DESCRIPCION"]').val().trim(),
                        COLOR: $('#frmRegistroUbicacionEstado').find('input[id="COLOR"]').val(),
                        FLG_DISPONIBLE: $('#frmRegistroUbicacionEstado :input[id="FLG_DISPONIBLE"]').prop("checked"),
                        NUM_ORDEN: 0,
                        ESTADO: "A"
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/UbicacionEstado/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: UBICACION_ESTADO }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorUbicacionEstado", "ulListaErrorUbicacionEstado", data.errores);
                            } else {
                                ActualizarTablaUbicacionEstado();
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

    $("#btnEditarUbicacionEstado").click(function () {
        var data = $("#gridUbicacionEstado").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR ESTADO',
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
                        var UBICACION_ESTADO = {
                            DESCRIPCION: $('#frmEditarUbicacionEstado').find('input[id="DESCRIPCION"]').val().trim(),
                            COLOR: $('#frmEditarUbicacionEstado').find('input[id="COLOR"]').val(),
                            FLG_DISPONIBLE: $('#frmEditarUbicacionEstado :input[id="FLG_DISPONIBLE"]').prop("checked"),
                            SerialKey: $('#frmEditarUbicacionEstado').find('input[id="SerialKey"]').val(),
                            NUM_ORDEN: 0,
                            ESTADO: "A"
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/UbicacionEstado/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: UBICACION_ESTADO }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorUbicacionEstado", "ulListaErrorUbicacionEstado", data.errores);
                                } else {
                                    ActualizarTablaUbicacionEstado();
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
            AlertMessage("DEBE SELECCIONAR EL ESTADO QUE DESEA EDITAR.");
        }
    });

    $("#btnEliminarUbicacionEstado").click(function () {
        var data = $("#gridUbicacionEstado").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            window.ConfirmMessage("Seguro que desea eliminar el siguiente Estado?").then(function () {
                var UBICACION_ESTADO = {
                    DESCRIPCION: item.DESCRIPCION,
                    COLOR: item.COLOR,
                    FLG_DISPONIBLE: item.FLG_DISPONIBLE,
                    NUM_ORDEN: item.NUM_ORDEN,
                    SerialKey: item.SerialKey,
                    ESTADO: "I"
                }
                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/UbicacionEstado/Actualizar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: UBICACION_ESTADO }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.rpta) {
                            ActualizarTablaUbicacionEstado();
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
            AlertMessage("DEBE SELECCIONAR EL ESTADO QUE DESEA ELIMINAR.");
        }
    })

});

function CargarGridUbicacionEstado() {
    $("#gridUbicacionEstado").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/UbicacionEstado/ListarPaginado",
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
                    COLOR: { type: "string" },
                    FLG_DISPONIBLE: { type: "boolean" },
                    FLG_DISPONIBLE_DESC: { type: "string" },
                    NUM_ORDEN: { type: "number" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridUbicacionEstado").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateUbicacionEstado").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE ESTADOS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "DESCRIPCION",
                title: "Descripcion",
                width: 700
            }, {
                field: "FLG_DISPONIBLE_DESC",
                title: "Disponibilidad",
                width: 300
            }, {
                title: "Color",
                template: "<span style='float: left; width: 100%; background-color: #= COLOR # '>&nbsp;</div>",
                width: 100
            }
            //, {
            //    title: "Color",
            //    width: "160px",
            //    attributes: {
            //        style: "background-color: #= COLOR # "
            //    }
            //}
        ]
    }).data("kendoGrid");

}

function ActualizarTablaUbicacionEstado() {
    var grid = $('#gridUbicacionEstado').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}
