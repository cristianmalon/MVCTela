$(document).ready(() => {

    var gridRatioCliente = $("#gridRatioCliente");
    gridRatioCliente.html('');
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Ratio/paginados",
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
                    CodCliente: $("#frmListRatioCliente").find("input[id='codcliente']").val()
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
            ////total: "TotalRecords",
            total: function (data) {
                return data.response ?.length ?? 0;
            },
            model: {
                fields: {
                    IdRatioCliente: { type: "number" },
                    FECHA_REG: { type: "date" },
                    SUSUARIO_REG: { type: "string" },
                    HOST_REG: { type: "string" },
                }
            }
        },
       
        //pageSize: 10,
        //serverPaging: true,
        //serverFiltering: true,
        //serverSorting: false,
        pageSize: 10,
        serverPaging: false,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + JSON.stringify(err));
        }
    });

    gridRatioCliente.kendoGrid({
        dataSource: dataSource,
        toolbar: kendo.template($("#templateRatioCliente").html()),
        height: 400,
        pageable: true,
        sortable: true,
        resizable: true,
        reorderable: true,
        selectable: true,
        filterable: {
            mode: "row"
        },
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
            {
                field: "RowNumber", title: "#", width: "25%",
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }
            },
            { field: "Cliente.CliDDes", title: "Cliente", width: "20%" ,filterable: false},
            { field: "TipoEmpaque.Descripcion", title: "Tipo Empaque", width: "20%", filterable: false},
            {
                field: "FECHA_REG",
                title: "F.Creación",
                format: "{0: dd/MM/yyyy}",
                width: "15%",
                filterable: false
            },
            {
                field: "FECHA_REG",
                title: "H.Creación",
                format: "{0:HH:mm:ss}",
                width: "12%",
                filterable: false
            },
            {
                field: "SUSUARIO_REG",
                title: "Usuario C.",
                width: "15%",
                filterable: false
            },
            {
                field: "HOST_ACT",
                title: "Estación",
                width: "15%",
                filterable: false
            },
            {
                field: "Estado",
                title: "Estado",
                template: '<div align= "center">#if(Estado == "A"){#<span style="color:green" class="fa fa-check-circle fa-2x">#} else {#<span style="color:red" class="fa fa-trash fa-2x"></span>#}#</div>',
                width: "10%",
                filterable: false
            },
            {
                field: "TotalRatios", title: "Total Ratios", width: "25%",
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }
            },
        ],
        change: function (e) {
            var grd = $(gridRatioCliente).data("kendoGrid");
            var item = grd.dataItem(grd.select());
            if (item != null) {
                if (item.Using_DCPO == 0) {
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
                }
                else {

                    $("#btnReactivar").attr("disabled", "disabled");
                    $("#btnActualizar").attr("disabled", "disabled");
                    $("#btnEliminar").attr("disabled", "disabled");

                }
                
                getDataTallasRatio(item.SerialKey)
                getOPSD(item.SerialKey);
            }
         
        }
    }).data("kendoGrid");

    getDataTallasRatio('');
    getOPSD('');

    $("#btnSearch").on('click', function (e) {
        RefreshData(gridRatioCliente);
    });

    function RefreshData(datagrid)
    {
        datagrid.data('kendoGrid').dataSource.read();
        datagrid.data('kendoGrid').refresh();
        getDataTallasRatio('');
        getOPSD('');
    }

    $("#btnRegistro").on('click', function (e) {
        var SerialKey = '';
        BootstrapDialog.show({
            title: 'Mantenimiento de Ratios',
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

                        var gridoMant = $("#gridRatioMant").data("kendoGrid");
                        var _vrData = gridoMant.dataSource._data;
                        var dataList = [];
                        if (_vrData != undefined && gridoMant != null) {
                            $.each(_vrData, function (index, item) {
                                console.log(item);
                                dataList.push({
                                    CodTalla: item.CodTalla,
                                    Alternativo: item.Alternativo,
                                    Orden: item.Orden,
                                    Ratio : item.Ratio
                                });
                            });
                        }
                        $.ajax({
                            datatype: 'json',
                            url: '/Ratio/Insert',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                TipoEmpaque: {
                                    SerialKey : $("#frmModelCrudRatioCliente").find("select[id='idCboTipoEmpaque']").val()
                                },
                                CodCliente: $("#frmModelCrudRatioCliente").find("input[id='codcliente']").val(),
                                ListDetalleRatio: dataList
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

                                    RefreshData(gridRatioCliente);
                                    getDataTallasRatio('');
                                    getOPSD('');
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
        var grd = gridRatioCliente.data("kendoGrid");
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
                title: 'Mantenimiento de Ratios',
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

                            var gridoMant = $("#gridRatioMant").data("kendoGrid");
                            var _vrData = gridoMant.dataSource._data;
                            var dataList = [];
                            if (_vrData != undefined && gridoMant != null) {
                                $.each(_vrData, function (index, item) {
                                    console.log(item);
                                    dataList.push({
                                        CodTalla: item.CodTalla,
                                        Alternativo: item.Alternativo,
                                        Orden: item.Orden,
                                        Ratio: item.Ratio
                                    });
                                });
                            }

                            var param = JSON.stringify({
                                TipoEmpaque: {
                                    SerialKey: $("#frmModelCrudRatioCliente").find("select[id='idCboTipoEmpaque']").val()
                                },
                                CodCliente: $("#frmModelCrudRatioCliente").find("input[id='codcliente']").val(),
                                ListDetalleRatio: dataList
                            });
                            MethodPut("/Ratio/Update?key=" + serialKey, param, "application/json")
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
                                        RefreshData(gridRatioCliente);
                                        getDataTallasRatio('');
                                        getOPSD('');
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

        var grd = gridRatioCliente.data("kendoGrid");
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

                    MethodDelete("/Ratio/Delete?key=" + serialKey, null, "application/json")
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
                                RefreshData(gridRatioCliente);
                                getDataTallasRatio('');
                                getOPSD('');
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

        var grd = gridRatioCliente.data("kendoGrid");
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

                    MethodDelete("/Ratio/Reactivar?key=" + serialKey, null, "application/json")
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
                                RefreshData(gridRatioCliente);
                                getDataTallasRatio('');
                                getOPSD('');
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
        var grd = gridRatioCliente.data("kendoGrid");
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
            title: 'Auditoria de Mantenimiento de Ratios',
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
        var grd = gridRatioCliente.data("kendoGrid");
        var item = grd.dataItem(grd.select());
        if (item != undefined) {

            var serialKey = item.SerialKey;

            BootstrapDialog.show({
                title: 'Mantenimiento de Ratios',
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

    $("#frmListRatioCliente").find("button[id='idbtnBuscarCliente']").on("click", function (e) {
        BootstrapDialog.show({
            title: 'Ayuda de Clientes Comercial',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridCliente").data("kendoGrid");
                        var item = data.dataItem(data.select());
                        if (item != undefined) {
                            $("#frmListRatioCliente").find("input[id='desccliente']").val(item.CliDDes);
                            $("#frmListRatioCliente").find("input[id='codcliente']").val(item.CliCCod);
                            dialog.close();
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'SISTEMA',
                                text: 'Debe de Seleccionar un Registro.',
                            });
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Cliente : [ " + e + " ]")
                    }
                }
            ]
        });
    })

    function getDataTallasRatio(key)
    {
        var gridTallasCrud = $("#gridTallas");
        gridTallasCrud.html('');

        var dataSource = new kendo.data.DataSource({

            transport: {
                read: {
                    type: "POST",
                    url: "/Ratio/ListDetalleByRatio",
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
        dataSource.aggregate([
            { field: "Ratio", aggregate: "sum" },
        ]);

        gridTallasCrud.kendoGrid({
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
                {
                    field: "Alternativo", title: "Tallas", width: "50%",
                    footerTemplate: "<span>Total</span>"
                },
                {
                    field: "Ratio", title: "Ratio", width: "50%",
                    footerTemplate: "#: sum #"
                },
            ]
        }).data("kendoGrid");
    }

    function getOPSD(key) {
        var gridOPSD = $("#gridOPSD");
        gridOPSD.html('');

        var dataSource = new kendo.data.DataSource({

            transport: {
                read: {
                    type: "POST",
                    url: "/Ratio/ListLogAsignacion",
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
                total: function (data) {
                    return data.response ?.length ?? 0;
                },
                model: {
                    fields: {
                        PC: { type: "string" },
                        OP: { type: "string" },
                        SD: { type: "string" }
                    }
                }
            },

            pageSize: 5,
            serverPaging: false,
            serverSorting: false,
            error: function (err) {
                console.log("Error FrontEnd :  :" + (err));
            }
        });
      
        gridOPSD.kendoGrid({
            dataSource: dataSource,
            pageable: true,
            sortable: true,
            resizable: true,
            reorderable: true,
            selectable: true,
            height: 200,
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
                {
                    field: "PC", title: "PC", width: "50%",
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains",
                            showOperators: false
                        }
                    },
                },
                {
                    field: "OP", title: "OP", width: "50%",
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains",
                            showOperators: false
                        }
                    },
                },
                {
                    field: "SD", title: "SD", width: "50%",
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains",
                            showOperators: false
                        }
                    },
                },
                
            ],
            filterable: {
                mode: "row"
            },

        }).data("kendoGrid");
    }
});