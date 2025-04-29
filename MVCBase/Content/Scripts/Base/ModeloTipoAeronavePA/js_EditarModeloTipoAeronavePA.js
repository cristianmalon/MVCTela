$(document).ready(function () {

    cargaTipoAeronave();
    cargaFabricante();


});


function cargaTipoAeronave() {

    $.ajax({
        datatype: 'json',
        url: '/ModeloTipoAeronavePA/cargaTipoAeronave',
        type: 'POST',
        beforeSend: function () {
            // bloquoteModal('frmModCiudad');
        },
        success: function (JsonResponse) {

            // desbloqModal('frmModCiudad');

            $("#XTIPOAERONAVEPA").html('');

            $("#XTIPOAERONAVEPA").kendoComboBox({
                placeholder: "Seleccione",
                dataTextField: "DESCRIPCION",
                dataValueField: "XTIPOAERONAVEPA",
                filter: "contains",
                dataSource: JsonResponse.l_TipoAeronave,
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

            $("#XFABRICANTEPA").html('');

            $("#XFABRICANTEPA").kendoComboBox({
                placeholder: "Seleccione",
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
