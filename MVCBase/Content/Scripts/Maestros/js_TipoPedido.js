$(document).ready(() => {

    var gridTipoPedido = $("#gridTipoPedido");
    gridTipoPedido.html('');
    var gridListEmpaque = $("#gridTipoEmpaque");
    var gridTipopedido = new AdminGrid($('#gridTipoPedido'));
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoPedido/paginados",
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
                    descripcion: $("#frmListTipoPedido").find("input[id='descripcion']").val()
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

    gridTipoPedido.kendoGrid({
        dataSource: dataSource,
        toolbar: kendo.template($("#templateTipoPedido").html()),
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
            { field: "Descripcion", title: "Tipo Empaque", width: "30%" },
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
                width: "15%"
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
                width: "15%"
            },
            
        ],
        change: function (e) {
            var grd = $(gridTipoPedido).data("kendoGrid");
            var item = grd.dataItem(grd.select());
            if (item != null) {
                if (item.Using_Estilo == 0 && item.Using_DCPO == 0) {
                    if (item.Estado == "I") {
                        $("#btnReactivar").removeAttr("disabled");
                        $("#btnEliminar").attr("disabled", "disabled");
                        $("#btnActualizar").attr("disabled", "disabled");
                    }
                    else {
                        $("#btnReactivar").attr("disabled", "disabled");
                        $("#btnActualizar").removeAttr("disabled");
                        $("#btnEliminar").removeAttr("disabled");
                    }
                } else {
                    $("#btnReactivar").attr("disabled", "disabled");
                    $("#btnActualizar").attr("disabled", "disabled");
                    $("#btnEliminar").attr("disabled", "disabled");
                }

                getDataEmpaque(item.SerialKey)
            }
         
        }
    }).data("kendoGrid");
    getDataEmpaque('');

    $("#btnSearch").on('click', function (e) {
        gridTipopedido.refresh();
        getDataEmpaque('');
    });


    $("#frmListTipoPedido").find("input[id='descripcion']").on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            gridTipopedido.refresh();
            getDataEmpaque('');
            gridListEmpaque.data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $("#btnRegistro").on('click', function (e) {
        var SerialKey = '';
        BootstrapDialog.show({
            title: 'Manteimiento de Tipo de Pedidos',
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

                        var gridoMant = $("#gridTipoEmpaqueMant").data("kendoGrid");
                        var _vrData = gridoMant.dataSource._data;
                        var dataList = [];
                        if (_vrData != undefined && gridoMant != null) {
                            $.each(_vrData, function (index, item) {
                                dataList.push({
                                    IdTipoEmpaque: item.IdTipoEmpaque
                                });
                            });
                        }
                        $.ajax({
                            datatype: 'json',
                            url: '/TipoPedido/Insert',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                'Descripcion': $("#frmModelCrudTipoPedidoMant").find("input[id='descripcion']").val(),
                                'Abreviatura': $("#frmModelCrudTipoPedidoMant").find("input[id='abreviatura']").val(),
                                'ListTipoEmpaque': dataList
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

                                    gridTipopedido.refresh();
                                    getDataEmpaque('');
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
        var item = gridTipopedido.selectedItem();
        if (item != undefined) {
            if (item.Using_Estilo > 0 || item.Using_DCPO > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El registro no se puede actualizar porque se esta usando en un Pedido/Estilo o DCPO`,
                });
                return;
            }
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
                title: 'Manteimiento de Tipo de Pedidos',
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

                            var gridoMant = $("#gridTipoEmpaqueMant").data("kendoGrid");
                            var _vrData = gridoMant.dataSource._data;
                            var dataList = [];
                            if (_vrData != undefined && gridoMant != null) {
                                $.each(_vrData, function (index, item) {
                                    dataList.push({
                                        IdTipoEmpaque: item.IdTipoEmpaque
                                    });
                                });
                            }

                            var param = {
                                'Descripcion': $("#frmModelCrudTipoPedidoMant").find("input[id='descripcion']").val(),
                                'Abreviatura': $("#frmModelCrudTipoPedidoMant").find("input[id='abreviatura']").val(),
                                'ListTipoEmpaque': dataList
                            };
                            MethodPut("/TipoPedido/Update?key=" + serialKey, JSON.stringify(param), "application/json")
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
                                        gridTipopedido.refresh();
                                        getDataEmpaque('');
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

        var item = gridTipopedido.selectedItem();
        var serialKey = '';
        if (item != null) {

            if (item.Using_Estilo > 0 || item.Using_DCPO > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El registro no se puede Inactivar  porque se esta usando en un Pedido/Estilo o DCPO`,
                });
                return;
            }

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

                    MethodDelete("/TipoPedido/Delete?key=" + serialKey, null, "application/json")
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
                                gridTipopedido.refresh();
                                getDataEmpaque('');
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

        var item = gridTipopedido.selectedItem();
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

                    MethodDelete("/TipoPedido/Reactivar?key=" + serialKey, null, "application/json")
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
                                gridTipopedido.refresh();
                                getDataEmpaque('');
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

    function getDataEmpaque(key)
    {
        var gridEmpaque = $("#gridTipoEmpaque");
        gridEmpaque.html('');

        var dataSource = new kendo.data.DataSource({

            transport: {
                read: {
                    type: "POST",
                    url: "/TipoPedido/ListTiposEmpaquesByPedido",
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
                model: { fields: { Descripcion: { type: "string" } } }
            },

            serverPaging: false,
            serverFiltering: true,
            serverSorting: false,
            error: function (err) {
                console.log("Error FrontEnd :  :" + (err));
            }
        });

        gridEmpaque.kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            height: 250,
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
                { field: "Descripcion", title: "Tipo Empaque", width: "50%" },
            ]
        }).data("kendoGrid");
    }
});