$(document).ready(function () {
    $(window).load(function () {

       
        $("#btnProcesarData").bind("click", function () {

            var formData = new FormData();

            var totalFiles = document.getElementById("ARCHIVO").files.length;

            for (var i = 0; i < totalFiles; i++) {
                var file = document.getElementById("ARCHIVO").files[i];
                formData.append("Documento_Adjunto", file);
            }
            console.log(formData);


            $.ajax({
                type: 'POST',
                url: '/CentroMedicoAutorizado/FileData',
                data: formData,
                datatype: 'json',
                contentType: false,
                processData: false,
                beforeSend: function () {
                    bloquoteModal();
                },
                success: function (data) {

                    console.log(data);
                    /* if (!data.rpta) {
                        errorAddModelo("divErrorPropietario", "ulListaErrorPropietario", data.errores);
                    } else {
                        console.log(data.newidaeronave);
                        $("#contenedor").modal('hide');
                        //gridHistoricoPropietario();

                        //window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
                        window.location = "/ConsultaCambioAeronavePA/ListaCambioPropietario" + '?Index=' + data.newidaeronave;
                        //window.location = window.location;
                    }
                    */
                    desbloqObject();

                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
                desbloqObject();
            });

            
        });



    });
});