var dataGridCombo;
var DxSourceCombo
$(() => {

    loadDataPosicionCombo()

    function loadDataPosicionCombo() {
        $.ajax({
            url: `/ColaDespacho/ListarCombosPosicion`,
            type: 'GET',
            async: false,
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                dataOP = JSON.parse(res.Datos)
                DxSourceCombo = dataOP
                loadGridPosicionCombo();
            }, complete: function (data) {
                //desbloqObject()
            }
        });
    }

    setInterval(() => {
        loadDataPosicionCombo();
    }, 5000);

})

