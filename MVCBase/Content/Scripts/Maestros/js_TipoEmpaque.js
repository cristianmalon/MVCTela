$(document).ready(() => {

    var gridTipoEmpaque = $("#gridTipoEmpaque");
    gridTipoEmpaque.html('');
   
    
    var gTipoempaque = new AdminGrid($('#gridTipoEmpaque'));

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoEmpaque/ListarTipoEmpaque",
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
                    descripcion: $("#frmListTipoEmpaque").find("input[id='descripcion']").val()
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
                    IdTipoEmpaque: { type: "number" },
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


    gridTipoEmpaque.kendoGrid({
        dataSource: dataSource,
        toolbar: kendo.template($("#templatePedidoComercial").html()),
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
            { field: "Descripcion", title: "Tipo Empaque", width: "80%" },
            {
                field: "Ratio",
                title: "Configura Ratio?",
                template: '<input type="checkbox" #= Ratio ? \'checked="checked"\' : "" # class="chkbx" disabled />',
                width: "15%"
            },
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
            }
            
        ],
        change: function (e) {
            var grd = $(gridTipoEmpaque).data("kendoGrid");
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

    $("#btnSearch").on('click', function (e) {
        gTipoempaque.refresh();
    });


    $("#frmListTipoEmpaque").find("input[id='descripcion']").on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            gTipoempaque.refresh();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $("#btnRegistro").on('click', function (e) {
        var SerialKey = '';
        BootstrapDialog.show({
            title: 'Manteimiento de Tipo de Empaques',
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
                        $.ajax({
                            datatype: 'json',
                            url: '/TipoEmpaque/InsertarTipoEmpaque',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                'Descripcion': $("#frmModelCrudTipoEmpaque").find("input[id='descripcion']").val(),
                                'Ratio': $("#frmModelCrudTipoEmpaque").find("input:checkbox[id='ratio']").is(":checked"),
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

                                    gTipoempaque.refresh();

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
        var item = gTipoempaque.selectedItem();
        if (item != undefined) {
            var serialKey = item.SerialKey;

            if (item.Using_Estilo > 0 || item.Using_DCPO > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El registro no se puede actualizar porque se esta usando en un Pedido/Estilo o DCPO`,
                });
                return;
            }


            BootstrapDialog.show({
                title: 'Manteimiento de Tipo de Empaques',
                type: BootstrapDialog.TYPE_WARNING,
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
                            var param = {
                                'Descripcion': $("#frmModelCrudTipoEmpaque").find("input[id='descripcion']").val(),
                                'Ratio': $("#frmModelCrudTipoEmpaque").find("input:checkbox[id='ratio']").is(":checked")
                            };
                            MethodPut("/TipoEmpaque/UpdateTipoEmpaque?key=" + serialKey, JSON.stringify(param), "application/json")
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
                                        gTipoempaque.refresh();
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

        var item = gTipoempaque.selectedItem();
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

                    MethodDelete("/TipoEmpaque/DeleteTipoEmpaque?key=" + serialKey, null, "application/json")
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
                                gTipoempaque.refresh();
                            }
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

                    $.ajax({
                        datatype: 'json',
                        url: '/TipoEmpaque/DeleteTipoEmpaque?key=' + serialKey,
                        type: 'DELETE',
                        contentType: "application/json",
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
                                    text: 'Registro Actualizado correctamente.',
                                });

                                gTipoempaque.refresh();

                                dialog.close();
                            }
                            desbloqObject();
                        }
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
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
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

});