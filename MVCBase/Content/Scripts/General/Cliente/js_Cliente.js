$(document).ready(function () {

    $("#gridCliente").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Cliente/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    eCliente: {
                        PageNumber: (options.page - 1),
                        pageSize: options.pageSize,
                        CliDDes: $('#frmIndexBuscarCliente :input[id="idBuscar"]').val(),
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
                    CliDDes: { type: "string" },
                    CliSClasi: { type: "string" },
                    CliSEst: { type: "string" },
                    CliCCod: { type: "string" },
                    SerialKey: { type: "string" },
                    TotalPage: { type: "number" }
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
    
    var grid = $("#gridCliente").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        sortable: true,
        pageable: true,
        selectable: true,
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE CLIENTES ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "CliCCod",
                title: "Codigo",
                width: 100
            },
            {
                field: "CliDDes",
                title: "Cliente",
                width: 300
            }
        ]
    }).data("kendoGrid");

    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridCliente').data('kendoGrid').dataSource.read();
            $('#gridCliente').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }
        
    });

});