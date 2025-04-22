$(document).ready(function () {


    $("#gridMotivoSDC").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/SolicitudColor/ListarPaginadoMotivoSDC",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                var strSCTDMot = $('#frmIndexBuscarMotivoSDC :input[id="idBuscar"]').val();


                if ((strSCTDMot == '' || strSCTDMot == undefined)) {
                    strSCTDMot = "%";
                }
                console.log('Descripcion : ' + strSCTDMot);
                return JSON.stringify({
                    eMotivoSDC: {
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        SCTDMot: strSCTDMot
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
                    SCTCMot: { type: "string" },
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

    var grid = $("#gridMotivoSDC").kendoGrid({
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
                ' NO SE ENCONTRARON REGISTRO DE MOTIVOS SDC ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "SCTCMot",
                title: "Codigo",
                width: 100
            },
            {
                field: "SCTDMot",
                title: "Descripción",
                width: 300
            }
        ]
    }).data("kendoGrid");


    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridMotivoSDC').data('kendoGrid').dataSource.read();
            $('#gridMotivoSDC').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }
    });
});

