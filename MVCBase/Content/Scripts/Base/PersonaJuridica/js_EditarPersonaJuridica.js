$(document).ready(function () {
    $(window).load(function () {

        
        if ($("#XFLG_NACIONALIDAD").val() == 1) {
            $("#origen").hide();
            $("#XPAIS").removeAttr("disabled").attr("disabled", "disabled");
        }
        else {
            $("#origen").show();
            $("#XPAIS").removeAttr("disabled").attr("disabled", "disabled");
        }

        var persona = $("#XPERSONAJURIDICA").val().trim();
        if (persona == "") {
            SeleccionarPeru();
        } else {
            $("#btnBuscarPorRuc").hide();
            $("#btnCancelarPorRuc").hide();
            $("#RUC").removeAttr("readonly").attr("readonly", "readonly");
        }

        $("#btnCancelarPorRuc").click(function (e) {
            
            var persona = $("#XPERSONAJURIDICA").val().trim();
            if (persona == "") {
                $("#RUC").removeAttr("readonly");
                $("#RAZON_SOCIAL").val('');
                $("#NOMBRE_COMERCIAL").val('');
                $("#DIRECCIONPJ").val('');
                $("#RUC").val('');
                $("#XDEPARTAMENTO").val('');
                $("#XPROVINCIA").val('');
                $("#XDISTRITO").val('');

                $("#DESC_DEPARTAMENTO").val('');
                $("#DESC_PROVINCIA").val('');
                $("#DESC_DISTRITO").val('');
                $("#DESC_CONDICION").val('');

                $("#XPAIS").val('');
                $("#XPAIS_ORIGEN").val('');
                SeleccionarPeru();
                $("#divError").hide(1000);
                $("#RUC").focus();
            } else {
            }
        });


        $("#XFLG_NACIONALIDAD").change(function () {

            var flag = $("#XFLG_NACIONALIDAD").val();

            if (flag == 1) {

                $("#origen").hide();
                $("#RAZON_SOCIAL").removeAttr("readonly").attr("readonly", "readonly");
                $("#NOMBRE_COMERCIAL").removeAttr("readonly").attr("readonly", "readonly");
                $("#DIRECCIONPJ").removeAttr("readonly").attr("readonly", "readonly");
                $("#XDEPARTAMENTO").removeAttr("disabled").attr("disabled", "disabled");
                $("#XPROVINCIA").removeAttr("disabled").attr("disabled", "disabled");
                $("#XDISTRITO").removeAttr("disabled").attr("disabled", "disabled");
                SeleccionarPeru();
            } else if (flag == 0) {
                $("#origen").show();
                $("#RUC").removeAttr("readonly");
                $("#RAZON_SOCIAL").removeAttr("readonly").attr("readonly", "readonly");
                $("#NOMBRE_COMERCIAL").removeAttr("readonly").attr("readonly", "readonly");
                $("#DIRECCIONPJ").removeAttr("readonly").attr("readonly", "readonly");
                $("#XDEPARTAMENTO").removeAttr("disabled").attr("disabled", "disabled");
                $("#XPROVINCIA").removeAttr("disabled").attr("disabled", "disabled");
                $("#XDISTRITO").removeAttr("disabled").attr("disabled", "disabled");
                $("#XDEPARTAMENTO").removeAttr("disabled").attr("disabled", "disabled");
                $("#XPROVINCIA").removeAttr("disabled").attr("disabled", "disabled");
                $("#XDISTRITO").removeAttr("disabled").attr("disabled", "disabled");

            }
        });
           
        $("#btnBuscarPorRuc").click(function (e) {
            var Ruc = $("#RUC").val();

            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/PersonaJuridica/BuscarPersonaJuridica',
                type: 'POST',
                data: JSON.stringify({ Ruc: Ruc }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (JsonResponse) {

                    if (!JsonResponse.rpta) {
                        errorAddModelo("divError", "ulListaError", JsonResponse.lista);
                    } else {
                        var data = JsonResponse.l_Persona_Juridica;
                        console.log(data);
                        $("#RAZON_SOCIAL").val(data[0].RAZON_SOCIAL);
                        $("#NOMBRE_COMERCIAL").val(data[0].NOMBRE_COMERCIAL);
                        $("#DIRECCIONPJ").val(data[0].DIRECCION);
                        $("#RUC").removeAttr("readonly").attr("readonly", "readonly");
                        $("#XDEPARTAMENTO").val(data[0].XDEPARTAMENTO);
                        $("#XPROVINCIA").val(data[0].XPROVINCIA);
                        $("#XDISTRITO").val(data[0].XDISTRITO);
                        $("#DESC_DEPARTAMENTO").val(data[0].DESC_DEPARTAMENTO);
                        $("#DESC_PROVINCIA").val(data[0].DESC_PROVINCIA);
                        $("#DESC_DISTRITO").val(data[0].DESC_DISTRITO);
                        $("#DESC_CONDICION").val(data[0].DESC_CONDICION);
                        SeleccionarPeru();
                        $("#XDEPARTAMENTO").removeAttr("disabled").attr("disabled", "disabled");
                        $("#XPROVINCIA").removeAttr("disabled").attr("disabled", "disabled");
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
                desbloqObject();
            });

                
        });

        $("#btnGrabarAvance").click(function (e) {

            bootbox.confirm("¿Desea grabar a la nueva persona juridica?", function (res) {
                if (res) {
                    var oPERSONAJURIDICA = {
                        ID_PERSONA_JURIDICA: $("#ID_PERSONA_JURIDICA").val(),
                        XPERSONAJURIDICA: $("#XPERSONAJURIDICA").val(),
                        RAZON_SOCIAL: $("#RAZON_SOCIAL").val(),
                        RUC: $("#RUC").val(),
                        NOMBRE_COMERCIAL: $("#NOMBRE_COMERCIAL").val(),
                        DIRECCION: $("#DIRECCIONPJ").val(),
                        DIRECCION_ALTERNATIVA: $("#DIRECCION_ALTERNATIVA").val(),
                        XPAIS: $("#XPAIS").val(),
                        XPAIS_ORIGEN: $("#XPAIS_ORIGEN").val(),
                        XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
                        XPROVINCIA: $("#XPROVINCIA").val(),
                        XDISTRITO: $("#XDISTRITO").val(),
                        DESC_DEPARTAMENTO: $("#DESC_DEPARTAMENTO").val(),
                        DESC_PROVINCIA: $("#DESC_PROVINCIA").val(),
                        DESC_DISTRITO: $("#DESC_DISTRITO").val(),
                        DESC_CONDICION: $("#DESC_CONDICION").val(),
                        TELEFONO1: $("#TELEFONO1").val(),
                        TELEFONO2: $("#TELEFONO2").val(),
                        EMAIL: $("#EMAIL").val(),
                        PAGINA_WEB: $("#PAGINA_WEB").val(),
                        FLG_NACIONALIDAD: $('#XFLG_NACIONALIDAD').val() == "1" ? true : false,
                        FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                        ID_USUARIO_REG: $("#ID_USUARIO_REG").val(),
                        FEC_REG: $("#FEC_REG").val(),
                        ID_USUARIO_ACT: $("#ID_USUARIO_ACT").val(),
                        FEC_ACT: $("#FEC_ACT").val()
                    };
                    
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/PersonaJuridica/SavePersonaJuridica',
                        type: 'POST',
                        data: JSON.stringify({ oPERSONAJURIDICA: oPERSONAJURIDICA }),
                        beforeSend: function () {

                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divError", "ulListaError", data.errores);
                            } else {
                                if ($("#XTIPO_USUARIO").val() == "DGAC") {
                                    window.location = data.url;
                                } else {
                                    bootbox.alert("El registro de la autorización esta completo!");
                                }
                                
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                    
                }
            });
        });

    });

});

/*
function CargarProvincia(depart, provin, tipo){
    var departamento = depart;
    var data;
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PersonaJuridica/CargarProvincia',
        type: 'POST',
        data: JSON.stringify({ departamento: departamento }),
        beforeSend: function () {
            //bloquoteModal('frmModAeropuerto');
        },
        success: function (JsonResponse) {
            //desbloqModal('frmModAeropuerto');
            data = JsonResponse.l_Provincia;

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
            if(tipo == 0){
                $("#XPROVINCIA").val(provin);
            }
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}


function CargarDistrito(provin, dist, tipo) {
    var provincia = provin;
    var data;
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PersonaJuridica/CargarDistrito',
        type: 'POST',
        data: JSON.stringify({ provincia: provincia }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            data = JsonResponse.l_Distrito;

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

            if (tipo == 0) {
                $("#XDISTRITO").val(dist);
            }
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}
*/
function SeleccionarPeru() {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PersonaJuridica/SeleccionarPeru',
        type: 'POST',
        //data: JSON.stringify({ provincia: provincia }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            $("#XPAIS").val(JsonResponse.pais_origen);
            $("#XPAIS_ORIGEN").val(JsonResponse.pais);
                
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}

function campoNumero(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}