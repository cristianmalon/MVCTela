$(document).ready(function () {

  
    $("#txtRazonSocial").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });


    $("#btnSeleccionarEmpresa").click(function () {
        var razonsocial = $("#txtRazonSocial").val();
        var nombrerazonsocial = $("#txtRazonSocial option:selected").text();
        

        if (razonsocial == "") {

            bootbox.alert("Seleccione una razón social");


        }
        else {
            bootbox.confirm("¿Desea realizar el registro de la aeronave para la empresa seleccionada?", function (res) {
                if (res) {
                    console.log(razonsocial)
                    console.log(nombrerazonsocial)
                    
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/SeleccionarEmpresaPA/SelEmpresa',
                        type: 'POST',
                        data: JSON.stringify({ XEMPRESA: razonsocial }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            console.log(data);
                            window.location = "/AeronavePADM/REGISTROAERONAVE";
                           
                           
                            desbloqObject();

                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                    

                }
            });
        }

    });


});

