$(document).ready(function () {
    //alert(1);
    $(window).load(function () {

        gridHistoricoParteMensualMotor();

        $("#addNewParteAeronaveHelice").click(function () {

            var AERONAVEPA = $('#txtAeronave').val();


            var dataDetalleHistoParteMensualHelice = $("#gridHistoricoParteMensualHelice").data("kendoGrid");
            var itemDataHistoParteMensualHelice = dataDetalleHistoParteMensualHelice.dataItem(dataDetalleHistoParteMensualHelice.select());
            if (itemDataHistoParteMensualHelice != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataHistoParteMensualHelice.XHELICES_PA + '&Xindex=' + AERONAVEPA + '&Item=' + itemDataHistoParteMensualHelice.XITEM;
                var divModal = $(this).attr('data-div');
                var divContenedor = $(this).attr('data-contenedor');

                var seccionModal = ".seccionModal";
                var seccionContenedor = ".contenedor";

                if (divModal) {
                    seccionModal = "#" + divModal;
                }

                if (divContenedor) {
                    seccionContenedor = "#" + divContenedor;
                }

                $.ajax({
                    url: url,
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                });
            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }

        });

        $("#btnCancelarParteHelice").click(function () {

            if ($("#txtvalidacancelar").val().trim() == '0') {
                window.location = "/AeronaveParteMensualPADM/IndexParteAeronave";
            } else {
                window.location = "/AeronaveParteMensual/IndexParteAeronave";
            }

        });

    });
});

function gridHistoricoParteMensualMotor() {

    $("#gridHistoricoParteMensualHelice").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/HeliceParteMensualPA/ListarConsultaParteHelice",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ objAeronave: $('#txtAeronave').val(), page: options.page, pageSize: options.pageSize });
                
            }
        },
        schema: {
            data: "l_GENM_HELICE_AERONAVEPA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XHELICES_PA: { type: "string" },
                    NUMERO_SERIE: { type: "string" },
                    DESCRIPCION_FABRICANTE: { type: "string" },
                    DESCRIPCION_MODELO: { type: "string" },
                    DESCRIPCION_POSICION: { type: "string" },
                    XITEM: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridHistoricoParteMensualHelice").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [
            {
                field: "XHELICES_PA",
                width: 90,
                title: "ID_HELICE_AERONAVE_PA",
                hidden: true
            }, {
                field: "NUMERO_SERIE",
                title: "NÚMERO SERIE",
                width: 150
            }, {
                field: "DESCRIPCION_FABRICANTE",
                title: "FABRICANTE",
                width: 150
            }, {
                field: "DESCRIPCION_MODELO",
                title: "MODELO",
                width: 150
            }, {
                field: "DESCRIPCION_POSICION",
                title: "POSICIÓN",
                width: 150
            }, {
                field: "XITEM",
                title: "ITEM",
                hidden: true
            }
        ]
    }).data("kendoGrid");

}
