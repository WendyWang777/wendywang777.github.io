$(document).ready(function(){

    $("button#hide_h2").click(function() {
        $("h2").hide(500);
    });

    $("button#show_h2").click(function() {
        $("h2").show(300);
        $("h2").css("color","blue");
        $("h2").html("You clicked me hard.");
    });

    $("button#clear_screen").click(function() {
        var $x = $("container");
        $x.empty();
    });

    $("button#get_data").click(function() {
        var items = [];
        var i = 0;
        var airtable_read_endpoint = "https://api.airtable.com/v0/apprsp3Ywu5addhw4/TOP50PLAYERS?api_key=keylSBEfApc4bXPo6";
        var dataSet = [];
        $.getJSON(airtable_read_endpoint, function(result) {
               $.each(result.records, function(key,value) {
                   items = [];
                       items.push(value.fields.player_name);
                       items.push(value.fields.player_kda);
                       items.push(value.fields.player_rate);
                       items.push(value.fields.player_kill);
                       items.push(value.fields.player_death);
                       items.push(value.fields.player_assist);
                       dataSet.push(items);
                       console.log(items);
                }); // end .each
                console.log(dataSet);

             $('#table1').DataTable( {
                 data: dataSet,
                 retrieve: true,
                 columns: [
                     { title: "Player Name",
                       defaultContent:""},
                     { title: "KDA",
                         defaultContent:"" },
                     { title: "RATE",
                       defaultContent:"" },
                     { title: "KILL",
                       defaultContent:""},
                     { title: "DEATH",
                         defaultContent:""},
                     { title: "ASSIST",
                       defaultContent:""},
                 ]
             } );
        }); // end .getJSON
     }); // end button

     $("button#get_data2").click(function() {
      var items = [];
      var i = 0;
      var airtable_read_endpoint = "https://api.airtable.com/v0/apprsp3Ywu5addhw4/ROLLUP?api_key=keylSBEfApc4bXPo6";
      var dataSet = [];
      $.getJSON(airtable_read_endpoint, function(result) {
             $.each(result.records, function(key,value) {
                 items = [];
                     items.push(value.fields.Name);
                     items.push(value.fields.total_number);
                     dataSet.push(items);
                     console.log(items);
              }); // end .each
              console.log(dataSet);

           $('#table2').DataTable( {
               data: dataSet,
               retrieve: true,
               columns: [
                   { title: "Team Name",
                     defaultContent:""},
                   { title: "Total Number",
                       defaultContent:"" },
               ]
           } );

           var chart = c3.generate({
                data: {
                    columns: dataSet,
                    type : 'donut'
                },
                axis: {
                  x: {label: 'Team name'},
                  y: {label: '# of players'}
                },
                bar: {
                    title: "Number of Top Players in each team:",
                }
            });

      }); // end .getJSON

   }); // end button

}); // document ready
