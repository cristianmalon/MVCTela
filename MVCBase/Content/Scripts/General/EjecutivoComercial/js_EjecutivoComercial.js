$(document).ready(function () {

    $("#gridData").html('');
    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/EjecutivoComercial/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    eEjecutivoCometial: {
                        PageNumber: ($('#frmIndexSolicitante :input[id="idBuscarNombre"]').val() != '') ? 0 : ((options.page == 0) ? 0 : (options.page - 1)),
                        pageSize: options.pageSize,
                        ESTADO: 'A',
                        eSolicitante: {
                            EplDNom: ($('#frmIndexEjecutivoComercial :input[id="idBuscarNombre"]').val() == '') ? '%' : $('#frmIndexSolicitante :input[id="idBuscarNombre"]').val(),
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
                    EplDNom: { type: "string" },
                    EplCCod: { type: "string" },
                    EplDCgo: { type: "string" }
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

    var grid = $("#gridData").kendoGrid({
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
                ' NO SE ENCONTRARON REGISTROS DE SOLICITANTES ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "eSolicitante.EplCCod",
                hidden: true
            }, {
                field: "eSolicitante.EplDNom",
                title: "Nombre",
                width: "200px"
            },
        ]
    }).data("kendoGrid");

    $("#idBuscarNombre").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridData').data('kendoGrid').dataSource.read();
            $('#gridData').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscarNombnre").focus();
        }
    });
});