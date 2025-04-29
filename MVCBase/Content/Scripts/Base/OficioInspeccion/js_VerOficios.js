$(document).ready(function () {

 
    cargarVerOficios();
    $("#btnVisualizarOficios").click(function () {
        
    });
});

function cargarVerOficios() {

    $("#gridVerOficios").html('');

    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/OficioInspeccion/ListarVerOficios",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({  objInspeccionBase: $("#XINSPECCION_BASE").val().trim(), objInspeccion: $("#XINSPECCION").val().trim(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_GENM_VER_OFICIOS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_OFICIO_INSPECCION: { type: "string" },
                    XID_INSPECCION: { type: "string" },
                    XID_TIPO_INSPECCION: { type: "string" },
                    NUMERO_OFICIO_COMPLETO: { type: "string" },
                    XFECHA_OFICIO: { type: "string" },
                    NUMERO_OFICIO_REFERENCIA: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    
    var grid = $("#gridVerOficios").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_OFICIO_INSPECCION",
                title: "ID_OFICIO_INSPECCION",
                hidden: true
            },{
                field: "XID_INSPECCION",
                title: "ID_INSPECCION",
                hidden: true
            }, {
                field: "NUMERO_OFICIO_COMPLETO",
                title: "Nº OFICIO",
                width: 170
            }, {
                field: "XFECHA_OFICIO",
                title: "FECHA OFICIO",
                width: 170
            }, {
                field: "NUMERO_OFICIO_REFERENCIA",
                title: "Nº OFICIO REFERENCIA",
                width: 170
            }]
    }).data("kendoGrid");

}

$("#btnVisualizarOficios").click(function () {


    var dataVerOficios = $("#gridVerOficios").data("kendoGrid");
    var itemDataVerOficios = dataVerOficios.dataItem(dataVerOficios.select());
    if (itemDataVerOficios != undefined) {

        console.log(itemDataVerOficios.XID_OFICIO_INSPECCION);
        modalAjaxReporte("/OficioInspeccion/VerOficioReporte", { XID_OFICIO_INSPECCION: itemDataVerOficios.XID_OFICIO_INSPECCION, XID_TIPO_INSPECCION: itemDataVerOficios.XID_TIPO_INSPECCION });

    }
    else {
        bootbox.alert("Seleccione un oficio de la tabla!!!");
    }


});
