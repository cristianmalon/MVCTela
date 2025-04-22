$(document).ready(function () {
    $("#btnFiltroListaInspeccionMes").click(function () {
        gridFiltroListaInspeccionMes();
    });
    $("#btnReProgramarInspeccion").click(function () {
        var grid = $("#gridFiltroListaInspeccionMes").data("kendoGrid");
        var itemData = grid.dataItem(grid.select());
        if (itemData != null) {
            bootbox.confirm("¿Segúro de reprogramar la inspección seleccionada?", function (result) {
                if (result) {
                    var url = $("#btnReProgramarInspeccion").attr('data-url');
                    modalAjaxRequestGet(url, "", "", "Index=" + itemData.XID_PLAN_VIGI_ANUAL_DS);
                }
            });
        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }
    });
    $("#btnHistoricoReprogramacion").click(function () {
        var grid = $("#gridFiltroListaInspeccionMes").data("kendoGrid");
        var itemData = grid.dataItem(grid.select());
        if (itemData != null) {

            var url = $("#btnHistoricoReprogramacion").attr('data-url');
            modalAjaxRequestGet(url, "", "", "Index=" + itemData.XID_PLAN_VIGI_ANUAL_DS);
        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }
    });
    $("#btnVerInspeccion").click(function () {
        var grid = $("#gridFiltroListaInspeccionMes").data("kendoGrid");
        var itemData = grid.dataItem(grid.select());
        if (itemData != null) {
            var url = $("#btnVerInspeccion").attr('data-url');
            modalAjaxRequestGet(url, "", "", "Index=" + itemData.XID_PLAN_VIGI_ANUAL_DS);
        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }
    });
    $("#btnAprobarInspeccion").click(function () {
        var grid = $("#gridFiltroListaInspeccionMes").data("kendoGrid");
        var itemData = grid.dataItem(grid.select());
        if (itemData != null) {
            bootbox.confirm("¿Segúro de aprobar la inspección seleccionada?", function (result) {
                if (result) {
                    var url = $("#btnAprobarInspeccion").attr('data-url');
                    $.ajax({
                        datatype: 'json',
                        url: url,
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            AprobarInspeccion: itemData.XID_PLAN_VIGI_ANUAL_DS
                        }),
                        beforeSend: function () {
                            bloquoteModal();
                        },
                        success: function (data) {
                            if (!data.rpta) {
                                errorAddModelo("divError", "ulListaError", data.errores);
                            } else {
                                $('#gridFiltroListaInspeccionMes').data('kendoGrid').dataSource.read();
                                $('#gridFiltroListaInspeccionMes').data('kendoGrid').refresh();
                            }
                            $("#btnFiltroPlanVigilanciaAnual").click();
                            desbloqModal();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                }
            });
        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }
    });
    $("#btnDesaprobarInspeccion").click(function () {
        var grid = $("#gridFiltroListaInspeccionMes").data("kendoGrid");
        var itemData = grid.dataItem(grid.select());
        if (itemData != null) {
            bootbox.confirm("¿Segúro de desaprobar la inspección seleccionada?", function (result) {
                if (result) {
                    var url = $("#btnDesaprobarInspeccion").attr('data-url');
                    bootbox.dialog({
                        title: "Desaprobar Inspección",
                        message: '<div class="row">  ' +
                            '<div class="col-md-12"> ' +
                            '<form class="form-horizontal"> ' +
                            '<div class="form-group"> ' +
                            '<label class="control-label asterisco" for="txtObservacion">Motivo de Desaprobación</label> ' +
                            '<div class="col-md-12"> ' +
                            ' <textarea class="form-control input-md" rows="5" id="txtObservacion"></textarea>' +
                            '</div> ' +
                            '</div>' +
                            '</form> </div>  </div>',
                        buttons: {
                            cancel: {
                                label: 'Cancelar',
                                className: 'btn-default btn-sm'
                            },
                            success: {
                                label: "Guardar",
                                className: "btn-primary btn-sm",
                                callback: function () {
                                    if ($.trim($("#txtObservacion").val()).length > 0) {
                                        $.ajax({
                                            datatype: 'json',
                                            url: url,
                                            type: 'POST',
                                            contentType: "application/json",
                                            data: JSON.stringify({
                                                DesaprobarInspeccion: itemData.XID_PLAN_VIGI_ANUAL_DS,
                                                Detalle: $.trim($("#txtObservacion").val())
                                            }),
                                            beforeSend: function () {
                                                bloquoteModal();
                                            },
                                            success: function (data) {
                                                if (!data.rpta) {
                                                    errorAddModelo("divError", "ulListaError", data.errores);
                                                } else {
                                                    $('#gridFiltroListaInspeccionMes').data('kendoGrid').dataSource.read();
                                                    $('#gridFiltroListaInspeccionMes').data('kendoGrid').refresh();
                                                }
                                                $("#btnFiltroPlanVigilanciaAnual").click();
                                                desbloqModal();
                                            }
                                        }).fail(function (jqxhr, textStatus, error) {
                                            var err = textStatus + ', ' + error;
                                            desbloqObject();
                                        });
                                    }
                                    else {
                                        bootbox.alert("Debe ingresar una observación");
                                        return false;
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }
    });
    $("#XID_MES_FILTRO_LISTA").kendoComboBox({
        placeholder: "[SELECCIONE]",
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

    $("#XID_TIPO_INSPECCION_FILTRO_LISTA").kendoComboBox({
        placeholder: "[SELECCIONE]",
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

    gridFiltroListaInspeccionMes();
});

function gridFiltroListaInspeccionMes() {
    $("#gridFiltroListaInspeccionMes").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/PlanVigilanciaAnualOps/ListaInspecionesMes",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {

                var o_T_Genm_Plan_Vigi_Anual_DS = {
                    XID_GIRO: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
                    XID_PERSONA_JURIDICA: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()),
                    XID_MES: $.trim($("#XID_MES_FILTRO_LISTA").data("kendoComboBox").value()),
                    XID_TIPO_INSPECCION: $.trim($("#XID_TIPO_INSPECCION_FILTRO_LISTA").data("kendoComboBox").value()),
                    XID_PLAN_VIGILANCIA_DS: $.trim($("#XID_PLAN_VIGILANCIA_DS").val()),
                    XID_ESTADO_PLAN_VIGI_ANUALDS: $.trim($("#XID_ESTADO_PLAN_VIGI_ANUALDS").val())
                };

                return JSON.stringify({ o_T_Genm_Plan_Vigi_Anual_DS: o_T_Genm_Plan_Vigi_Anual_DS, page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_Genm_Plan_Vigi_Anual_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_PLAN_VIGI_ANUAL_DS: { type: "string" },
                    XID_PLAN_VIGILANCIA_DS: { type: "string" },
                    XID_ANO: { type: "string" },
                    XID_DIRECCION_COORDINACION: { type: "string" },
                    XID_MES: { type: "string" },
                    XID_TIPO_LUGAR_DS: { type: "string" },
                    XID_ESTADO_PLAN_VIGI_ANUALDS: { type: "string" },
                    XID_TIPO_INSPECCION: { type: "string" },
                    DESCRIPCION_LUGAR: { type: "string" },
                    DESCRIPCION_MES: { type: "string" },
                    DESCRIPCION_INSPECCION: { type: "string" },
                    DESCRIPCION_ESTADO: { type: "string" },
                    XFLG_REPROGRAMADO: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridFiltroListaInspeccionMes").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "row",
        columns: [
            {
                field: "XID_PLAN_VIGI_ANUAL_DS",
                hidden: true
            }, {
                field: "XID_PLAN_VIGILANCIA_DS",
                hidden: true
            }, {
                field: "XID_ANO",
                hidden: true
            }, {
                field: "XID_DIRECCION_COORDINACION",
                hidden: true
            }, {
                field: "XID_MES",
                hidden: true
            }, {
                field: "XID_TIPO_LUGAR_DS",
                hidden: true
            }, {
                field: "XID_TIPO_INSPECCION",
                hidden: true
            }, {
                field: "XID_ESTADO_PLAN_VIGI_ANUALDS",
                hidden: true
            }, {
                field: "DESCRIPCION_MES",
                title: "MES",
                flex: 1
            }, {
                field: "DESCRIPCION_INSPECCION",
                title: "INSPECCION",
                flex: 1
            }, {
                field: "XFLG_REPROGRAMADO",
                title: "RE PROGRAMADO",
                flex: 1
            }, {
                field: "DESCRIPCION_ESTADO",
                title: "ESTADO",
                flex: 1
            }]
    }).data("kendoGrid");

}