$(document).ready(function () {

    var Contacto = $("#XCONTACTO").val().trim();
    if (Contacto == "") {
    } else {
        $("#seccionBusqueda").hide();
        $("#txtBuscarNombreCompleto").removeAttr("readonly").attr("readonly", "readonly");
    }



    $("#btnAsignarContacto").click(function (e) {
        bootbox.confirm("¿Desea grabar a la nueva persona?", function (res) {
            if (res) {
                var oContacto = {
                    XCONTACTO: $("#XCONTACTO").val(),
                    XPERSONA_NATURAL: $("#XPERSONA_NATURAL").val(),
                    XPERSONA_JURIDICA: $("#XPERSONA_JURIDICA").val(),
                    XCARGO: $("#XCARGO").val(),
                    FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                    ID_USUARIO_REG: $("#ID_USUARIO_REG").val(),
                    FEC_REG: $("#FEC_REG").val(),
                    ID_USUARIO_ACT: $("#ID_USUARIO_ACT").val(),
                    FEC_ACT: $("#FEC_ACT").val()
                };

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/Contacto/SaveContacto',
                    type: 'POST',
                    data: JSON.stringify({ oContacto: oContacto }),
                    beforeSend: function () {

                    },
                    success: function (data) {
                        console.log(data);
                        if (!data.rpta) {
                            errorAddModelo("divErrorContacto", "ulListaErrorContacto", data.errores);
                        } else {
                            $("#frmContacto").submit();

                            $("[data-dismiss=modal]").trigger({ type: "click" });
                        }
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                });

            }
        });
    });

});

$('#txtBuscarNombreCompleto').typeahead({
    source: function (query, process) {
        return $.getJSON(
            '/Contacto/ListarPersonas',
            { filtro: query },
            function (data) {
                var dato = [];
                $.each(data.l_Autocomplete, function (index, item) {
                    dato.push({
                        label: item.label,
                        value: item.value
                    });

                });
                return process(dato);

            });
    },
    displayText: function (item) { return item.label; },
    updater: function (item) {
        //Guardar el valor en hidden 
        console.log("'" + item.value + "' selected.");
        $("#XPERSONA_NATURAL").val(item.value);
        var tipo = "contacto";
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Contacto/Detalle_Persona_Natural',
            type: 'POST',
            data: JSON.stringify({ PersonaNatural: $("#XPERSONA_NATURAL").val().trim(), tipo: tipo }),// { PersonaNatural: $("#XPERSONA_NATURAL").val().trim() },
            beforeSend: function () {
                //bloquoteModal('frmCiudad');
            },
            success: function (JsonResponse) {
                var data = JsonResponse.l_PersonaNatural;
                console.log(data);
                $("#APELLIDO_PATERNO_CONTACTO").val(data[0].APELLIDO_PATERNO);
                $("#APELLIDO_MATERNO_CONTACTO").val(data[0].APELLIDO_MATERNO);
                $("#NOMBRES_CONTACTO").val(data[0].NOMBRE);
                $("#NUMERO_DOCUMENTO_CONTACTO").val(data[0].NUMERO_DOCUMENTO);
                $("#TIPO_DOCUMENTO_CONTACTO").val(data[0].TIPO_DOCUMENTO);
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });

        return item.label;
    }
});


function cargarGridPersonas() {
    $("#gridPersonas").html('');

    $.ajax({
        datatype: 'json',
        url: '/Contacto/ListarPersonas',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ objtxtNombres: $('#txtNombres').val(), objtxtApePaterno: $('#txtApePaterno').val(), objtxtApeMaterno: $('#txtApeMaterno').val(), objtxtNro: $('#txtNro').val() }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            alert("Hola");
            console.log(JsonResponse);

            var dataSource = new kendo.data.DataSource({
                batch: true,
                pageSize: 20,
                data: JsonResponse.l_GENM_PERSONA_NATURAL,
                schema: {
                    model: {
                        id: "XPERSONANATURAL",
                        fields: {
                            XPERSONANATURAL: { editable: false, nullable: true }
                        }
                    }
                }
            });


            var grid = $("#gridPersonas").kendoGrid({

                dataSource: dataSource,
                pageable: true,
                selectable: true,
                //dataBound: onDataBoundInspector,
                //height: 300,
                columns: [
                    {
                        field: "XPERSONANATURAL",
                        hidden: true
                    }, {
                        field: "NOMBRE",
                        width: 150,
                        title: "NOMBRES"
                    }, {
                        field: "APELLIDO_PATERNO",
                        width: 145,
                        title: "APELLIDO PATERNO"
                    }, {
                        field: "APELLIDO_MATERNO",
                        width: 145,
                        title: "APELLIDO MATERNO"
                    }, {
                        field: "TIPO_DOCUMENTO",
                        width: 120,
                        title: "TIPO DOCUMENTO"
                    }, {
                        field: "NUMERO_DOCUMENTO",
                        width: 110,
                        title: "N° DOCUMENTO"
                    }]
            }).data("kendoGrid");


            //grid.table.on("click", ".checkbox", selectRowInspector);


        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });

}