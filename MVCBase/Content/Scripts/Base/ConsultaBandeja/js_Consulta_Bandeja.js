/*
$(document).ready(function () {
    cargarGridConsultaBandeja();

});

function cargarGridConsultaBandeja() {
    $("#gridConsultaBandeja").html('');

    $.ajax({
        datatype: 'json',
        url: '/ConsultaBandeja/ListarConsultaBandeja',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ objtxtRazonSocial: $('#txtRazonSocial').val(), objtxtMatricula: $('#txtMatricula').val(), objtxtSerie: $('#txtSerie').val(), objfiltro_Tipo_Aeronave: $('#filtro_Tipo_Aeronave').val(), objfiltro_Tipo_Servicio: $('#filtro_Tipo_Servicio').val() }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            //console.log(JsonResponse);

            var dataSource = new kendo.data.DataSource({
                batch: true,
                pageSize: 20,
                data: JsonResponse.l_GENM_CONSULBANDEJA
            });


            var grid = $("#gridConsultaBandeja").kendoGrid({

                dataSource: dataSource,
                pageable: true,
                selectable: "multiple",
                //dataBound: onDataBound,
                //height: 300,
                columns: [{
                            field: "XBANDEJA",
                            width: 90,
                            title: "ID_BANDEJA",
                            hidden: true
                        }, {
                            field: "XAERONAVE_PA",
                            width: 90,
                            title: "ID_AERONAVE_PA",
                            hidden: true
                        }, {
                            field: "XRAZONSOCIAL",
                            title: "RAZON SOCIAL",
                            flex: 1
                        }, {
                            field: "MATRICULA",
                            title: "MATRICULA",
                            flex: 1
                        }, {
                            field: "NUMERO_SERIE",
                            title: "SERIE",
                            flex: 1
                        }, {
                            field: "XCATEGORIAAERONAVE",
                            title: "CATEGORIA AERONAVE",
                            flex: 1
                        }, {
                            field: "XDESRAP",
                            flex: 1,
                            title: "RAP"
                        }]
            }).data("kendoGrid");

            //bind click event to the checkbox
            //grid.table.on("click", ".checkbox", selectRow);


        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });

}
*/