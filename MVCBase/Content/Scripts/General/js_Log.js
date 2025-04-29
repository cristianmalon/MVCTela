$(document).ready(function () {
    
    $("#gridLog").html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/ConfiguracionCaja/ListLogWeb",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: options.page,
                    pageSize: options.pageSize,
                    SerialKey: $("#frmModelLogView").find("input[id='serialKey']").val()
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
                return data ?.response.length;
            },
            type: 'json',
            model: {
                fields: {
                    IdLog: { type: "number" },
                    Id: { type: "number" },
                    Estado: { type: "string" },
                    FECHA_REG: { type: "date" },
                    SUSUARIO_REG: { type: "string" },
                    HOST_REG: { type: "string" },
                }
            }
        },
        pageSize: 8,
        serverPaging: false,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + err);
        }
    });

    var grid = $("#gridLog").kendoGrid({
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
                field: "Estado",
                title: "Estado",
                width: "15%"
            },
            {
                field: "FECHA_REG",
                title: "Fecha",
                format: "{0: dd/MM/yyyy}",
                width: "15%"
            },
            {
                field: "FECHA_REG",
                title: "Hora",
                format: "{0:HH:mm:ss}",
                width: "12%"
            },
            {
                field: "SUSUARIO_REG",
                title: "Usuario.",
                width: "15%"
            },
            {
                field: "HOST_ACT",
                title: "Estación",
                width: "15%"
            },
        ],
    }).data("kendoGrid");

});