$(document).ready(function () {
    $(window).load(function () {
        //ESTABLECE EL CAMPO NUMERICO
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

        //EVENTO KEYPRESSED PARA LA BUSQUEDA DE PERSONAS JURIDICAS
        $('#txtfiltrors').typeahead({
            source: function (query, process) {
                return $.getJSON(
                    '/PersonaJuridica/ListaPersonaJuridica',
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
            displayText: function (item) { return item.label; }
        });

    });

    //LIMPIAR LOS PARAMETROS DE ENTRADA
    $("#btnLimpiar").click(function () {

        $("#txtfiltrors").val("");
        $("#txtfiltroruc").val("");
        $("#txtfiltrors").focus();
    });

});





