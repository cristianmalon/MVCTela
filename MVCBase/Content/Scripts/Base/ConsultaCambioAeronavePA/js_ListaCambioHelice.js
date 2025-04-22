$(document).ready(function () {
    //alert(1);
    $(window).load(function () {
        

       
         

        gridHelices();
       // alert(2);
        $("#addHeliceSerie").click(function () {

            var contregistro = $('#txtContRegistro').val();

            var dataDetalleHelice = $("#gridHelices").data("kendoGrid");
            var itemDataHelice = dataDetalleHelice.dataItem(dataDetalleHelice.select());
            if (itemDataHelice != undefined) {

                var url = $(this).attr('data-url') + '?XHELICES=' + itemDataHelice.XHELICES_PA + '&XCONTREGISTRO=' + contregistro + '&Item=' + itemDataHelice.XITEM;
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

        $(".btnCancelarCambioHelice").click(function () {
            window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
        });

    });
});

function gridHelices() {

    $("#gridHelices").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConsultaCambioAeronavePA/ListarHelicesPA",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {                
                return JSON.stringify({ objAeronave: $('#txtAeronave').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_HELICESPA",
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

    var grid = $("#gridHelices").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XHELICES_PA",
                    width: 90,
                    title: "ID_HELICES_PA",
                    hidden: true
                }, {
                    field: "NUMERO_SERIE",
                    width: 150,
                    title: "NÚMERO SERIE"
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
        }]
    }).data("kendoGrid");

}