$(document).ready(function () {

    $("#Precio").kendoNumericTextBox({
        culture: "en-US",
        decimals: 3,
        min: 0,
        value : 0,
        required: true,
        format: "c3",
        change: function (e) {
            if (e.sender.value() == null || e.sender.value() == undefined || e.sender.value() == '') {
                e.sender.value(0);
            }

            if ($("#idtodos").is(':checked')) {
                var grid = $("#gDataPrecioTallas").data("kendoGrid");
                var data = grid.dataSource._data;
                if (data != null && data.length > 0) {

                    $.each(data, function (index, item) {
                        item.Price = e.sender.value();
                    });

                    grid.dataSource.fetch()

                }

            }


        }
    });

    $("#idtodos").kendoSwitch({
        messages: {
            checked: "SI",
            unchecked: "NO"
        },
        checked: false,
        change: function (e)
        {
            if (e.checked) {
                var grid = $("#gDataPrecioTallas").data("kendoGrid");
                var data = grid.dataSource._data;
                if (data != null && data.length > 0) {
                    var num = Number($("#Precio").val())
                    $.each(data, function (index, item) {
                        item.Price = num;
                    });

                    grid.dataSource.fetch()

                }
            }
        }
    });

    var selectedItems = [];
    var idField = "IdVariable";
    $("#gDataPrecioTallas").html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/PedidoComercialTalla/ListarTallasDcpoByCombinacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    OPCCTipPC: $("#frmModalPrecioTalla").find("input[id='opcctippc']").val(),
                    OPCNAno: $("#frmModalPrecioTalla").find("input[id='opcnano']").val(),
                    OPCNNro: $("#frmModalPrecioTalla").find("input[id='opcnnro']").val(),
                    OPCNItemDsp: $("#frmModalPrecioTalla").find("input[id='opcnitemdsp']").val(),
                    DCPOPCNItemRC: $("#frmModalPrecioTalla").find("input[id='dcpopcnitemrc']").val(),
                    OPCNItemD: $("#frmModalPrecioTalla").find("input[id='opcnitemd']").val(),
                    OPCNCmb: $("#frmModalPrecioTalla").find("input[id='opcncmb']").val()
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
                return data ?.response?.length;
            },
            type: 'json',
            model: {
                fields: {
                    OPCDTalCli: { type: "string", editable : false },
                    Price: {
                        type: "number", editable: true, validation: {
                            required: true,
                            min: 0
                        }},
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

    var grid = $("#gDataPrecioTallas").kendoGrid({
        dataSource: dataSource,
        height: 350,
        sortable: true,
        pageable: true,
        reorderable: true,
        resizable: true,
        editable: true,
        navigatable: true,
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
                field: "OPCDTalCli",
                title: "Talla",
                width: 40
            },
            {
                field: "Price",
                Title: "Precio",
                template: '#= kendo.toString(Price, "c3","en-US") #',
                culture: "en-US",
                editor: numericEditor,
                width: 80,

            },

        ],
        //change: function (e, args) {
        //    var grid = e.sender;
        //    var items = grid.items();
        //    items.each(function (idx, row) {
        //        var idValue = grid.dataItem(row) ?.IdVariable;
        //        if (row.className.indexOf("k-state-selected") >= 0) {
        //            selectedItems[idValue] = true;
        //        } else if (selectedItems[idValue]) {
        //            delete selectedItems[idValue];
        //        }
        //    });
        //},
        //dataBound: function (e) {
        //    var grid = e.sender;
        //    var items = grid.items();
        //    var itemsToSelect = [];
        //    items.each(function (idx, row) {
        //        var dataItem = grid.dataItem(row);
        //        if (selectedItems[dataItem[idField]]) {
        //            itemsToSelect.push(row);
        //        }
        //        var ddt = $(this).find('.dropDownTemplate');

        //        $(ddt).kendoDropDownList({
        //            value: dataItem.Atributo,
        //            dataSource: ddlDataSource,
        //            dataTextField: "displayValue",
        //            dataValueField: "Atributo",
        //            change: onDDLChange
        //        });
        //        //dataItem.set("Atributo","1");
        //    });
        //    e.sender.select(itemsToSelect);
        //},
    }).data("kendoGrid");

    function numericEditor(container, options) {
        $('<input required data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                culture: "en-US",
                decimals: 3,
                min: 0,
                required : true,
                format: "c3",
                change: function (e)
                {
                    if (e.sender.value() == null || e.sender.value() == undefined || e.sender.value() == '') {
                        e.sender.value(0);
                    }
                }
            });
    }

    function columnTemplateFunction(dataItem) {
        var input = '<input class="dropDownTemplate"/>'

        return input
    };

    $("#frmIndexVariables").find("input[id='descripcion']").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gDataPrecioTallas').data('kendoGrid').dataSource.read();
            $('#gDataPrecioTallas').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
        }
        $("#frmIndexVariables").find("input[id='descripcion']").focus();
    });



});