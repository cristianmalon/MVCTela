$(document).ready(function () {
    CargarComboUsuariosIndex();
    CargarComboRolesIndex();
    CargarComboEstadosIndex();

    CargarGridUsuarioRoles();

    $("#btnBuscarUsuarioRoles").click(function () {
        $('#gridUsuarioRoles').data('kendoGrid').dataSource.read();
        $('#gridUsuarioRoles').data('kendoGrid').refresh();
    });

    $("#btnGuardarUsuarioRoles").click(function () {
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
                    if (validDatosUsuarioRoles()) {
                        var USUARIO_ROLES = {
                            USUARIOKey: $('#frmRegistroUsuarioRoles :input[id="USUARIOKey"]').val().trim(),
                            ROLESKey: $('#frmRegistroUsuarioRoles :input[id="ROLESKey"]').val().trim(),
                            ESTADO: $('#frmRegistroUsuarioRoles :input[id="ESTADO"]').val().trim()
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Usuario_Roles/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: USUARIO_ROLES }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorUsuarioRoles", "ulListaErrorUsuarioRoles", data.errores);
                                } else {
                                    ActualizarTablaUsuarioRoles();
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


    $("#btnEditarUsuarioRoles").click(function () {
        var data = $("#gridUsuarioRoles").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR',
                message: $('<div></div>').load(Enrutamiento($(this).attr('data-url'), "IndexUsuarios=" + item.USUARIOKey + "&IndexRoles=" + item.ROLESKey)),
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                        label: ' Editar',
                        icon: 'glyphicon glyphicon-pencil',
                    action: function (dialog) {
                        if (validDatosUsuarioRoles()) {
                            var USUARIO_ROLES = {
                                ROLESKey: $('#frmEditarUsuarioRoles :input[id="ROLESKey"]').val().trim(),
                                USUARIOKey: $('#frmEditarUsuarioRoles :input[id="USUARIOKey"]').val().trim(),
                                ESTADO: $('#frmEditarUsuarioRoles :input[id="ESTADO"]').val().trim()
                            }
                            $.ajax({
                                datatype: 'json',
                                contentType: "application/json",
                                url: '/Usuario_Roles/Actualizar',
                                type: 'POST',
                                data: JSON.stringify({ entidad: USUARIO_ROLES }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data.error) {
                                        errorAddModelo("divErrorUsuarioRoles", "ulListaErrorUsuarioRoles", data.errores);
                                    } else {
                                        ActualizarTablaUsuarioRoles();
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

    
    function CargarGridUsuarioRoles() {
        $("#gridUsuarioRoles").html('');
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: "/Usuario_Roles/ListarPaginado",
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        ROLESKey: $('#frmIndexUsuarioRoles :input[id="ListaRoles"]').val(),
                        USUARIOKey: $('#frmIndexUsuarioRoles :input[id="ListaUsuarios"]').val(),
                        ESTADO: $('#frmIndexUsuarioRoles :input[id="ListaEstado"]').val()
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
                        DESCRIPCION_USUARIO: { type: "string" },
                        ESTADO: { type: "string" },
                        ROLESKey: { type: "string" },
                        USUARIOKey: { type: "string" }
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });
        console.log(dataSource);

        var grid = $("#gridUsuarioRoles").kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            pageable: true,
            selectable: "multiple",
            toolbar: kendo.template($("#templateUsuarioRoles").html()),
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
                    field: "DESCRIPCION_USUARIO",
                    title: "USUARIO",
                    width: 120
                }, {
                    field: "DESCRIPCION_ROL",
                    title: "ROL",
                    width: 180
                }, {
                    field: "ESTADO",
                    title: "ESTADO",
                    width: 120
                }]
        }).data("kendoGrid");

    }

    function ActualizarTablaUsuarioRoles() {
        var grid = $('#gridUsuarioRoles').data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }

    
    function CargarComboUsuariosIndex() {
        $("#ListaUsuarios").kendoDropDownList({
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




    function validDatosUsuarioRoles() {
        var result = true;

        var ROLESKey = $("#ROLESKey").val();
        var USUARIOKey = $("#USUARIOKey").val();
        var ESTADO = $("#ESTADO").val();

        if (ROLESKey == "") {
            $("#ROLESKey").data("kendoDropDownList").focus();
            return false;
        }

        else if (USUARIOKey == "") {
            $("#USUARIOKey").data("kendoDropDownList").focus();
            return false;
        }

        else if (ESTADO == "") {
            $("#ESTADO").data("kendoDropDownList").focus();
            return false;
        }

        return result;
    }



})//EN READY

