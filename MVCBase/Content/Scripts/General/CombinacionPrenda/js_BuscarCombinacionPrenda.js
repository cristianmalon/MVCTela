$(document).ready(function () {

    CargarGridCombinacionPrenda();

    $("#OPBCCod").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaCombinacionPrenda();
            $(this).removeAttr("disabled");
            $("#OPBCCod").focus();
        }
    });

    $("#OPBDDes").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaCombinacionPrenda();
            $(this).removeAttr("disabled");
            $("#OPBDDes").focus();
        }
    });

    $("#btnGuardarCombinacionPrenda").click(function () {
        var CLIENTEKey = $("#frmIndexBuscarCombinacionPrenda :input[id='CLIENTEKey']").val();

        BootstrapDialog.show({
            title: 'AGREGAR COMBINACION',
            cssClass: 'size-wide-dialog-1000',
            message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'CLIENTEKey=' + CLIENTEKey)),
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            buttons: [{
                label: 'Cerrar',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                label: 'Registrar',
                icon: 'glyphicon glyphicon-save',
                action: function (dialog) {
                    var COMBINACION_PRENDA = {
                        CLIENTEKey: $('#frmRegistrarCombinacionPrenda').find('input[id="CLIENTEKey"]').val(),
                        EmpCCod: $('#frmRegistrarCombinacionPrenda').find('input[id="EmpCCod"]').val(),
                        OPBSEst: $('#frmRegistrarCombinacionPrenda').find('input[id="OPBSEst"]').val(),
                        OPBCCod: $('#frmRegistrarCombinacionPrenda').find('input[id="OPBCCod"]').val(),
                        OPBDMen: $('#frmRegistrarCombinacionPrenda').find('input[id="OPBDMen"]').val(),
                        OPBDDes: $('#frmRegistrarCombinacionPrenda').find('input[id="OPBDDes"]').val(),
                        ESTADO: "A"
                    }

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/CombinacionPrenda/Actualizar',
                        type: 'POST',
                        data: JSON.stringify({ entidad: COMBINACION_PRENDA }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorCombinacionPrenda", "ulListaErrorCombinacionPrenda", data.errores);
                            } else {
                                ActualizarTablaCombinacionPrenda();
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

    $("#btnEditarCombinacionPrenda").click(function () {
        var data = $("#gridCombinacionPrenda").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'EDITAR COMBINACION',
                cssClass: 'size-wide-dialog-1000',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'EmpCCod=' + item.EmpCCod + "&CLIENTEKey=" + item.CLIENTEKey + "&OPBCCod=" + item.OPBCCod)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: ' Editar',
                    icon: 'glyphicon glyphicon-pencil',
                    action: function (dialog) {
                        var COMBINACION_PRENDA = {
                            CLIENTEKey: $('#frmEditarCombinacionPrenda').find('input[id="CLIENTEKey"]').val(),
                            EmpCCod: $('#frmEditarCombinacionPrenda').find('input[id="EmpCCod"]').val(),
                            OPBSEst: $('#frmEditarCombinacionPrenda').find('input[id="OPBSEst"]').val(),
                            OPBCCod: $('#frmEditarCombinacionPrenda').find('input[id="OPBCCod"]').val(),
                            OPBDMen: $('#frmEditarCombinacionPrenda').find('input[id="OPBDMen"]').val(),
                            OPBDDes: $('#frmEditarCombinacionPrenda').find('input[id="OPBDDes"]').val(),
                            SerialKey: "X",
                            ESTADO: "A"
                        }
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/CombinacionPrenda/Actualizar',
                            type: 'POST',
                            data: JSON.stringify({ entidad: COMBINACION_PRENDA }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                console.log(data);
                                if (!data.rpta) {
                                    errorAddModelo("divErrorCombinacionPrenda", "ulListaErrorCombinacionPrenda", data.errores);
                                } else {
                                    ActualizarTablaCombinacionPrenda();
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
            AlertMessage("DEBE SELECCIONAR LA COMBINACION QUE DESEA EDITAR.");
        }
    });
    
});

function CargarGridCombinacionPrenda() {
    $("#gridCombinacionPrenda").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/CombinacionPrenda/ListarPaginado",
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function () {
                    bloquoteObject();
                },
                complete: function () {
                    desbloqObject();
                }
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    EmpCCod: $("#frmIndexBuscarCombinacionPrenda :input[id='EmpCCod']").val(),
                    OPBSEst: $("#frmIndexBuscarCombinacionPrenda :input[id='OPBSEst']").val(),
                    OPBCCod: $("#frmIndexBuscarCombinacionPrenda :input[id='OPBCCod']").val(),
                    OPBDDes: $("#frmIndexBuscarCombinacionPrenda :input[id='OPBDDes']").val(),
                    CLIENTEKey: $("#frmIndexBuscarCombinacionPrenda :input[id='CLIENTEKey']").val()
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    EmpCCod: { type: "string" },
                    CliCCod: { type: "CliCCod" },
                    OPBCCod: { type: "OPBCCod" },
                    OPBDDes: { type: "OPBDDes" },
                    OPBSEst: { type: "OPBSEst" },
                    OPBDMen: { type: "OPBDMen" }
                }
            }
        },
        pageSize: 15,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridCombinacionPrenda").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: {
            buttonCount: 5
        },
        selectable: true,
        toolbar: kendo.template($("#templateCombinacionPrenda").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE COMBINACIONES DE PRENDA ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "OPBCCod",
                title: "Codigo Combinacion",
                width: 200
            }, {
                field: "OPBDDes",
                title: "Nombre de la Combinacion de Prenda del Cliente",
                width: 800
            }]
    }).data("kendoGrid");

}

function ActualizarTablaCombinacionPrenda() {
    $('#gridCombinacionPrenda').data('kendoGrid').dataSource.read();
    $('#gridCombinacionPrenda').data('kendoGrid').refresh();
}
