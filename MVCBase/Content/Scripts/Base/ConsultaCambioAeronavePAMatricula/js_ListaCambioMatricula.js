$(document).ready(function () {
    //alert(1);
    $(window).load(function () {
        $("#txtFechaDesde").kendoDatePicker();
        $("#txtFechaHasta").kendoDatePicker();


        // alert(2);
        
        gridHistoricoMatricula();
        
        $("#btnBuscarCambiosMatricula").click(function () {
            gridHistoricoMatricula();

        });

        $("#btnLimpiarCambiossMatricula").click(function () {
            $("#txtMatMotivo").val('');
            $("#txtMatMatriculaAnt").val('');
            $("#txtMatMatriculaAct").val('');
            $("#txtMatModalidad").val('');
            $("#txtFechaDesde").val('');
            $("#txtFechaHasta").val('');
            gridHistoricoMatricula();
        });

        $(".btnCancelarCambioMatricula").click(function () {
            window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
        });


        $("#addNewMatricula").click(function () {

            var situacionbandeja = $('#txtSituacionBandeja').val();
            var aeronavepa = $('#txtAeronave').val();

            
            if (situacionbandeja == 2)
            {
                var url = $(this).attr('data-url') + '?XAERONAVEPA=' + aeronavepa;
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
                bootbox.alert("No puede registrar un nuevo cambio de matrícula de la aeronave porque aún la empresa no ha enviado el nuevo registro de la aeronave");
            }

        });
        
        $("#addModifyMatricula").click(function () {

            var dataDetalleHistoMatricula = $("#gridHistoricoMatricula").data("kendoGrid");
            var itemDataHistoMatricula = dataDetalleHistoMatricula.dataItem(dataDetalleHistoMatricula.select());
            if (itemDataHistoMatricula != undefined) {

                
                var aeronavepa = $('#txtAeronave').val();

                var url = $(this).attr('data-url') + '?XAERONAVEPA=' + aeronavepa + '&INDEXCAMBIO=' + itemDataHistoMatricula.XCAMBIO_MATRICULA_PA;
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

function gridHistoricoMatricula() {

    $("#gridHistoricoMatricula").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConsultaCambioAeronavePAMatricula/ListarDataMatriculaPA",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objContRegistro: $('#txtContRegistro').val(), objMatriculaAnt: $('#txtMatMatriculaAnt').val(), objMatriculaAct: $('#txtMatMatriculaAct').val(), objProMotivo: $('#txtMatMotivo').val(), objModalidad: $('#txtMatModalidad').val(), objFechaDesde: $('#txtFechaDesde').val(), objFechaHasta: $('#txtFechaHasta').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_CAMBIOMATRICULA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XCAMBIO_MATRICULA_PA: { type: "string" },
                    XAERONAVEPA: { type: "string" },
                    XCONTREGISTRO: { type: "string" },
                    MATRICULA_ANTERIOR: { type: "string" },
                    MATRICULA_NUEVA: { type: "string" },
                    XDESCTIPOCAMBIOMATRI: { type: "string" },
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

    var grid = $("#gridHistoricoMatricula").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XCAMBIO_MATRICULA_PA",
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
                    field: "MATRICULA_ANTERIOR",
                    title: "MATRÍCULA ANTERIOR",
                    width: 180
                }, {
                    field: "MATRICULA_NUEVA",
                    title: "MATRÍCULA ACTUAL",
                    width: 180
                }, {
                    field: "XDESCTIPOCAMBIOMATRI",
                    title: "MODALIDAD",
                    width: 180
                }, {
                    field: "XDESCTIPOCAMBIO",
                    title: "DOCUMENTO INSCRIPCIÓN",
                    width: 200
                }, {
                    field: "NRO_TITULO",
                    title: "Nº DE TÍTULO",
                    width: 100
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
                    width: 170
                }, {
                    field: "XFECHA_VIGENCIA",
                    title: "FECHA VIGENCIA",
                    width: 150
                }
            ]
        }]
    }).data("kendoGrid");

}