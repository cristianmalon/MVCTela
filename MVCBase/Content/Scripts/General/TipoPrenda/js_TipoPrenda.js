$(document).ready(function () {

    $("#gridTipoPrenda").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoPrenda/Listar",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    eTipoPrenda: {
                        ESTADO: 'A'
                    }
                });
            }
        },
        schema: {
            data: function (response) {
                if (response.response == false)
                    console.log("Error BackEnd : " + response.message);
                else
                    return response.result;
            },
            total: "TotalRow",
            type: 'json',
            model: {
                fields: {
                    TPGNItm: { type: "number" },
                    TPGDDesG: { type: "string" },
                    SerialKey: { type: "string" },
                    
                }
            }
        },

        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + err);
        }
    });

    var grid = $("#gridTipoPrenda").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        sortable: true,       
        selectable: true,
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE TIPO PRENDA ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "TPGNItm",
                title: "Item",
                width: "100px"
            },
            {
                field: "TPGDDesG",
                title: "Tipo de Prenda",
                width: "500px"
            }
        ]
    }).data("kendoGrid");

});