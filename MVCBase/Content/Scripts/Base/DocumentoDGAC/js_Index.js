$(function () {
    $("#grid_pj").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        processing: true,
        serverSide: true,
        info: true,
        stateSave: true,
        ajax: {
            url: "/DocumentoDGAC/GetPersonaJuridicas",
            type: "GET"
        },
        columns: [
            { data: "NUMERO_CERTIFICADO" },
            { data: "RAZON_SOCIAL" },
            { data: "RUC" },
            { data: "NOMBRE_COMERCIAL" },
            {
                data: "FASE_CERTIFICACION", render: function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "ID_PERSONA_JURIDICA", render: function (data, type, full, meta) {
                    var ID_GIRO = full.ID_GIRO;
                    var ID_DIRECCION_MTC = full.ID_DIRECCION_MTC;
                    var ID_COORDINACION_TECNICA = full.ID_COORDINACION_TECNICA;
                    var RAZON_SOCIAL = full.RAZON_SOCIAL;
                    return '<button data-toggle="tooltip" data-placement="top" title="Ver Documentos" type="button" class="btn btn-default btn-xs modalMTC" data-url="/DocumentoDGAC/ShowDocumentos?ID_PERSONA_JURIDICA=' + data + '&ID_GIRO=' + ID_GIRO + '&ID_DIRECCION_MTC=' + ID_DIRECCION_MTC + '&ID_COORDINACION_TECNICA=' + ID_COORDINACION_TECNICA + '&RAZON_SOCIAL=' + RAZON_SOCIAL + '"><span class="glyphicon glyphicon-stats"></span></button> ' +
                        '<button data-toggle="tooltip" data-placement="top" title="Agregar Documento" type="button" class="btn btn-default btn-xs modalMTC" data-url="/DocumentoDGAC/NewDocumento?ID_PERSONA_JURIDICA=' + data + '&ID_GIRO=' + ID_GIRO + '&ID_DIRECCION_MTC=' + ID_DIRECCION_MTC + '&ID_COORDINACION_TECNICA=' + ID_COORDINACION_TECNICA + '"><span class="glyphicon glyphicon-floppy-open"></span></button>';
                }
            }
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $(nRow).find('[data-toggle="tooltip"]').tooltip();
        }
    });

    $("#form_pj").on("submit", function (e) {
        e.preventDefault();
        $("#grid_pj").dataTable().fnReloadAjax("/DocumentoDGAC/GetPersonaJuridicas?" + $(this).serialize());
    });
});