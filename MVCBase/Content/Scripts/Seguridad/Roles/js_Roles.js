
$(document).ready(function () {

    CargarGridRoles();
    CargarComboEstadosIndex();
    CargarComboSistemasIndex();

    $("#btnBuscarRoles").click(function () {
        $('#gridRoles').data('kendoGrid').dataSource.read();
        $('#gridRoles').data('kendoGrid').refresh();
    });

    $("#btnRegistrarRutas").click(function () {
        var data = $("#gridRoles").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'GESTIONAR RUTAS',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'Index=' + item.SerialKey)),
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: ' Guardar cambios',
                    icon: 'glyphicon glyphicon-save',
                    action: function (dialog) {
                        var gridRutas = $('#frmIndexRutas').find('#gridRutas').data('kendoGrid')._data;
                        if (gridRutas.length > 0) {
                            var ROLES_RUTAS = [];
                            for (var index = 0; index < gridRutas.length; index++) {
                                ROLES_RUTAS[index] = {
                                    RUTASKey: gridRutas[index]['RUTASKey'],
                                    ROLESKey: $('#frmIndexRutas').find('input[id="ROLESKey"]').val(),
                                    ESTADO: "A",
                                }
                            }

                            $.ajax({
                                datatype: 'json',
                                contentType: "application/json",
                                url: '/Roles_Rutas/Actualizar',
                                type: 'POST',
                                data: JSON.stringify({ _entidad: ROLES_RUTAS, entidad: null }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (!data.rpta) {
                                        errorAddModelo("divErrorRolesRutas", "ulListaErrorRolesRutas", data.errores);
                                        AlertMessage(data.result);
                                    } else {
                                        AlertMessage(data.result);
                                        dialog.close();
                                    }
                                    desbloqObject();
                                }
                            }).fail(function (jqxhr, textStatus, error) {
                                var err = textStatus + ', ' + error;
                                console.log("Request Failed: " + err);
                                desbloqObject();
                            });

                        }
                        else {
                            AlertMessage("DEBE ASIGNAR AL MENOS UNA RUTA PARA EL ROL");
                        }
                    }
                }]
            })
        }
        else {
            AlertMessage("Debe seleccionar el Rol que desea gestionar.");
        }
    });

    $("#btnGuardarRol").click(function () {
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
                    var ROLES = {
                        SISTEMAKey: $('#frmRegistroROLES').find('select[name="SISTEMAKey"]').val(),
                        DESCRIPCION: $('#frmRegistroROLES').find('input[name="DESCRIPCION"]').val(),
                        ESTADO: $('#frmRegistroROLES').find('select[name="ESTADO"]').val()
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Roles/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: ROLES }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorRoles", "ulListaErrorRoles", data.errores);
                            } else {
                                ActualizarTablaRoles();
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

    $("#btnEditarRol").click(function () {
        var data = $("#gridRoles").data("kendoGrid");
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
                        var ROLES = {
                            SerialKey: $('#frmEditarROLES :input[id="SerialKey"]').val().trim(),
                            SISTEMAKey: $('#frmEditarROLES :input[id="SISTEMAKey"]').val().trim(),
                            DESCRIPCION: $('#frmEditarROLES :input[id="DESCRIPCION"]').val().trim(),
                            ESTADO: $('#frmEditarROLES :input[id="ESTADO"]').val().trim()
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Roles/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: ROLES }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorRoles", "ulListaErrorRoles", data.errores);
                                } else {
                                    ActualizarTablaRoles();
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


function CargarGridRoles() {
    $("#gridRoles").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Roles/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    SISTEMAKey: $('#frmIndexROLES :input[id="ListaSistemas"]').val(),
                    ESTADO: $('#frmIndexROLES :input[id="ListaEstado"]').val()
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
                    DESCRIPCION_CORTA_SIS: { type: "string" },
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

    var grid = $("#gridRoles").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        toolbar: kendo.template($("#templateRoles").html()),
        noRecords: {
            template: '<br/> ' +
            ' <div class="row"> ' +
            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
            ' <div class="alert alert-info alert-dismissable" align="center"> ' +
            ' NO SE ENCONTRARON REGISTROS DE ROLES ' +
            ' </div> ' +
            ' </div> ' +
            ' </div>'
        },
        columns: [
            {
                field: "DESCRIPCION",
                title: "Descripcion",
                width: 180
            }, {
                field: "DESCRIPCION_CORTA_SIS",
                title: "Sistema",
                width: 120
            }, {
                field: "ESTADO",
                title: "Estado",
                width: 120
            }]
    }).data("kendoGrid");

}

function ActualizarTablaRoles() {
    var grid = $('#gridRoles').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}


function CargarComboSistemasIndex() {
    $("#ListaSistemas").kendoDropDownList({
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
    $("#ListaEstado").kendoDropDownList({
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