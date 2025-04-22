$(document).ready(function () {
    $(window).load(function () {
        //alert('manuel');
        $("#XID_CDEPARTAMENTO").change(function () {
            ChangeDepartamento();
        });
        $("#XID_CPROVINCIA").change(function () {
            ChangeProvincia();
        });

    });

});


//Change Departamento
function ChangeDepartamento() {
    alert($("#XID_CDEPARTAMENTO").val());
    CargarProvincia($("#XID_CDEPARTAMENTO").val());
}

//Change Provincia
function ChangeProvincia() {
    CargarDistrito($("#XID_CPROVINCIA").val());
}

//Cargar Datos de Provincia
function CargarProvincia(depart) {
    var departamento = depart;
    console.log(departamento);
    var data;
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PersonaNatural/CargarProvincia',
        type: 'POST',
        data: JSON.stringify({ XDEPARTAMENTO: departamento }),
        beforeSend: function () {

        },
        success: function (JsonResponse) {

            data = JsonResponse.l_GENM_PROVINCIA;
            console.log(data);
            $("#XID_CPROVINCIA").find('option').remove();
            $('#XID_CPROVINCIA').append($('<option>', {
                value: '',
                text: '[SELECCIONE]'
            }));
            $.each(data, function (index, value) {
                $('#XID_CPROVINCIA').append($('<option>', {
                    value: value.XID_CPROVINCIA,
                    text: value.DESCRIPCION
                }));
            });

            $("#XID_CPROVINCIA").removeAttr("disabled");

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
        url: '/PersonaNatural/CargarDistrito',
        type: 'POST',
        data: JSON.stringify({ XPROVINCIA: provincia }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            data = JsonResponse.l_GENM_DISTRITO;

            $("#XDISTRITO").find('option').remove();
            $('#XDISTRITO').append($('<option>', {
                value: '',
                text: '[SELECCIONE]'
            }));
            $.each(data, function (index, value) {
                $('#XDISTRITO').append($('<option>', {
                    value: value.XDISTRITO,
                    text: value.DESCRIPCION
                }));
            });
            $("#XDISTRITO").removeAttr("disabled");
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}