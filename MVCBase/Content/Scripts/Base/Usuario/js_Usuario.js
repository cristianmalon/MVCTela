$(function () {
    $("#grid_usuario").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Usuario/GetUsuarios?" + "LOGIN=&ID_PERFIL=",
        columns: [
            { data: "LOGIN" },
            { data: "FULLNAME_PERSONA_NATURAL" },
            { data: "DESCRIPCION_PERFIL" },
            {
                data: "FLAG_USUARIO_INTERNO", render: function (data, type, full, meta) {
                    return "<center>" + (data ? "Si" : "No") + "</center>";
                }
            },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_USUARIO", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Usuario/EditUsuario?ID_USUARIO=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_usuario").on("submit", function (e) {
        e.preventDefault();
        $("#grid_usuario").dataTable().fnReloadAjax("/Usuario/GetUsuarios?" + $(this).serialize());
    });
});

function ResetTextBox() {
    $("#ID_PERSONA_NATURAL").val(0);
    $("#FULLNAME_PERSONA_NATURAL").val("");
    $("#FULLNAME_PERSONA_NATURAL").prop("readonly", false);
}

function SaveUsuario(varId) {
    $.ajax({
        dataType: "json",
        url: "/Usuario/SaveUsuario",
        beforeSend: function (xhr, settings) {
            if ($("#ID_PERSONA_NATURAL").val() == 0) {
                $("#FULLNAME_PERSONA_NATURAL").val("");
            }
            settings.url = settings.url + "?" + $(varId).serialize();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divError", "ulListaError", data.errores);
            } else {
                window.location = data.url;
            }
        }
    });
}