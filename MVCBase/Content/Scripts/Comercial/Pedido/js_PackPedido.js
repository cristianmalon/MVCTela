function onDataBinding(arg) {
    
    if (arg.action == "sync") {
        var grid = $('#gridPackPedido').data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }
}
$(document).ready(function () {    
    var contador = 0;
    $("#gridPackPedido").html('');
    var datos = {
        ePack: {
            EmpCCod: $("#frmindexPack").find("input[id='hdEmpCCod']").val(),
            OPCCTipPC: $("#frmindexPack").find("input[id='hdOPCCTipPC']").val(),
            OPCNAno: $("#frmindexPack").find("input[id='hdOPCNAno']").val(),
            OPCNNro: $("#frmindexPack").find("input[id='hdOPCNNro']").val(),
            OPCNItemDsp: $("#frmindexPack").find("input[id='hdOPCNItemDsp']").val(),
            ESTADO: 'A',
        }
    };
    var dataSource = new kendo.data.DataSource({
        
        transport: {
            read: {
                type: "POST",
                url: "/CotizacionPack/ListarPack",
                contentType: "application/json",
                dataType: 'json'
            },

            update: {
                type: "POST",
                url: "/CotizacionPack/Procesar",
                contentType: "application/json",
                dataType: 'json'
            },
            destroy: {
                type: "POST",
                url: "/CotizacionPack/Eliminar",
                contentType: "application/json",
                dataType: 'json'
            },
            create: {
                type: "POST",
                url: "/CotizacionPack/Procesar",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return  JSON.stringify({
                        eArrPack: options.models ,
                        ePack:{
                            
                            EmpCCod: $("#frmindexPack").find("input[id='hdEmpCCod']").val(),
                            OPCCTipPC: $("#frmindexPack").find("input[id='hdOPCCTipPC']").val(),
                            OPCNAno: $("#frmindexPack").find("input[id='hdOPCNAno']").val(),
                            OPCNNro: $("#frmindexPack").find("input[id='hdOPCNNro']").val(),
                            OPCNItemDsp: $("#frmindexPack").find("input[id='hdOPCNItemDsp']").val(),
                          
                            ESTADO: 'A',
                        },
                        ESTADO: 'A'
                    });
                }
                else {
                    return JSON.stringify({
                        ePack: {
                            EmpCCod: $("#frmindexPack").find("input[id='hdEmpCCod']").val(),
                            OPCCTipPC: $("#frmindexPack").find("input[id='hdOPCCTipPC']").val(),
                            OPCNAno: $("#frmindexPack").find("input[id='hdOPCNAno']").val(),
                            OPCNNro: $("#frmindexPack").find("input[id='hdOPCNNro']").val(),
                            OPCNItemDsp: $("#frmindexPack").find("input[id='hdOPCNItemDsp']").val(),
                            ESTADO: 'A',
                        },
                        ESTADO: 'A'
                    });
                }
            }
        },
        batch: true,
        pageSize: 20,
        serverPaging: false,
        serverFiltering: false,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + JSON.stringify(err));
        },
        schema: {
            type: 'json',
            data: function (response) {
              
                if (response.response == false) {
                    console.log("Error BackEnd : " + response.message);
                }
                else {
                    return response.result;
                }
            },
            model: {
                id: "OPCNItmPck",
                fields: {
                    OPCNItmPck: { type: "number", editable: false },
                    OPCDItmPck: { type: "number", editable: false, validation: { required: true } },
                    OPCQPck: { type: "number", editable: true, validation: { required: true } },
                    OPCQPza: { type: "number", editable: true, validation: { required: true } },
                }
            }
        }
    });

    var grid = $("#gridPackPedido").kendoGrid({
        dataSource: dataSource,
        dataBinding: onDataBinding,
        navigatable: true,
        pageable: true,
        sortable: true,
        toolbar: ["create"],
        noRecords: {
            template: '<br/> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "OPCNItmPck",
                title: "Item",
                width: 70
            },
            {
                field: "OPCDItmPck",
                title: "Ord. Clte.",
                width: 70
            },
            {
                field: "OPCQPck",
                title: "Nro de Packs",
                width: 100
            },
            {
                field: "OPCQPza",
                title: "Nro de Piezas",
                width: 100
            },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "120px" }
        ],
        editable: "inline",
    }).data("kendoGrid");
   
});