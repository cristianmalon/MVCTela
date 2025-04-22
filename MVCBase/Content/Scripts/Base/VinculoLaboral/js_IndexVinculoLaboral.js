$(document).ready(function () {
    $(window).load(function () {

        cargarGridVinculoLaboral();

        $("#addNewVinculoLaboral").click(function () {

            var url = $(this).attr('data-url') + '?Id_Personal_Aeronautico=' + $('#XID_PERSONAL_AERONAUTICO').val();
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

        $("#addModifyVinculoLaboral").click(function () {


            var dataDetalleVinculoLaboral = $("#gridVinculoLaboral").data("kendoGrid");
            var itemDataVinculoLaboral = dataDetalleVinculoLaboral.dataItem(dataDetalleVinculoLaboral.select());
            if (itemDataVinculoLaboral != undefined) {

                var url = $(this).attr('data-url') +  '?Id_Personal_Aeronautico=' + $('#XID_PERSONAL_AERONAUTICO').val() + '&Index=' + itemDataVinculoLaboral.XID_VINCULO_LABORAL_PJ_PA;
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

function cargarGridVinculoLaboral() {
    $("#gridVinculoLaboral").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/VinculoLaboral/ListarVincunloLaboral",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objId_Personal_Aeronautico: $('#XID_PERSONAL_AERONAUTICO').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GEND_PERSONAL_AERONAUTICO",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_VINCULO_LABORAL_PJ_PA: { type: "string" },
                    XID_PERSONA_JURIDICA: { type: "string" },
                    RAZON_SOCIAL: { type: "string" },
                    DESCRIPCION_FUNCION: { type: "string" },
                    XID_PERSONAL_AERONAUTICO: { type: "string" },
                    XID_TIPO_FUNCION: { type: "string" },
                    XFECHA_INICIO: { type: "string" },
                    XFECHA_TERMINO: { type: "string" },
                    ESTADO: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridVinculoLaboral").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_VINCULO_LABORAL_PJ_PA",
                title: "XID_VINCULO_LABORAL_PJ_PA",
                hidden: true
            }, {
                field: "XID_PERSONA_JURIDICA",
                title: "XID_PERSONA_JURIDICA",
                hidden: true
            }, {
                field: "XID_PERSONAL_AERONAUTICO",
                title: "XID_PERSONAL_AERONAUTICO",
                hidden: true
            }, {
                field: "XID_TIPO_FUNCION",
                title: "XID_TIPO_FUNCION",
                hidden: true
            }, {
                field: "RAZON_SOCIAL",
                title: "EMPRESA",
                flex: 1
            }, {
                field: "DESCRIPCION_FUNCION",
                title: "FUNCIÓN",
                flex: 1
            }, {
                field: "XFECHA_INICIO",
                title: "FECHA INICIO",
                flex: 1
            }, {
                field: "XFECHA_TERMINO",
                title: "FECHA TERMINO",
                flex: 1
            }, {
                field: "ESTADO",
                title: "ESTADO",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}