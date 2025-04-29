$(document).ready(function () {
    $(window).load(function () {
        gridConsultaMatricula('');

        $("#verDatosInspeccion").click(function () {

            var url = $(this).attr('data-url');
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

        });
    });
});

function gridConsultaMatricula(dataTrenes) {
    $("#gridHistoricoMatricula").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: dataTrenes
        },
        height: 250,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XTRENES_PA",
                    hidden: true
                }, {
                    field: "XPOSICION_TRENES_PA",
                    hidden: true
                }, {
                    field: "XMODELO_PA",
                    hidden: true
                }, {
                    field: "XTIPO_TRENES_PA",
                    hidden: true
                }, {
                    field: "NUMERO_SERIE",
                    title: "Nº",
                    width: 50
                }, {
                    field: "NUMERO_PARTE",
                    title: "Matricula Actual",
                    width: 150
                }, {
                    field: "DESCRIPCION_TIPO",
                    title: "Matricula Anterior",
                    width: 150
                }, {
                    field: "DESCRIPCION_MODELO",
                    title: "Tipo de Inscripción",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Titulo",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Dictamen",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Tomo",
                    width: 150
                }
            ]
        }]
    });
}
