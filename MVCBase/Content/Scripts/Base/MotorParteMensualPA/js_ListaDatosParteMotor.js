$(document).ready(function () {
    //alert(1);
    $(window).load(function () {

        gridHistoricoParteMensualMotor();

        $("#addNewParteAeronaveMotor").click(function () {

            var AERONAVEPA = $('#txtAeronave').val();


            var dataDetalleHistoParteMensualMotor = $("#gridHistoricoParteMensualMotor").data("kendoGrid");
            var itemDataHistoParteMensualMotor = dataDetalleHistoParteMensualMotor.dataItem(dataDetalleHistoParteMensualMotor.select());
            if (itemDataHistoParteMensualMotor != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataHistoParteMensualMotor.XMOTOR_AERONAVE_PA + '&Xindex=' + AERONAVEPA + '&Item=' + itemDataHistoParteMensualMotor.XITEM;
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
        
        $("#btnCancelarParteMotor").click(function () {
            
            if ($("#txtvalidacancelar").val().trim() == '0')
            {
                window.location = "/AeronaveParteMensualPADM/IndexParteAeronave";
            } else {
                window.location = "/AeronaveParteMensual/IndexParteAeronave";
            }
            
        });

    });
});


function gridHistoricoParteMensualMotor() {

    $("#gridHistoricoParteMensualMotor").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/MotorParteMensualPA/ListarConsultaParteMotor",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {                
                return JSON.stringify({ objAeronave: $('#txtAeronave').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_MOTOR_AERONAVEPA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XMOTOR_AERONAVE_PA: { type: "string" },
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

    var grid = $("#gridHistoricoParteMensualMotor").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XMOTOR_AERONAVE_PA",
                    width: 90,
                    title: "ID_MOTOR_AERONAVE_PA",
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
        }]
    }).data("kendoGrid");

}

