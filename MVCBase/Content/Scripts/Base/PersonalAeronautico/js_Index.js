function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}

var ajaxGrid = function () {
    var initialize = function () {
        var container = $("#ajaxDiv").html("<div></div>");
        var grid = $("div", container);

        var columnOptions = [
            { field: "XID_PERSONAL_AERONAUTICO", hidden: true },
            { field: "DESC_TIPO_DOCUMENTO", title: "Tipo Doc." },
            { field: "NUMERO_DOCUMENTO", title: "Nº Documento" },
            { field: "NOMBRE_COMPLETO", title: "Persona" },
            { field: "XFECHA_NACIMIENTO", title: "Fec. de Nac" },
            { field: "DESC_TIPO_GENERO", title: "Sexo" },
            { field: "FLG_ESTADO", title: "Activo?", template: '<input type="checkbox" #= FLG_ESTADO ? "checked=checked" : "" # disabled="disabled" ></input>' }
        ];

        var gridOptions = {
            dataSource: {
                transport: {
                    read: {
                        url: "/PersonalAeronautico/ListarPersonalAeronautico",
                        type: "GET",
                        data: function () {
                            return {
                                ID_TIPO_DOCUMENTO: $('#ID_TIPO_DOCUMENTO').val(),
                                NUMERO_DOCUMENTO: $('#NUMERO_DOCUMENTO').val(),
                                APELLIDOS: $("#APELLIDOS").val(),
                                NOMBRE_COMPLETO: $('#NOMBRE_COMPLETO').val(),
                                ID_PERSONA_JURIDICA: $('#ID_PERSONA_JURIDICA').val(),
                                ID_TIPO_FUNCION: $('#ID_TIPO_FUNCION').val()
                            };
                        }
                    }
                },
                schema: {
                    data: "DATA",
                    total: "TOTAL",
                    model: { id: "XID_PERSONAL_AERONAUTICO" }
                },
                serverPaging: true
            },
            columns: columnOptions,
            selectable: true,
            pageable: {
                pageSize: 10,
                refresh: true,
                messages: {
                    refresh: "Actualizar la ventana."
                }
            }
        };

        grid.kendoGrid(gridOptions).delegate("tbody>tr", "click", function (e) {
            var row = e.currentTarget;
            var selectedItem = grid.data("kendoGrid").dataItem(row);

            $("#MODAL_EDITAR_PERSONAL").data("url", "/PersonalAeronautico/EditarPersonal?XID_PERSONAL_AERONAUTICO=" + selectedItem.XID_PERSONAL_AERONAUTICO).prop("disabled", false);
            $("#INDEX_VINCULO_LABORAL").data("url", "/VinculoLaboral/IndexVinculoLaboral?XID_PERSONAL_AERONAUTICO=" + selectedItem.XID_PERSONAL_AERONAUTICO).prop("disabled", false);
            $("#INDEX_LICENCIA_HABILTACION").data("url", "/LicenciaHabilitacion/Index?XID_PERSONAL_AERONAUTICO=" + selectedItem.XID_PERSONAL_AERONAUTICO).prop("disabled", false);
            $("#INDEX_EVALUACION_MEDICA").data("url", "/EvaluacionMedica/Index?XNUMERO_DOCUMENTO=" + selectedItem.XNUMERO_DOCUMENTO).prop("disabled", false);
        });
    };

    var refresh = function () {
        var grid = $("#ajaxDiv>div");

        if (grid.length < 1) {
            return;
        }
        
        grid.data("kendoGrid").dataSource.read();
    };

    return {
        Initialize: initialize,
        Refresh: refresh
    }
}();

$(function () {
    ajaxGrid.Initialize();

    $("#ID_TIPO_DOCUMENTO").css("width", "100%").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_TIPO_DOCUMENTO"
    });

    $("#ID_PERSONA_JURIDICA").css("width", "100%").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "RAZON_SOCIAL",
        dataValueField: "ID_PERSONA_JURIDICA"
    });

    $("#ID_TIPO_FUNCION").css("width", "100%").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_TIPO_FUNCION"
    });

    $("#BUSCAR_PERSONAL_AERONAUTICO").submit(function (e) {
        e.preventDefault();
        $.ajax({
            dataType: "json",
            url: "/PersonalAeronautico/TestConnection",
            success: function (data) {
                var NRO_DOC = $.trim($("#NUMERO_DOCUMENTO").val());
                var TP_DOC = $("#ID_TIPO_DOCUMENTO").val();
                if (NRO_DOC != "" && TP_DOC == 0) {
                    bootbox.alert("NO HA SELECCIONADO NINGUN TIPO DE DOCUMENTO");
                    return 0;
                }
                ajaxGrid.Refresh();
            }
        });
    });

    $("#INDEX_VINCULO_LABORAL").on("click", function (e) {
        e.preventDefault();
        $(location).attr("href", $(this).data('url'));
    });

    $("#MODAL_EDITAR_PERSONAL").on("click", function (e) {
        e.preventDefault();
        $(location).attr("href", $(this).data('url'));
    });

    $("#INDEX_LICENCIA_HABILTACION").on("click", function (e) {
        e.preventDefault();
        $(location).attr("href", $(this).data('url'));
    });

    $("#INDEX_EVALUACION_MEDICA").on("click", function (e) {
        e.preventDefault();
        $(location).attr("href", $(this).data('url'));
    });
});