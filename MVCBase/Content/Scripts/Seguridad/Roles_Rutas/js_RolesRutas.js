$(document).ready(function () {
    CargarComboRutasIndex();
    CargarComboRolesIndex();
    CargarComboEstadosIndex();
    CargarGridRolesRutas();

    $("#btnBuscarRolesRutas").click(function () {
        $('#gridRolesRutas').data('kendoGrid').dataSource.read();
        $('#gridRolesRutas').data('kendoGrid').refresh();
    });

    $("#btnGuardarRolesRutas").click(function () {
        BootstrapDialog.show({
            title: 'REGISTRAR',
            message: $('<div></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [{
                label: 'Cerrar',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                label: 'Registrar',
                icon: 'glyphicon glyphicon-save',
                action: function (dialog) {
                    if (validDatosRolesRutas()) {
                        var ROLES_RUTAS = {
                            ROLESKey: $('#frmRegistroRolesRutas :input[id="ROLESKey"]').val().trim(),
                            RUTASKey: $('#frmRegistroRolesRutas :input[id="RUTASKey"]').val().trim(),
                            ESTADO: $('#frmRegistroRolesRutas :input[id="ESTADO"]').val().trim()
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Roles_Rutas/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: ROLES_RUTAS }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorRolesRutas", "ulListaErrorRolesRutas", data.errores);
                                } else {
                                    ActualizarTablaRolesRutas();
                                    AlertMessage(data.result);
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                            });
                        dialog.close();
                    }
                }
            }]
        });
    });


    $("#btnEditarRolesRutas").click(function () {
        var data = $("#gridRolesRutas").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR',
                message: $('<div></div>').load(Enrutamiento($(this).attr('data-url'), "IndexRutas=" + item.RUTASKey + "&IndexRoles=" + item.ROLESKey)),
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                        label: ' Editar',
                        icon: 'glyphicon glyphicon-pencil',
                    action: function (dialog) {
                        if (validDatosRolesRutas()) {
                            var ROLES_RUTAS = {
                                ROLESKey: $('#frmEditarRolesRutas :input[id="ROLESKey"]').val().trim(),
                                RUTASKey: $('#frmEditarRolesRutas :input[id="RUTASKey"]').val().trim(),
                                ESTADO: $('#frmEditarRolesRutas :input[id="ESTADO"]').val().trim()
                            }
                            $.ajax({
                                datatype: 'json',
                                contentType: "application/json",
                                url: '/Roles_Rutas/Actualizar',
                                type: 'POST',
                                data: JSON.stringify({ entidad: ROLES_RUTAS }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data.error) {
                                        errorAddModelo("divErrorRolesRutas", "ulListaErrorRolesRutas", data.errores);
                                    } else {
                                        ActualizarTablaRolesRutas();
                                        AlertMessage(data.result);
                                    }
                                    desbloqObject();
                                }
                            }).fail(function (jqxhr, textStatus, error) {
                                var err = textStatus + ', ' + error;
                                console.log("Request Failed: " + err);
                                desbloqObject();
                                });
                            dialog.close();
                        }
                    }
                }]
            });
        }
        else {
            AlertMessage("Debe seleccionar el item que desea Editar.");
        }
    });

    function CargarGridRolesRutas() {
        $("#gridRolesRutas").html('');
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: "/Roles_Rutas/ListarPaginado",
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        ROLESKey: $('#frmIndexRolesRutas :input[id="ListaRoles"]').val(),
                        RUTASKey: $('#frmIndexRolesRutas :input[id="ListaRutas"]').val(),
                        ESTADO: $('#frmIndexRolesRutas :input[id="ListaEstado"]').val()
                    });
                }
            },
            schema: {
                data: "lista",
                total: "pageSize",
                type: 'json',
                model: {
                    fields: {
                        DESCRIPCION_ROL: { type: "string" },
                        DESCRIPCION_RUTA: { type: "string" },
                        ESTADO: { type: "string" },
                        RUTASKey: { type: "string" },
                        ROLESKey: { type: "string" }
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });
        console.log(dataSource);

        var grid = $("#gridRolesRutas").kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            pageable: true,
            selectable: "multiple",
            toolbar: kendo.template($("#templateRolesRutas").html()),
            noRecords: {
                template: '<br/> ' +
                    ' <div class="row"> ' +
                    ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                    ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                    ' NO SE ENCONTRARON REGISTROS ' +
                    ' </div> ' +
                    ' </div> ' +
                    ' </div>'
            },
            columns: [
                {
                    field: "DESCRIPCION_ROL",
                    title: "ROL",
                    width: 180
                }, {
                    field: "DESCRIPCION_RUTA",
                    title: "RUTA",
                    width: 120
                }, {
                    field: "ESTADO",
                    title: "ESTADO",
                    width: 120
                }]
        }).data("kendoGrid");

    }

    function ActualizarTablaRolesRutas() {
        var grid = $('#gridRolesRutas').data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    
    function CargarComboRutasIndex() {
        $("#ListaRutas").kendoDropDownList({
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


    function CargarComboRolesIndex() {
        $("#ListaRoles").kendoDropDownList({
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




    function validDatosRolesRutas() {
        var result = true;

        var ROLES = $("#ROLESKey").val();
        var RUTAS = $("#RUTASKey").val();
        var ESTADO = $("#ESTADO").val();

        if (ROLES == "") {
            $("#ROLESKey").data('kendoDropDownList').focus();
            return false;
        }

        else if (RUTAS == "") {
            $("#RUTASKey").data('kendoDropDownList').focus();
            return false;
        }

        else if (ESTADO == "") {
            $("#ESTADO").data('kendoDropDownList').focus();
            return false;
        }

        return result;
    }


})//End Ready

