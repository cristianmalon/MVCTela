$(document).ready(function () {

    gridFiltroListaInspeccionMes();

});

function gridFiltroListaInspeccionMes() {
    $("#gridHistorialReprogramaciones").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/PlanVigilanciaAnualAir/ListaHistorialReprogramaciones",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ Index: $.trim($("#XID_PLAN_VIGI_ANUAL_DS").val()) });
            }
        },
        schema: {
            data: "l_T_Genm_Plan_Vigi_Anual_DS",
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
                    XFLG_REPROGRAMADO: { type: "string" },
                    OBSERVACION_REPROGRAMADO: { type: "string" }
                }
            }
        },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridHistorialReprogramaciones").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
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
            }, {
                field: "OBSERVACION_REPROGRAMADO",
                title: "MOTIVO",
                flex: 1
            }]
    }).data("kendoGrid");

}