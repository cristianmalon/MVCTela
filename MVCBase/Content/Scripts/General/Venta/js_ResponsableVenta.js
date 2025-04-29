$(document).ready(function () {


    $("#gridResponsableVenta").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/SolicitudColor/ListarPaginadoResponsableVenta",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                var strEplDNom = $('#frmIndexBuscarResponsableVenta :input[id="idBuscar"]').val();


                if ((strEplDNom == '' || strEplDNom == undefined)) {
                    strEplDNom = "%";
                }
                console.log('Descripcion : ' + strEplDNom);
                return JSON.stringify({
                    eResponsableVenta: {
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        EplDNom: strEplDNom
                        //ESTADO: 'A'
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
                    EplCCod: { type: "string" },
                    Descripción: { type: "string" }
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

    var grid = $("#gridResponsableVenta").kendoGrid({
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
                ' NO SE ENCONTRARON REGISTRO DE RESPONSABLES DE VENTA ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "EplCCod",
                title: "Codigo",
                width: 100
            },
            {
                field: "EplDNom",
                title: "Descripción",
                width: 300
            }
        ]
    }).data("kendoGrid");


    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridResponsableVenta').data('kendoGrid').dataSource.read();
            $('#gridResponsableVenta').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }
    });
});

