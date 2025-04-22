var _SerialKey = $("#idfrmCotizacion :input[id='txtCliDDes']").val();

console.log('serialkey : ' + _SerialKey);
$(document).ready(function () {

    
    $("#gridMarcaCliente").html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/Cliente/ListarMarcaCliente",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    eCliente: {
                        PageNumber: ($('#frmIndexMarcaCliente :input[id="idBuscar"]').val() != '') ? 0 : ((options.page == 0) ? 0 : (options.page - 1)),
                        pageSize: options.pageSize,
                        ESTADO: 'A',
                        SerialKey: $("#idfrmCotizacion").find("input[id='hdCliCCod']").val(),
                        eMarcaCliente: {
                            MPdDDes: ($('#frmIndexMarcaCliente :input[id="idBuscar"]').val() == '') ? '%' : $('#frmIndexMarcaCliente :input[id="idBuscar"]').val(),
                        }
                        
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
                    MPdCCod: { type: "string" },
                    MPdDDes: { type: "string" },
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

    var grid = $("#gridMarcaCliente").kendoGrid({
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
                field: "eMarcaCliente.MPdCCod",
                title: "Codigo",
                width: 100
            },
            {
                field: "eMarcaCliente.MPdDDes",
                title: "Cliente",
                width: 300
            }
        ]
    }).data("kendoGrid");

    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridMarcaCliente').data('kendoGrid').dataSource.read();
            $('#gridMarcaCliente').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }

    });

});