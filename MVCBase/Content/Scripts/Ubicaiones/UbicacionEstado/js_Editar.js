$(document).ready(function () {

    CargarPickerColores();

});

function CargarPickerColores() {
    $("#COLOR").kendoColorPicker({
        value: "#ffffff",
        buttons: false
    });
}