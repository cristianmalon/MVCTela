$(document).ready(function () {
    var selectedItems = [];
    var idField = "IdVariable";
    $("#gridVariables").html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/VariablesCaja/VariablesAll",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: options.page,
                    pageSize: options.pageSize,
                    stringJoins: $("#frmIndexVariables").find("input[id='keys']").val(),
                    Descripcion: $("#frmIndexVariables").find("input[id='descripcion']").val()
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
                return data?.response.length;
            },
            type: 'json',
            model: {
                fields: {
                    Descripcion: { type: "string" }, 
                    Atributo: { type: "string" , editable: true },
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
    var ddlDataSource = [
        {
            Atributo: "",
            displayValue: "-- SELECCIONAR --"
        },
        {
            Atributo: "1",
            displayValue: "1"
        },
        {
            Atributo: "Varios",
            displayValue: "Varios"
        },
        {
            Atributo: "No Aplica",
            displayValue: "No Aplica"
        }
    ];
    var grid = $("#gridVariables").kendoGrid({
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
                field: "Descripcion",
                title: "Descripción",
                width: 100
            },
            {
                field: "Atributo",
                Title: "Atributo",
                width : 80,
                template: columnTemplateFunction
                
            }
        ],
        change: function (e, args) {
            var grid = e.sender;
            var items = grid.items();
            items.each(function (idx, row) {
                var idValue = grid.dataItem(row)?.IdVariable;
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
                var ddt = $(this).find('.dropDownTemplate');

                $(ddt).kendoDropDownList({
                    value: dataItem.Atributo,
                    dataSource: ddlDataSource,
                    dataTextField: "displayValue",
                    dataValueField: "Atributo",
                    change: onDDLChange
                });
                //dataItem.set("Atributo","1");
            });
            e.sender.select(itemsToSelect);
        },
    }).data("kendoGrid");
    function columnTemplateFunction(dataItem) {
        var input = '<input class="dropDownTemplate"/>'

        return input
    };
   
    function onDDLChange(e) {
        var element = e.sender.element;
        var row = element.closest("tr");
        var grid = $("#gridVariables").data("kendoGrid");
        var dataItem = grid.dataItem(row);
        dataItem.set("Atributo", e.sender.value());
    };
    $("#frmIndexVariables").find("input[id='descripcion']").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridVariables').data('kendoGrid').dataSource.read();
            $('#gridVariables').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");  
        }
        $("#frmIndexVariables").find("input[id='descripcion']").focus();
    });


    
});