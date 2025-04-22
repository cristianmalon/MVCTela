$(document).ready(function () {
    $(window).load(function () {

        $("#txtFiltroNombre").focus();

        cargarGridPersonaNatural();

        $("#btnBuscarPersonaNatural").click(function () {
            cargarGridPersonaNatural();

        });

        $("#btnLimpiarPersonaNatural").click(function () {
            $("#txtFiltroNombre").val('');
            $("#txtFiltroApMaterno").val('');
            $("#txtFiltroApPaterno").val('');
            $("#txtFiltroDocuemnto").val('');

            $("#txtFiltroNombre").focus();

            cargarGridPersonaNatural();
        });



        /*$("#addNewColorOjo").click(function () {

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

        });*/

        $("#addModifyPersonaNatural").click(function () {
            console.log('jdhjd');
            var dataDetallePersonaNatural = $("#gridPersonaNatural").data("kendoGrid");
            var itemDataPersonaNatural = dataDetallePersonaNatural.dataItem(dataDetallePersonaNatural.select());
            if (itemDataPersonaNatural != undefined) {

                var ID_PERSONA = itemDataPersonaNatural.XPERSONANATURAL;
                var url= "/PersonaNatural/PersonaNatural"
                window.location = url + "?PersonaNatural=" + ID_PERSONA;
                /*$.ajax({
                    url: "/PersonaNatural/PersonaNatural?PersonaNatural=" + ID_PERSONA
                    window.location = $(this).attr("data-url") + "?Index=" + itemData.XAERONAVE_PA;
                });
                */
            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }


        });


    });
});


function cargarGridPersonaNatural() {

    $("#gridPersonaNatural").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/PersonaNatural/ListarPersonaNatural",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    objNombres: $('#txtFiltroNombre').val(),
                    objAmaterno: $('#txtFiltroApMaterno').val(),
                    objApaterno: $('#txtFiltroApPaterno').val(),
                    objDocumento: $('#txtFiltroDocuemnto').val(),
                    page: options.page,
                    pageSize: options.pageSize
                });
            }
        },
        schema: {
            data: "L_GENM_PERSONA_NATURAL",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XPERSONANATURAL: { type: "string" },
                    NOMBRE: { type: "string" },
                    APELLIDO_PATERNO: { type: "string" },
                    APELLIDO_MATERNO: { type: "string" },
                    TIPO_DOCUMENTO: { type: "string" },
                    NUMERO_DOCUMENTO: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridPersonaNatural").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XPERSONANATURAL",
                title: "ID_PERSONA_NATURAL",
                hidden: true
            },  {
                field: "APELLIDO_PATERNO",
                title: "APE. PATERNO",
                flex: 1
            }, {
                field: "APELLIDO_MATERNO",
                title: "APE. MATERNO",
                flex: 1
            }, {
                field: "NOMBRE",
                title: "NOMBRES",
                flex: 1
            }, {
                field: "TIPO_DOCUMENTO",
                title: "DOCUMEWNTO",
                flex: 1
            }, {
                field: "NUMERO_DOCUMENTO",
                title: "N° DOCUMENTO",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}