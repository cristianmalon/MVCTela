$(document).ready(function () {

    $("#gridTemporada").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/SolicitudColor/ListarPaginadoTemporada",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                var strTPHDDES = $('#frmIndexBuscarTemporada :input[id="idBuscar"]').val();


                if ((strTPHDDES == '' || strTPHDDES == undefined)) {
                    strTPHDDES = "%";
                }
                console.log('Descripcion : ' + strTPHDDES);
                return JSON.stringify({
                    eTemporada: {
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        TemDEsp: strTPHDDES
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

    var grid = $("#gridTemporada").kendoGrid({
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
                field: "TemCCod",
                title: "Codigo",
                width: 100
            },
            {
                field: "TemDEsp",
                title: "Descripción",
                width: 300
            }
        ]
    }).data("kendoGrid");


    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridTemporada').data('kendoGrid').dataSource.read();
            $('#gridTemporada').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }
    });
});

