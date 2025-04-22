$(document).ready(function () {
    $(window).load(function () {

       /* var depart = $("#XDEPARTAMENTO").val();
        var prov = $("#XPROVINCIA").val();

        alert(depart.length);

        if (depart.length>0)
        {
            CargarProvincia(depart);
        }
        if (prov.length>0) {
            CargarDistrito(prov);
        }
        */


        $("#XDEPARTAMENTO").change(function () {
            ChangeDepartamento();
        });
        $("#XPROVINCIA").change(function () {
            ChangeProvincia();
        });

    });

});


//Change Departamento
function ChangeDepartamento() {
    //alert($("#cbxDepartamento").val());
    CargarProvincia($("#XDEPARTAMENTO").val());
}

//Change Provincia
function ChangeProvincia() {
    CargarDistrito($("#XPROVINCIA").val());
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
            $("#XPROVINCIA").find('option').remove();
            $('#XPROVINCIA').append($('<option>', {
                value: '',
                text: '[SELECCIONE]'
            }));
            $.each(data, function (index, value) {
                $('#XPROVINCIA').append($('<option>', {
                    value: value.XPROVINCIA,
                    text: value.DESCRIPCION
                }));
            });

            $("#XPROVINCIA").removeAttr("disabled");

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