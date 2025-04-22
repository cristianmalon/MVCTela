$(document).ready(function () {

    $("#gridColorPantone").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/SolicitudColor/ListarPaginadoColorPantoneSDC",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                var strTPHDDES = $('#frmIndexBuscarColorPantone :input[id="idBuscar"]').val();
                
                if ((strTPHDDES == '' || strTPHDDES == undefined)) {
                    strTPHDDES = "%";
                }
                console.log('Descripcion : ' + strTPHDDES);
                return JSON.stringify({
                    e_colorpantone: {
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        PNTDDes: strTPHDDES
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
                    PNTCCod: { type: "string" },
                    PNTCSig: { type: "string" },
                    PNTDDes: { type: "string" }
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

    var grid = $("#gridColorPantone").kendoGrid({
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
                field: "PNTCCod",
                title: "Nro",
                width: 60
            },
            {
                field: "PNTCSig",
                title: "Codigo",
                width: 120
            },
            {
                field: "PNTDDes",
                title: "Descripción",
                width: 200
            }
        ]
    }).data("kendoGrid");


    $("#idBuscar").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridColorPantone').data('kendoGrid').dataSource.read();
            $('#gridColorPantone').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscar").focus();
        }
    });
});

