$(document).ready(() => {

    var gridVariables = $("#gridVariables");
    gridVariables.html('');
   
    
    var gVariables = new AdminGrid($('#gridVariables'));

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/VariablesCaja/paginados",
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
                    descripcion: $("#frmListVariables").find("input[id='descripcion']").val()
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
                    IdVariable: { type: "number" },
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


    gridVariables.kendoGrid({
        dataSource: dataSource,
        toolbar: kendo.template($("#templateVariables").html()),
        pageable: true,
        sortable: true,
        resizable: true,
        reorderable: true,
        selectable: true,
        change: function (arg)
        {
            var item = gVariables.selectedItem();
            if (item != null) {
                if (item.Using_Estilo == 0 && item.Using_DCPO == 0) {
                    if (item.Estado == "I") {
                        $("#btnReactivar").removeAttr("disabled");
                        $("#btnEliminar").attr("disabled", "disabled");
                    }
                    else {
                        $("#btnReactivar").attr("disabled", "disabled");
                        $("#btnEliminar").removeAttr("disabled");
                    }
                } else {
                    $("#btnReactivar").attr("disabled", "disabled");
                    $("#btnActualizar").attr("disabled", "disabled");
                    $("#btnEliminar").attr("disabled", "disabled");
                }
            }
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
            { field: "RowNumber", title: "#", width: "5%" , filterable : false },
            { field: "Descripcion", title: "Variable", width: "80%" },
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
        ]
    }).data("kendoGrid");

    $("#btnSearch").on('click', function (e) {
        gVariables.refresh();
    });


    $("#frmListVariables").find("input[id='descripcion']").on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            gVariables.refresh();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $("#btnRegistro").on('click', function (e) {
        var SerialKey = '';
        BootstrapDialog.show({
            title: 'Mantenimiento de Variables',
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
                            url: '/VariablesCaja/InsertarVariables',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                'Descripcion': $("#frmModelCrudVaribles").find("input[id='descripcion']").val()
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

                                    gVariables.refresh();

                                    dialog.close();
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            Swal.fire({
                                icon: 'error',
                                title: 'SISTEMA',
                                text: `${error}`,
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
        var item = gVariables.selectedItem();
        if (item != undefined) {
            var serialKey = item.SerialKey;
            if (item.Using_Estilo > 0 || item.Using_DCPO > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El registro no se puede actualizar porque se esta usando en una configuración de caja`,
                });
                return;
            }
            BootstrapDialog.show({
                title: 'Mantenimiento de Variables',
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
                                'Descripcion': $("#frmModelCrudVaribles").find("input[id='descripcion']").val()
                            };
                            MethodPut("/VariablesCaja/Update?key=" + serialKey, JSON.stringify(param), "application/json")
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
                                        gVariables.refresh();
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

        var item = gVariables.selectedItem();
        var serialKey = '';
        if (item != null) {
            serialKey = item.SerialKey;

            if (item.Using_Estilo > 0 || item.Using_DCPO > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El registro no se puede Inactivar  porque se esta usando en una configuración de caja`,
                });
                return;
            }

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

                    MethodDelete("/VariablesCaja/Delete?key=" + serialKey, null, "application/json")
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
                                gVariables.refresh();
                               
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
                text: 'Debe de seleccionar un registro a Eliminar.',
            });
        }

        
    });

    $("#btnReactivar").on("click", (e) => {

        var item = gVariables.selectedItem();
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

                    MethodDelete("/VariablesCaja/Reactivar?key=" + serialKey, null, "application/json")
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
                                gVariables.refresh();

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

});