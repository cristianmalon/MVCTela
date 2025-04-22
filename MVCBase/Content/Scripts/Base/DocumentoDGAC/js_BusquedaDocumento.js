$(function () {
    $("#grid_documento").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        processing: true,
        serverSide: true,
        info: true,
        stateSave: true,
        ajax: {
            url: "/BusquedaDocumento/GetDocumentos",
            type: "GET"
        },
        columns: [
            { data: "NOMENCLATURA" },
            { data: "DESCRIPCION" },
            { data: "DIRECCION_MTC" },
            { data: "COORDINACION_TECNICA" },
            { data: "GIRO" },
            { data: "PERSONA_JURIDICA" },
            { data: "FASE_DOCUMENTO" },
            {
                data: "ID_DOCUMENTO", render: function (data, type, full, meta) {
                    return '<a class="btn btn-default btn-xs" href="/DocumentoDGAC/DownloadDocumento?ID_DOCUMENTO=' + data + '" target="_blank"><span class="glyphicon glyphicon-download"></span></a>';
                }
            }
        ]
    });

    $("#form_documento").on("submit", function (e) {
        e.preventDefault();
        $("#grid_documento").dataTable().fnReloadAjax("/BusquedaDocumento/GetDocumentos?" + $(this).serialize());
    });
});