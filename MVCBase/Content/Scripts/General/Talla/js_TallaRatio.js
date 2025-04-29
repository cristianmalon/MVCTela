$(document).ready(function () {

    var selectedItems = [];
    var idField = 'TalNNroEdit';
    $("#gridTallasRatio").html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/Talla/Paginados",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    eTalla: {
                        PageNumber: ($('#frmSearchTallasRatios :input[id="descTalla"]').val() != '') ? 0 : ((options.page == 0) ? 0 : (options.page - 1)),
                        pageSize: options.pageSize,
                        ESTADO: 'A',
                        TalDDes: ($('#frmSearchTallasRatios :input[id="descTalla"]').val() == '') ? '%' : $('#frmSearchTallasRatios :input[id="descTalla"]').val(),
                    },
                    stringJoins: $('#frmSearchTallasRatios :input[id="keys"]').val()
                });
            }
        },
        schema: {
            data: function (data) {
                if (data.response == false) {
                    console.log("Error BackEnd : ", data ?.mensaje);
                }
                else {
                    return data.result;
                }
            },
            total: function (data) {
                return data ?.result.length;
            },
            type: 'json',
            model: {
                fields: {
                    TalNOrdEdit: { type: "number" },
                    TalDDes: { type: "string" },
                    TalDCod: { type: "string" },
                    blCheck: { type: "boolean" },
                    IntProporcion: { type: "number" },
                    BlIsTallaBase: { type: "boolean" },
                }
            }
        },
        pageSize: 15,
        serverPaging: false,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + err);
        }
    });

    var grid = $("#gridTallasRatio").kendoGrid({
        dataSource: dataSource,
        height: 400,
       
        pageable: true,
        
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
                field: "TalNOrdEdit",
                title: "Ord",
                width: "40px",
                editable: function (e) {
                    return false;
                },
            },
            {
                field: "TalDDesEdit",
                title: "Talla Camtex",
                editable: function (e) {
                    return false;
                },
                width: "100px",
            },
            {
                field: "TalDCodEdit",
                title: "Talla Cliente",
                width: "100px",
            },
            {
                field: "IntProporcion",
                title: "Ratio",
                width: "70px",
            }
        ],
        change: function (e, args) {
            var grid = e.sender;
            var items = grid.items();
            items.each(function (idx, row) {
                var idValue = grid.dataItem(row) ?.TalNNroEdit;
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
        editable: true
    }).data("kendoGrid");

    $("#frmSearchTallasRatios").find("input[id='descTalla']").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridTallasRatio').data('kendoGrid').dataSource.read();
            $('#gridTallasRatio').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#descTalla").focus();
        }

    });

});