$(document).ready(function () {
    cargarGridHelipuertos();

    $("#txtPaisBusqueda").change(function () {
        ChangePais();
    });
    $("#txtDepartamentoBusqueda").change(function () {
        ChangeDepartamento();
    });
    $("#txtProvinciaBusqueda").change(function () {
        ChangeProvincia();
    });

    $("#btnBuscarHelipuerto").click(function () {
        cargarGridHelipuertos();
    });

    $("#addModifyHelipuerto").click(function () {


        var dataDetalleHelipuerto = $("#gridHelipuerto").data("kendoGrid");
        var itemDataHelipuerto = dataDetalleHelipuerto.dataItem(dataDetalleHelipuerto.select());
        if (itemDataHelipuerto != undefined) {

            
            var url = $(this).attr('data-url') + '?IDHELIPUERTO=' + itemDataHelipuerto.XHELIPUERTO;
            console.log(url);
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

//Verificar si el pais es Perú u otro
function ChangePais() {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Helipuerto/SeleccionarPais',
        type: 'POST',
        data: JSON.stringify({ pais: $("#txtPaisBusqueda").val() }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            if (JsonResponse.rpta) {
                $("#txtDepartamentoBusqueda").removeAttr("disabled");
            } else {
                $("#txtDepartamentoBusqueda").val('');
                $("#txtDepartamentoBusqueda").removeAttr("disabled").attr("disabled", "disabled");
                $("#txtProvinciaBusqueda").val('');
                $("#txtProvinciaBusqueda").removeAttr("disabled").attr("disabled", "disabled");
                $("#txtDistritoBusqueda").val('');
                $("#txtDistritoBusqueda").removeAttr("disabled").attr("disabled", "disabled");
            }

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}
//Change Departamento
function ChangeDepartamento() {
    CargarProvincia($("#txtDepartamentoBusqueda").val());
}

//Change Provincia
function ChangeProvincia() {
    CargarDistrito($("#txtProvinciaBusqueda").val());
}

//Cargar Datos de Provincia
function CargarProvincia(depart) {
    var departamento = depart;
    var data;
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Helipuerto/CargarProvincia',
        type: 'POST',
        data: JSON.stringify({ departamento: departamento }),
        beforeSend: function () {
            
        },
        success: function (JsonResponse) {

            data = JsonResponse.l_Provincia;

            $("#txtProvinciaBusqueda").find('option').remove();
            $('#txtProvinciaBusqueda').append($('<option>', {
                value: '',
                text: '[SELECCIONE]'
            }));
            $.each(data, function (index, value) {
                $('#txtProvinciaBusqueda').append($('<option>', {
                    value: value.XPROVINCIA,
                    text: value.DESCRIPCION
                }));
            });

            $("#txtProvinciaBusqueda").removeAttr("disabled");

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}

//Cargar Datos de Distrito
function CargarDistrito(provin) {
    var provincia = provin;
    var data;
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Helipuerto/CargarDistrito',
        type: 'POST',
        data: JSON.stringify({ provincia: provincia }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            data = JsonResponse.l_Distrito;

            $("#txtDistritoBusqueda").find('option').remove();
            $('#txtDistritoBusqueda').append($('<option>', {
                value: '',
                text: '[SELECCIONE]'
            }));
            $.each(data, function (index, value) {
                $('#txtDistritoBusqueda').append($('<option>', {
                    value: value.XDISTRITO,
                    text: value.DESCRIPCION
                }));
            });
            $("#txtDistritoBusqueda").removeAttr("disabled");
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}



function cargarGridHelipuertos() {
    $("#gridHelipuerto").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Helipuerto/ListarHelipuerto",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objHeliPuerto: $('#txtDescripcionHelipuerto').val(), objPais: $('#txtPaisBusqueda').val(), objDepartamento: $('#txtDepartamentoBusqueda').val(), objProvincia: $('#txtProvinciaBusqueda').val(), objDistrito: $('#txtDistritoBusqueda').val(), page: options.page, pageSize: options.pageSize, txtOaci: $("#txtOACI").val(), txtIata: $("#txtIATA").val() });
            }
        },
        schema: {
            data: "l_GENM_HELIPUERTO",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XHELIPUERTO: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    XDESCRIPCION_PAIS: { type: "string" },
                    XDESCRIPCION_DEPARTAMENTO: { type: "string" },
                    XDESCRIPCION_PROVINCIA: { type: "string" },
                    XDESCRIPCION_DISTRITO: { type: "string" },
                    OACI: { type: "string" },
                    IATA: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridHelipuerto").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XHELIPUERTO",
                title: "ID_HELIPUERTO",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCION",
                width: 180
            }, {
                field: "XDESCRIPCION_PAIS",
                title: "PAÍS",
                width: 120
            }, {
                field: "XDESCRIPCION_DEPARTAMENTO",
                title: "DEPARTAMENTO",
                width: 120
            }, {
                field: "XDESCRIPCION_PROVINCIA",
                title: "PROVINCIA",
                width: 120
            }, {
                field: "XDESCRIPCION_DISTRITO",
                title: "DISTRITO",
                width: 120
            }, {
                field: "OACI",
                title: "OACI",
                width: 120
            }, {
                field: "IATA",
                title: "IATA",
                width: 120
            }]
    }).data("kendoGrid");

}