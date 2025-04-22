$(document).ready(function () {
    var selectedItems = [];
    var idField = "IdVariable";
    $("#gridCombinacionesDCPO").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/PedidoComercialDcpo/ListarDCPOCombosCopiar",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options) {
                return JSON.stringify({
                    PageNumber: options.page,
                    pageSize: options.pageSize,
                    SerialKey: $("#frmmodalcopiacombinaciones").find("input[id='serialkey']").val(),
                    Ratio: $("#frmmodalcopiacombinaciones").find("input[id='blratio']").val() == 'True' ? true : false,
                    OPCNItemD: $("#frmmodalcopiacombinaciones").find("select[id='idcbodcpo']").val()
                });
            }
        },
        schema: {
            data: function (data) {
                if (data.Success == false) {
                    console.log("Error BackEnd : ", data ?.mensaje);
                }
                else {
                    return data.response;
                }
            },
            total: function (data) {
                return data ?.response ?.length ?? 0;
            },
            type: 'json',
            model: {
                fields: {
                    OPCCmbCodCli: { type: "string" }, 
                    OPCCCmbDes: { type: "string" },
                }
            }
        },
        pageSize: 150,
        serverPaging: false,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + err);
        }
    });
  
    var grid = $("#gridCombinacionesDCPO").kendoGrid({
        dataSource: dataSource,
        height: 400,
        sortable: true,
        pageable: true,
        reorderable: true,
        resizable: true,
        noRecords: {
            template: '<br/> ' +
                ' <div> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                selectable: true,
                width: "50px"
            },
            {
                field: "OPCCmbCodCli",
                title: "Cod Combinación",
                width: 100
            },
            {
                field: "OPCCCmbDes",
                title: "Combinación",
                width: 100
            },
        ],
        change: function (e, args) {
            var grid = e.sender;
            var items = grid.items();
            items.each(function (idx, row) {
                var idValue = grid.dataItem(row) ?.OPCNItemD;
                if (row.className.indexOf("k-state-selected") >= 0) {
                    selectedItems[idValue] = true;
                } else if (selectedItems[idValue]) {
                    delete selectedItems[idValue];
                }
            });
        },
        dataBound: function (e) {
            var grid = e.sender;
            var items = grid.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
                var dataItem = grid.dataItem(row);
                if (selectedItems[dataItem[idField]]) {
                    itemsToSelect.push(row);
                }
            });
            e.sender.select(itemsToSelect);
        },
    }).data("kendoGrid");
   

    $("#frmmodalcopiacombinaciones").find("select[id='idcbodcpo']").change(function (e) {
        $('#gridCombinacionesDCPO').data('kendoGrid').dataSource.read();
        $('#gridCombinacionesDCPO').data('kendoGrid').refresh();
    });


    
});