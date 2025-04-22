$(document).ready(function () {
    gridPlanVigilanciaAnual();
    $("#btnDetallePlanVigilanciaAnual").click(function () {
        var url = $(this).attr("data-url");
        var gridData = $("#gridPlanVigilanciaAnual").data("kendoGrid");
        var itemData = gridData.dataItem(gridData.select());
        if (itemData != null) {
            actionRequestGet(url, "Index=" + itemData.XID_PLAN_VIGILANCIA_DS);
        }
        else {
            bootbox.alert("Seleccione un registro!");
        }
    });
    $("#btnPlanificacionPlanVigilanciaAnual").click(function () {
        var url = $(this).attr("data-url");
        var gridData = $("#gridPlanVigilanciaAnual").data("kendoGrid");
        var itemData = gridData.dataItem(gridData.select());
        if (itemData != null) {
            actionRequestGet(url, "XID_PLAN_VIGILANCIA_DS=" + itemData.XID_PLAN_VIGILANCIA_DS)
        }
        else {
            bootbox.alert("Seleccione un registro!");
        }
    });
    $("#btnRegistroInspeccion").click(function () {
        var url = $(this).attr("data-url");
        var gridData = $("#gridPlanVigilanciaAnual").data("kendoGrid");
        var itemData = gridData.dataItem(gridData.select());
        if (itemData != null) {
            actionRequestGet(url, "Index=" + itemData.XID_PLAN_VIGILANCIA_DS)
        }
        else {
            bootbox.alert("Seleccione un registro!");
        }
    });
});
function gridPlanVigilanciaAnual() {
    $("#gridPlanVigilanciaAnual").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/PlanVigilanciaAnualOps/ConsultaPlanVigilanciaAnual",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_Genm_PlanVigilancia_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_PLAN_VIGILANCIA_DS: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    XFLG_ESTADO: { type: "string" },
                    DESCRIPCION_ANO: { type: "string" },
                    DESCRIPCION_ESTADO: { type: "string" },
                    FECHA_LIMITE_MODIFICACION: { type: "date" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridPlanVigilanciaAnual").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [
            {
                field: "XID_PLAN_VIGILANCIA_DS",
                hidden: true
            }, {
                field: "DESCRIPCION_ANO",
                title: "AÑO",
                flex: 1
            }, {
                field: "FECHA_LIMITE_MODIFICACION",
                title: "FECHA LIMITE",
                template: '#= kendo.toString(FECHA_LIMITE_MODIFICACION, "dd/MM/yyyy" ) #',
                flex: 1
            }, {
                field: "DESCRIPCION_ESTADO",
                title: "ESTADO",
                flex: 1
            }]
    }).data("kendoGrid");

}