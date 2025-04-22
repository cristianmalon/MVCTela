$(document).ready(function () {
    //alert(1);
    $(window).load(function () {
        $("#txtFechaDesde").kendoDatePicker();
        $("#txtFechaHasta").kendoDatePicker();

        
       // alert(2);

        gridHistoricoPropietario();
        
        $("#btnBuscarCambiosPropietario").click(function () {
            gridHistoricoPropietario();

        });

        $("#btnLimpiarCambiosPropietarios").click(function () {
            $("#txtProMotivo").val('');
            $("#txtProPropietarioAnt").val('');
            $("#txtProPropietarioAct").val('');
            $("#txtFechaDesde").val('');
            $("#txtFechaHasta").val('');
            gridHistoricoPropietario();
        });

        $(".btnCancelarCambioPropietario").click(function () {
            window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
        });

        
        $("#addNewPropietario").click(function () {

            var personajuridica = $('#txtPersonaJuridica').val();
            var aeronavepa = $('#txtAeronave').val();
            var situacionbandeja = $('#txtSituacionBandeja').val();

            if (situacionbandeja == 2)
            {

                var url = $(this).attr('data-url') + '?XPERSONAJURIDICA=' + personajuridica + '&XAERONAVEPA=' + aeronavepa;
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
                bootbox.alert("No puede registrar un nuevo cambio de propietario de la aeronave porque aún la empresa no ha enviado el nuevo registro de la aeronave");
            }
        });

        $("#addModifyPropietario").click(function () {

            var dataDetalleHistoPropietario = $("#gridHistoricoPropietario").data("kendoGrid");
            var itemDataHistoPropietario = dataDetalleHistoPropietario.dataItem(dataDetalleHistoPropietario.select());
            if (itemDataHistoPropietario != undefined) {

                var personajuridica = $('#txtPersonaJuridica').val();
                var aeronavepa = $('#txtAeronave').val();
            
                var url = $(this).attr('data-url') + '?XPERSONAJURIDICA=' + personajuridica + '&XAERONAVEPA=' + aeronavepa + '&INDEXCAMBIO=' + itemDataHistoPropietario.XCAMBIOPROPIETARIOPA;
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

       
    });
});

function gridHistoricoPropietario() {

    $("#gridHistoricoPropietario").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConsultaCambioAeronavePA/ListarDataPropietarioPA",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {                
                return JSON.stringify({ objContRegistro: $('#txtContRegistro').val(), objPropietarioAnt: $('#txtProPropietarioAnt').val(), objPropietarioAct: $('#txtProPropietarioAct').val(), objProMotivo: $('#txtProMotivo').val(), objFechaDesde: $('#txtFechaDesde').val(), objFechaHasta: $('#txtFechaHasta').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_CAMBIOPROPIETARIOPA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XCAMBIOPROPIETARIOPA: { type: "string" },
                    XAERONAVEPA: { type: "string" },
                    XCONTREGISTRO: { type: "string" },
                    XRAZON_ANTERIOR: { type: "string" },
                    XRAZON_NUEVA: { type: "string" },
                    XDESCTIPOCAMBIO: { type: "string" },
                    NRO_TITULO: { type: "string" },
                    DICTAMEN: { type: "string" },
                    TOMO: { type: "string" },
                    XFECHA_EXPEDICION: { type: "string" },
                    XFECHA_VIGENCIA: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridHistoricoPropietario").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XCAMBIOPROPIETARIOPA",
                    width: 90,
                    title: "ID_CAMBIO_PROPIETARIO_PA",
                    hidden: true
                }, {
                    field: "XAERONAVEPA",
                    width: 90,
                    title: "ID_AERONAVE_PA",
                    hidden: true
                }, {
                    field: "XCONTREGISTRO",
                    width: 90,
                    title: "ID_CONTREGISTRO",
                    hidden: true
                }, {
                    field: "XRAZON_ANTERIOR",
                    title: "PROPIETARIO ANTERIOR",
                    flex: 1
                }, {
                    field: "XRAZON_NUEVA",
                    title: "PROPIETARIO ACTUAL",
                    flex: 1
                }, {
                    field: "XDESCTIPOCAMBIO",
                    title: "DOCUMENTO INSCRIPCIÓN",
                    flex: 1
                }, {
                    field: "NRO_TITULO",
                    title: "Nº DE TÍTULO",
                    width: 150
                }, {
                    field: "DICTAMEN",
                    title: "PARTIDA",
                    width: 100
                }, {
                    field: "TOMO",
                    title: "TOMO",
                    width: 100
                }, {
                    field: "XFECHA_EXPEDICION",
                    title: "FECHA EXPEDICIÓN",
                    width: 200
                }, {
                    field: "XFECHA_VIGENCIA",
                    title: "FECHA VIGENCIA",
                    width: 150
                }
            ]
        }]
    }).data("kendoGrid");

}
