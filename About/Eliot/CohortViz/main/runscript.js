var pcz = d3.parcoords()("#parcoord")
var pcz2 = d3.parcoords()("#parcoord2")

// load csv file and create the chart
d3.csv('./data/FINAL.csv', function(data) {
  var colorgen = d3.scale.category20();
  var colors = {};
  var thingy = _(data).chain()
    .pluck('StartMajor')
    .uniq()
    .each(function(d, i){
		colors[d] = colorgen(i);
		}
	 );

  var color = function(d) {return colors[d.StartMajor]; };

// slickgrid needs each data element to have an id
  data.forEach(function(d,i) { d.id = d.id || i; });
  
  pcz
    .data(data) 
    .color(color)
    .showControlPoints(false)
    .alpha(0.5)
    .margin({top:30, left:30, bottom:30, right:0})
    .mode("queue")
    .rate(100)
    .hideAxis(["StartGPA","gF1","gF2","gF+","gP1","gP2","gP+","gJ1","gJ2","gJ+","gS1","gS2","gS+", "id"])
    .render()
    .brushMode("1D-axes")// enable brushing
    .reorderable()
    .bundlingStrength(0.8) // set bundling strength
    .smoothness(0.2)
    .bundleDimension("StartGPA")

  //pcz.svg.selectAll("text").style("font", "20px sans-serif")


    //DOING SLOCKGRID THINGS NOW
  var column_keys = d3.keys(data[0]);
  var columns = column_keys.map(function(key,i) {
    return {
      id: key,
      name: key,
      field: key,
      sortable: true
    }
  });

  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    multiColumnSort: false
  };

  var dataView = new Slick.Data.DataView();
  var grid = new Slick.Grid("#grid", dataView, columns, options);
  var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));

  // wire up model events to drive the grid
  dataView.onRowCountChanged.subscribe(function (e, args) {
    grid.updateRowCount();
    grid.render();
  });

  dataView.onRowsChanged.subscribe(function (e, args) {
    grid.invalidateRows(args.rows);
    grid.render();
  });

  // column sorting
  var sortcol = column_keys[0];
  var sortdir = 1;

  function comparer(a, b) {
    var x = a[sortcol], y = b[sortcol];
    return (x == y ? 0 : (x > y ? 1 : -1));
  }
  
  // click header to sort grid column
  grid.onSort.subscribe(function (e, args) {
    sortdir = args.sortAsc ? 1 : -1;
    sortcol = args.sortCol.field;

    if ($.browser.msie && $.browser.version <= 8) {
      dataView.fastSort(sortcol, args.sortAsc);
    } else {
      dataView.sort(comparer, args.sortAsc);
    }
  });

  // highlight row in chart
  grid.onMouseEnter.subscribe(function(e,args) {
    var i = grid.getCellFromEvent(e).row;
    var d = pcz.brushed() || data;
    pcz.highlight([d[i]]);
  });
  grid.onMouseLeave.subscribe(function(e,args) {
    pcz.unhighlight();
  });

  // fill grid with data
  gridUpdate(data);

  // update data table on brush event
  pcz.on("brush", function(d) {
    pcz2.data(d);
    pcz2.render();
    gridUpdate(d);
  });

  function gridUpdate(data) {
    dataView.beginUpdate();
    dataView.setItems(data);
    dataView.endUpdate();
  };
	
    var select = d3.select("#bundleDimension").append("select").on("change", changeBundle);
    
    var options = select.selectAll('option')
    .data(pcz.dimensions().concat(pcz.hideAxis()));
    
    options
    .enter()
    .append("option")
    .attr("value", function(d) {return d;})
    .text(function(d) {return d;});
    
    function changeBundle() {
	pcz.bundleDimension(this.value).render();
	}


    d3.select('#btnReset').on('click', function() {pcz.brushReset();gridUpdate(data);})
    d3.select('#sltPredicate').on('change', function() {
	pcz.brushPredicate(this.value);
    });
});







// load csv file and create the chart
d3.csv('./data/FINAL.csv', function(data2) {
  var colorgen2 = d3.scale.category20();
  var colors2 = {};
  var thingy2 = _(data2).chain()
    .pluck('StartMajor')
    .uniq()
    .each(function(d2, i2){
		colors2[d2] = colorgen2(i2);
		}
	 );

  var color2 = function(d2) {return colors2[d2.StartMajor]; };

  // slickgrid needs each data element to have an id
  data2.forEach(function(d,i) { d.id = d.id || i; });
  
  pcz2
    .data(data2) 
    .color(color2)
    .alpha(0.4)
    .margin({top:30, left:30, bottom:30, right:0})
    .mode("queue")
    .rate(100)
    .hideAxis(["Fa/Sp_Year","StartMajor","F1","F2","F+","P1","P2","P+","J1","J2","J+","S1","S2","S+","isFem","StartAge", "Ethnicity", "id"])
    .render()
    .brushMode("1D-axes")// enable brushing
    .reorderable()
    .bundlingStrength(0.3) // set bundling strength
    .smoothness(0.1)
    .bundleDimension("StartGPA")


  //pcz2.svg.selectAll("text").style("font", "9px sans-serif")
});


/* Potential future uploading support
// CSV Uploader
var uploader = document.getElementById("uploader");  
var reader = new FileReader();

reader.onload = function(e) {
  var contents = e.target.result;
  var data = d3.csv.parse(contents);
  pcz(data);
  pcz2(data);

  // remove button, since re-initializing doesn't work for now
  uploader.parentNode.removeChild(uploader);
};

uploader.addEventListener("change", handleFiles, false);  

function handleFiles() {
  var file = this.files[0];
  reader.readAsText(file);
};
*/
