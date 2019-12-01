$(document).ready(function(){




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
                     { title: "選手名字",
                       defaultContent:""},
                     { title: "場均KDA",
                         defaultContent:"" },
                     { title: "場均R參團率",
                       defaultContent:"" },
                     { title: "場均擊殺",
                       defaultContent:""},
                     { title: "場均死亡",
                         defaultContent:""},
                     { title: "場均助攻",
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
                    type : 'bar'
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
