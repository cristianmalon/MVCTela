$(document).ready(() => {

    var gridConfiguracion = $("#gridConfiguracion");
    gridConfiguracion.html('');
    CargarSwitch();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConfiguracionCaja/paginados",
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function () {
                    bloquoteObject();
                },
                complete: function () {
                    desbloqObject();
                }
            },
            parameterMap: function (options) {
                return JSON.stringify({
                    PageNumber: options.page,
                    pageSize: options.pageSize,
                    TipoPedido: {
                        descripcion: $("#frmListConfiguracionCaja").find("input[id='descripcion']").val(),
                    },
                    Estado: $("#Estado").val()
                });
            }
        },
        schema: {
            data: function (data) {
                if (data.Success == false) {
                    console.log("Error BackEnd : ", data?.mensaje);
                }
                else {
                    return data.response;
                }
            },
            total: "TotalRecords",
            model: {
                fields: {
                    IdTipoPedido: { type: "number" },
                    Descripcion: { type: "string" },
                    FECHA_REG: { type: "date" },
                    SUSUARIO_REG: { type: "string" },
                    HOST_REG: { type: "string" },
                }
            }
        },
       
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + JSON.stringify(err));
        }
    });
    gridConfiguracion.kendoGrid({
        dataSource: dataSource,
        toolbar: kendo.template($("#templateConfiguracion").html()),
        pageable: true,
        sortable: true,
        resizable: true,
        reorderable: true,
        selectable: true,
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            { field: "RowNumber", title: "#", width: "5%" , filterable : false },
            { field: "TipoPedido.Descripcion", title: "Tipo Pedido", width: "20%" },
            { field: "TipoEmpaque.Descripcion", title: "Tipo Empaque", width: "20%" },
            {
                field: "FECHA_REG",
                title: "F.Creación",
                format: "{0: dd/MM/yyyy}",
                width: "15%"
            },
            {
                field: "FECHA_REG",
                title: "H.Creación",
                format: "{0:HH:mm:ss}",
                width: "12%"
            },
            {
                field: "SUSUARIO_REG",
                title: "Usuario C.",
                width: "15%"
            },
            {
                field: "HOST_ACT",
                title: "Estación",
                width: "15%"
            },
            {
                field: "Estado",
                title: "Estado",
                template: '<div align= "center">#if(Estado == "A"){#<span style="color:green" class="fa fa-check-circle fa-2x">#} else {#<span style="color:red" class="fa fa-trash fa-2x"></span>#}#</div>',
                width: "10%"
            },
            
        ],
        change: function (e) {
            var grd = $(gridConfiguracion).data("kendoGrid");
            var item = grd.dataItem(grd.select());
            if (item != null) {
                if (item.Estado == "I") {
                    $("#btnReactivar").removeAttr("disabled");
                    $("#btnEliminar").attr("disabled", "disabled");
                    $("#btnActualizar").attr("disabled", "disabled");
                    //$("#btnLog").attr("disabled", "disabled");
                }
                else {
                    $("#btnReactivar").attr("disabled", "disabled");
                    $("#btnActualizar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");
                    //$("#btnLog").removeAttr("disabled");
                }
                getDataVariables(item.SerialKey)
            }
         
        }
    }).data("kendoGrid");
    getDataVariables('');
    $("#btnSearch").on('click', function (e) {
        RefreshData(gridConfiguracion);
    });
    function RefreshData(datagrid)
    {
        datagrid.data('kendoGrid').dataSource.read();
        datagrid.data('kendoGrid').refresh();
        getDataVariables('');
    }

    $("#frmListConfiguracionCaja").find("input[id='descripcion']").on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            RefreshData(gridConfiguracion);
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $("#btnRegistro").on('click', function (e) {
        var SerialKey = '';
        BootstrapDialog.show({
            title: 'Configuración de Cajas',
            cssClass: 'size-wide-dialog-1000',
            type: BootstrapDialog.TYPE_SUCCESS,
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'key=' + SerialKey)),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: '&nbsp;Aceptar',
                    icon: 'fa fa-save',
                    cssClass: 'btn btn-success',
                    action: function (dialog) {

                        var gridoMant = $("#gridVariableMant").data("kendoGrid");
                        var _vrData = gridoMant.dataSource._data;
                        var dataList = [];
                        if (_vrData != undefined && gridoMant != null) {
                            $.each(_vrData, function (index, item) {
                                dataList.push({
                                    IdVariableCaja: item.IdVariable,
                                    Atributo: item.Atributo
                                });
                            });
                        }
                        $.ajax({
                            datatype: 'json',
                            url: '/ConfiguracionCaja/Insert',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                TipoPedido: {
                                    SerialKey : $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoPedido']").val()
                                },
                                TipoEmpaque: {
                                    SerialKey : $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoEmpaque']").val()
                                },
                                Observacion: $("#frmModelCrudConfiguracionCaja").find("textarea[id='observacion']").val(),
                                ListVariables: dataList
                            }),
                            beforeSend: function () {
                                bloquoteObject()
                            },
                            success: function (data) {
                                if (!data.Success) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'SISTEMA',
                                        text: `${data.mensaje}`,
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'SISTEMA',
                                        text: 'Registro insertado correctamete.',
                                    });

                                    RefreshData(gridConfiguracion);
                                    getDataVariables('');
                                    dialog.close();
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            Swal.fire({
                                icon: 'error',
                                title: 'SISTEMA',
                                text: `${data.error}`,
                            });
                            desbloqObject();
                            return false;
                        });
                    },
                    error: function (e) {
                        console.log("Error: :" , e)
                    }
                }
            ]
        });
    });

    $("#btnActualizar").on("click", function (e) {
        var grd = gridConfiguracion.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        if (item != undefined) {

            if (item.Estado == "I") {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El Registro a Actualizar esta Inactivo`,
                });
                return;
            }

            var serialKey = item.SerialKey;

            BootstrapDialog.show({
                title: 'Configuración de Cajas',
                type: BootstrapDialog.TYPE_WARNING,
                cssClass: 'size-wide-dialog-1000',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'key=' + serialKey)),
                buttons: [
                    {
                        label: 'Cerrar',
                        action: function (dialog) {
                            dialog.close();
                        }
                    },
                    {
                        label: '&nbsp;Aceptar',
                        icon: 'fa fa-save',
                        cssClass: 'btn btn-warning',
                        action: function (dialog) {

                            var gridoMant = $("#gridVariableMant").data("kendoGrid");
                            var _vrData = gridoMant.dataSource._data;
                            var dataList = [];
                            if (_vrData != undefined && gridoMant != null) {
                                $.each(_vrData, function (index, item) {
                                    dataList.push({
                                        IdVariableCaja: item.IdVariable,
                                        Atributo: item.Atributo
                                    });
                                });
                            }

                            var param = JSON.stringify({
                                TipoPedido: {
                                    SerialKey: $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoPedido']").val()
                                },
                                TipoEmpaque: {
                                    SerialKey: $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoEmpaque']").val()
                                },
                                Observacion: $("#frmModelCrudConfiguracionCaja").find("textarea[id='observacion']").val(),
                                ListVariables: dataList
                            });
                            MethodPut("/ConfiguracionCaja/Update?key=" + serialKey, param, "application/json")
                                .done(function (response) {
                                    if (!response.Success) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'SISTEMA',
                                            text: `${response.mensaje}`,
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'SISTEMA',
                                            text: 'Registro Actualizado correctamente.',
                                        });
                                        RefreshData(gridConfiguracion);
                                        getDataVariables('');
                                        dialog.close();
                                    }
                                    desbloqObject();
                                }).fail(function (jqxhr, textStatus, error) {
                                    var err = textStatus + ', ' + error;
                                    if (jqxhr.status != 404) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'SISTEMA',
                                            text: `${err}`,
                                        });
                                    }

                                    desbloqObject();
                                    return false;
                                });
                           
                        },
                        error: function (e) {
                            console.log("Error: :", e)
                        }
                    }
                ]
            });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Actualizar.',
            });
        }
    });

    $("#btnCopia").on("click", function (e) {
        var grd = gridConfiguracion.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        if (item != undefined) {

            if (item.Estado == "I") {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El Registro a Copiar esta Inactivo`,
                });
                return;
            }

            var serialKey = item.SerialKey;

            BootstrapDialog.show({
                title: 'Configuración de Cajas',
                type: BootstrapDialog.TYPE_INFO,
                cssClass: 'size-wide-dialog-1000',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'key=' + serialKey)),
                buttons: [
                    {
                        label: 'Cerrar',
                        action: function (dialog) {
                            dialog.close();
                        }
                    },
                    {
                        label: '&nbsp;Aceptar',
                        icon: 'fa fa-save',
                        cssClass: 'btn btn-warning',
                        action: function (dialog) {

                            var gridoMant = $("#gridVariableMant").data("kendoGrid");
                            var _vrData = gridoMant.dataSource._data;
                            var dataList = [];
                            if (_vrData != undefined && gridoMant != null) {
                                $.each(_vrData, function (index, item) {
                                    dataList.push({
                                        IdVariableCaja: item.IdVariable,
                                        Atributo: item.Atributo
                                    });
                                });
                            }

                            var param = JSON.stringify({
                                TipoPedido: {
                                    SerialKey: $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoPedido']").val()
                                },
                                TipoEmpaque: {
                                    SerialKey: $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoEmpaque']").val()
                                },
                                Observacion: $("#frmModelCrudConfiguracionCaja").find("textarea[id='observacion']").val(),
                                ListVariables: dataList
                            });
                            MethodPost("/ConfiguracionCaja/Insert" , param, "application/json")
                                .done(function (response) {
                                    if (!response.Success) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'SISTEMA',
                                            text: `${response.mensaje}`,
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'SISTEMA',
                                            text: 'Registro Actualizado correctamente.',
                                        });
                                        RefreshData(gridConfiguracion);
                                        getDataVariables('');
                                        dialog.close();
                                    }
                                    desbloqObject();
                                }).fail(function (jqxhr, textStatus, error) {
                                    var err = textStatus + ', ' + error;
                                    if (jqxhr.status != 404) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'SISTEMA',
                                            text: `${err}`,
                                        });
                                    }

                                    desbloqObject();
                                    return false;
                                });

                        },
                        error: function (e) {
                            console.log("Error: :", e)
                        }
                    }
                ]
            });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Actualizar.',
            });
        }
    });

    $("#btnEliminar").on("click", (e) => {

        var grd = gridConfiguracion.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        var serialKey = '';
        if (item != null) {
            serialKey = item.SerialKey;
            Swal.fire({
                title: 'SISTEMA',
                text: "¿Desea Eliminar el Registro?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {

                    MethodDelete("/ConfiguracionCaja/Delete?key=" + serialKey, null, "application/json")
                        .done(function (response) {
                            if (!response.Success) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: `${response.mensaje}`,
                                });
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'SISTEMA',
                                    text: 'Registro Eliminado correctamente.',
                                });
                                RefreshData(gridConfiguracion);
                                getDataVariables('');
                            }
                            desbloqObject();
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            if (jqxhr.status != 404) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'SISTEMA',
                                    text: `${err}`,
                                });
                            }

                            desbloqObject();
                            return false;
                        });

             
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Actualizar.',
            });
        }

        
    });

    $("#btnReactivar").on("click", (e) => {

        var grd = gridConfiguracion.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        var serialKey = '';
        if (item != null) {
            serialKey = item.SerialKey;
            Swal.fire({
                title: 'SISTEMA',
                text: "¿Desea Reactivar el Registro?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {

                    MethodDelete("/ConfiguracionCaja/Reactivar?key=" + serialKey, null, "application/json")
                        .done(function (response) {
                            if (!response.Success) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: `${response.mensaje}`,
                                });
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'SISTEMA',
                                    text: 'Registro Reactivado correctamente.',
                                });
                                RefreshData(gridConfiguracion);
                                getDataVariables('');
                            }
                            desbloqObject();
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            if (jqxhr.status != 404) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'SISTEMA',
                                    text: `${err}`,
                                });
                            }

                            desbloqObject();
                            return false;
                        });

                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Reactivar.',
            });
        }


    });

    $("#btnLog").on('click', function (e) {
        var SerialKey = '';
        var grd = gridConfiguracion.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        if (item == undefined || item == null) {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Revisar Auditoria.',
            });
            return;
        }

        BootstrapDialog.show({
            title: 'Auditoria de Configuración de Caja',
            type: BootstrapDialog.TYPE_DANGER,
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey)),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }
            ]
        });
    });

    $("#btnView").on("click", function (e) {
        var grd = gridConfiguracion.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        if (item != undefined) {

            var serialKey = item.SerialKey;

            BootstrapDialog.show({
                title: 'Configuración de Cajas',
                type: BootstrapDialog.TYPE_DEFAULT,
                cssClass: 'size-wide-dialog-1000',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'key=' + serialKey)),
                buttons: [
                    {
                        label: 'Cerrar',
                        action: function (dialog) {
                            dialog.close();
                        }
                    },
                ]
            });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Consultar.',
            });
        }
    });

    $("#btnReporte").click(function () {
      window.open($(this).attr('data-url'), '_blank');
    });


    function getDataVariables(key)
    {
        var gridVariabelCrud = $("#gridVariableList");
        gridVariabelCrud.html('');

        var dataSource = new kendo.data.DataSource({

            transport: {
                read: {
                    type: "POST",
                    url: "/ConfiguracionCaja/ListVariabByCaja",
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        SerialKey: key
                    });
                }
            },
            schema: {
                data: function (data) {
                    if (data.Success == false)
                        console.log("Error BackEnd : ", data ?.mensaje);
                    else
                        return data.response;
                },
                type: 'json',
                model: {
                    fields: {
                        Descripcion: { type: "string" },
                        Atributo: { type: "string" }
                    }
                }
            },

            serverPaging: false,
            serverFiltering: true,
            serverSorting: false,
            error: function (err) {
                console.log("Error FrontEnd :  :" + (err));
            }
        });


        gridVariabelCrud.kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            height: 250,
            noRecords: {
                template: '<br/> ' +
                    ' <div class="row"> ' +
                    ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                    ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                    ' NO SE ENCONTRARON REGISTROS' +
                    ' </div> ' +
                    ' </div> ' +
                    ' </div>'
            },
            columns: [
                { field: "Descripcion", title: "Variable", width: "50%" },
                { field: "Atributo", title: "Atributo", width: "50%" },
            ]
        }).data("kendoGrid");
    }


    function CargarSwitch() {
        $("#chkEstadoAnulado").kendoSwitch({
            checked: true,
            messages: {
                checked: "Si",
                unchecked: "No"
            },
            change: function (e) {
                if (e.checked) {
                    $("#Estado").val("A");
                } else {
                    $("#Estado").val("I");
                }
                RefreshData(gridConfiguracion);
            }
        });
    }
});

