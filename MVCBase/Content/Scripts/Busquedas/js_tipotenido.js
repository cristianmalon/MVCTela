$(document).ready(function () {

    $("#gridTipoTenido").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/SolicitudColor/ListarTipoTenidoPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                var strTPHDDES = $('#frmIndexBuscarTipoTenido :input[id="idBuscar"]').val();
                if ((strTPHDDES == '' || strTPHDDES == undefined)) {
                    strTPHDDES = "%";
                }
                return JSON.stringify({
                    etipotenido: {
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        TelDDes: strTPHDDES
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
                    TphCCod: { type: "string" },
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

    var grid = $("#gridTipoTenido").kendoGrid({
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
                ' NO SE ENCONTRARON REGISTRO DE TIPO DE HILOS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "TelCCod",
                title: "Codigo",
                width: 100
            },
            {
                field: "TelDDes",
                title: "Descripción",
                width: 300
            }
        ]
    }).data("kendoGrid");


    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridTipoTenido').data('kendoGrid').dataSource.read();
            $('#gridTipoTenido').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }
    });
});

