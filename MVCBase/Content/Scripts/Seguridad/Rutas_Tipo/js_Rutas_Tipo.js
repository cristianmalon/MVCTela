
$(document).ready(function () {

    CargarGridRutasTipo();
    CargarComboEstadosIndex();


    $("#btnBuscarRutasTipo").click(function () {
        $('#gridRutasTipo').data('kendoGrid').dataSource.read();
        $('#gridRutasTipo').data('kendoGrid').refresh();
    });


    $("#btnGuardarRutaTipo").click(function () {
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
                    var RUTASTIPO = {
                        SerialKey: $('#frmRegistrarTipoRuta :input[id="SerialKey"]').val().trim(),
                        DESCRIPCION: $('#frmRegistrarTipoRuta :input[id="DESCRIPCION"]').val().trim(),
                        ESTADO: $('#frmRegistrarTipoRuta :input[id="ESTADO"]').val().trim()
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Rutas_Tipo/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: RUTASTIPO }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorRutaTipo", "ulListaErrorRutaTipo", data.errores);
                            } else {
                                ActualizarTablaRutasTipo();
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



    $("#btnEditarRutaTipo").click(function () {
        var data = $("#gridRutasTipo").data("kendoGrid");
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
                        var RUTAS_TIPO = {
                            SerialKey: $('#frmEditarTipoRuta :input[id="SerialKey"]').val().trim(),
                            DESCRIPCION: $('#frmEditarTipoRuta :input[id="DESCRIPCION"]').val().trim(),
                            ESTADO: $('#frmEditarTipoRuta :input[id="ESTADO"]').val().trim()
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Rutas_Tipo/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: RUTAS_TIPO }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorRutaTipo", "ulListaErrorRutaTipo", data.errores);
                                } else {
                                    ActualizarTablaRutasTipo();
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


function CargarGridRutasTipo() {
    $("#gridRutasTipo").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Rutas_Tipo/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    ESTADO: $('#frmIndexTipoRuta :input[id="ListaEstado"]').val()
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
                    ESTADO: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridRutasTipo").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        toolbar: kendo.template($("#templateRutasTipo").html()),
        noRecords: {
            template: '<br/> ' +
            ' <div class="row"> ' +
            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
            ' <div class="alert alert-info alert-dismissable" align="center"> ' +
            ' NO SE ENCONTRARON REGISTROS DE TIPOS DE RUTAS ' +
            ' </div> ' +
            ' </div> ' +
            ' </div>'
        },
        columns: [
            {
                field: "DESCRIPCION",
                title: "Descripcion",
                width: 180
            },
            {
                field: "ESTADO",
                title: "Estado",
                width: 120
            }]
    }).data("kendoGrid");

}

function ActualizarTablaRutasTipo() {
    var grid = $('#gridRutasTipo').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarComboEstadosIndex() {
    $('#frmIndexTipoRuta :input[id="ListaEstado"]').kendoDropDownList({
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