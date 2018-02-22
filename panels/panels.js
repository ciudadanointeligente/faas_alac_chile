function main(params) {// Store  the HTML to send in this variable
    var html = "";

    // The two main panels
    html = '<div class="col-md-3" id="side"></div>' +
        '<div class="col-md-9" id="main"></div>';

    // The row-fluid
    html = '<div class="row-fluid">' + html + "</div>";

    // The container-fluid
    html = '<div class="container-fluid">' + html + "</div>";
    return {
      "html": html,
      "js": '$scope.getHtml("side", "sidepanel"); $scope.getHtml("main", "mainpanel");'
  };
}
exports.main = main;
