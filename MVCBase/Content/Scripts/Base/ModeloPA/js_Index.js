$(document).ready(function () {
    $(window).load(function () {

        cargaTipoModelo();
        cargaFabricante();

        

    });
});



function cargaTipoModelo() {
        
        $.ajax({
            datatype: 'json',
            url: '/ModeloPA/cargaTipoModelo',
            type: 'POST',
            beforeSend: function () {
                // bloquoteModal('frmModCiudad');
            },
            success: function (JsonResponse) {

                // desbloqModal('frmModCiudad');
               
                $("#filtro_Tipo_Modelo").html('');

                $("#filtro_Tipo_Modelo").kendoComboBox({
                    placeholder: "Seleccione Tipo Modelo",
                    dataTextField: "DESCRIPCION",
                    dataValueField: "XTIPOMODELOPA",
                    filter: "contains",
                    dataSource: JsonResponse.l_TipoModelo,
                    change: function () {
                        var cmb = this;
                        //alert(cmb);
                        // selectedIndex of -1 indicates custom value
                        if (cmb.selectedIndex < 0) {
                            cmb.value('');
                        } /*else {
                                onChangecb();
                            }*/
                    },

                });

                //console.log(JsonResponse.l_TipoModelo);


            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });
}

function cargaFabricante() {
    
    $.ajax({
        datatype: 'json',
        url: '/ModeloPA/cargaFabricante',
        type: 'POST',
        beforeSend: function () {
            // bloquoteModal('frmModCiudad');
        },
        success: function (JsonResponse) {

            // desbloqModal('frmModCiudad');
         
            $("#filtro_Fabricante").html('');

            $("#filtro_Fabricante").kendoComboBox({
                placeholder: "Seleccione Fabricante",
                dataTextField: "DESCRIPCION",
                dataValueField: "XFABRICANTEPA",
                filter: "contains",
                dataSource: JsonResponse.l_Fabricante,
                change: function () {
                    var cmb = this;
                    //alert(cmb);
                    // selectedIndex of -1 indicates custom value
                    if (cmb.selectedIndex < 0) {
                        cmb.value('');
                    } /*else {
                                onChangecb();
                            }*/
                },

            });

            //console.log(JsonResponse.l_Fabricante);


        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });
}
