$(document).ready(function () {
    CargarGridMotivo();

    $("#btnGuardarMotivo").click(function () {
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
                    var MOTIVO = {
                        IdMotivo: $('#frmRegistroMOTIVO').find('input[name="IdMotivo"]').val(),
                        Mot_Tipo: $('#frmRegistroMOTIVO').find('select[name="Mot_Tipo"]').val(),
                        Descripcion: $('#frmRegistroMOTIVO').find('input[name="Descripcion"]').val(),
                        ESTADO: $('#frmRegistroMOTIVO').find('select[name="ESTADO"]').val()
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Motivo/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: MOTIVO }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.error) {
                                errorAddModelo("divErrorMotivo", "ulListaErrorMotivo", data.errores);
                            } else {
                                ActualizarTablaMotivo();
                                dialog.close();
                            }
                            AlertMessage(data.mensaje);
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

    $("#btnEditarMotivo").click(function () {
        var data = $("#gridMotivos").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'Index=' + item.IdMotivo)),
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: ' Editar',
                    icon: 'glyphicon glyphicon-pencil',
                    action: function (dialog) {
                        var MOTIVO = {
                            IdMotivo: $('#frmRegistroMOTIVO').find('input[name="IdMotivo"]').val(),
                            Descripcion: $('#frmRegistroMOTIVO').find('input[name="Descripcion"]').val(),
                            Mot_Tipo: $('#frmRegistroMOTIVO').find('input[name="Mot_Tipo"]').val(),
                            ESTADO: $('#frmRegistroMOTIVO').find('select[name="ESTADO"]').val()
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/Motivo/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: MOTIVO }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.error) {
                                    errorAddModelo("divErrorMotivo", "ulListaErrorMotivo", data.errores);
                                } else {
                                    ActualizarTablaMotivo();
                                    dialog.close();
                                }
                                AlertMessage(data.mensaje);
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

})

function ActualizarTablaMotivo() {
    var grid = $('#gridMotivos').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarGridMotivo() {
    $("#gridMotivos").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Motivo/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize
                    //SISTEMAKey: $('#frmIndexROLES :input[id="ListaSistemas"]').val(),
                    //ESTADO: $('#frmIndexMOTIVOS :input[id="ListaEstado"]').val()
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    IdMotivo: { type: "string" },
                    Descripcion: { type: "string" },
                    Mot_Tipo: { type: "string" },
                    ESTADO: { type: "string" }
                }
            }
        },
        //pageSize: 10,
        //serverPaging: true,
        //serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridMotivos").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        toolbar: kendo.template($("#templateMotivos").html()),
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
                field: "IdMotivo",
                title: "Id",
                width: 180
            }, {
                field: "Descripcion",
                title: "Descripcion",
                width: 120
            }, {
                field: "Mot_Tipo",
                title: "Tipo Motivo",
                template: '<div align="center"> #if (Mot_Tipo == "1") {# Solicitud para Actualizar Configuración de DCPOs  #} else {# Solicitud Apertura Asociación de Pedidos/DCPOs #}# </div>',
                width: 120
            }
            , {
                field: "ESTADO",
                title: "Estado",
                template: '<div align= "center">#if(ESTADO == "A"){#<span style="color:green" class="fa fa-check-circle fa-2x">#} else {#<span style="color:red" class="fa fa-trash fa-2x"></span>#}#</div>',
                width: 120
            }]
    }).data("kendoGrid");

}
