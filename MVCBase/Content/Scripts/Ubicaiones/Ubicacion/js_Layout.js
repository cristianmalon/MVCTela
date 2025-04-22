var dimension_cells = new Array();
var dimension_col = null;

var i = 1;
// First, scan first row of headers for the "Dimensions" column.
$("#gridLayout").find('th').each(function () {
    if ($(this).text() == 'Pabellon') {
        dimension_col = i;
    }
    i++;
});

// first_instance holds the first instance of identical td
var first_instance = null;
var rowspan = 1;
// iterate through rows
$("#gridLayout").find('tr.parent-grid-row').each(function () {

    // find the td of the correct column (determined by the dimension_col set above)
    var dimension_td = $(this).find('td.parent-grid-column:nth-child(' + dimension_col + ')');

    if (first_instance == null) {
        // must be the first row
        first_instance = dimension_td;
    } else if (dimension_td.text() == first_instance.text()) {
        // the current td is identical to the previous
        // remove the current td
        dimension_td.remove();
        ++rowspan;
        // increment the rowspan attribute of the first instance
        first_instance.attr('rowspan', rowspan);
    } else {
        // this cell is different from the last
        first_instance = dimension_td;
        rowspan = 1;
    }
});
