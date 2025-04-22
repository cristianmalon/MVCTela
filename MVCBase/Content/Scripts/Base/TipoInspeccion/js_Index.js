var gridReadUrl = "/TipoInspeccion/GetTipos";
var gridUpdateUrl = "/TipoInspeccion/EditTipoInspeccion";

var Grid = function () {
    var initialize = function () {
        var container = $("#GridContainer").html("<div></div>");
        var grid = $("div", container);

        var columnOptions = [
            { field: "ID_TIPO_INSPECCION", hidden: true },
            { field: "DESCRIPCION", title: "DESCRIPCION" },
            { field: "COLOR", title: "COLOR", template: '<div style="width:30px;background:#=COLOR#">&nbsp;</div>' },
            { field: "FLG_ESTADO", title: "Activo?", template: '<input type="checkbox" #= FLG_ESTADO ? "checked=checked" : "" # disabled="disabled" ></input>' }
        ];

        var gridOptions = {
            dataSource: {
                transport: {
                    read: {
                        url: gridReadUrl,
                        type: "GET",
                        data: function () {
                            return {
                                DESCRIPCION: $('#DESCRIPCION').val()
                            };
                        }
                    }
                },
                schema: { data: "data", total: "total", model: { id: "ID_TIPO_INSPECCION" } },
                serverPaging: true
            },
            columns: columnOptions,
            selectable: true,
            pageable: {
                pageSize: 10,
                refresh: true,
                messages: {
                    refresh: "Refresh the grid"
                }
            }
        };
        
        grid.kendoGrid(gridOptions).delegate("tbody>tr", "click", function(e) {
            var row = e.currentTarget;
            var selectedItem = grid.data("kendoGrid").dataItem(row);

            $("#k-grid-edit").data("url", gridUpdateUrl + "?ID_TIPO_INSPECCION=" + selectedItem.ID_TIPO_INSPECCION).prop("disabled", false);
        });
    };

    var refresh = function () {
        var grid = $("#GridContainer>div");
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

var SaveTipoInspeccion = function (formId) {
    $.ajax({
        dataType: "json",
        url: "/TipoInspeccion/SaveTipoInspeccion",
        data: $(formId).serialize(),
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divError", "ulListaError", data.errores);
            } else {
                window.location = data.url;
            }
        }
    });
};

$(document).ready(function () {
    Grid.Initialize();

    $("#SearchForm").on("submit", function (e) {
        e.preventDefault();
        Grid.Refresh();
    });

    $("#k-grid-edit").on("click", function (e) {
        e.preventDefault();

        var url = $(this).data('url');

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                desbloqObject();
                $(".seccionModal").html(data);
                $(".contenedor").modal('show');
            }
        });
    });
});

