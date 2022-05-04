

//Table Styles
const headerStyle = {
  align: "center",
  fill: { color: ["gray"] },
  font: { family: "Roboto", size: 15, color: "white" },
  columnwidth: 200
}
const cellStyle = {
  align: ["center"],
  line: { color: "gray", width: 1 },
  font: { family: "Roboto", size: 15, color: "gray" }
}

function plotGroupAggArtist(data, layout_title, div_id) {

  let layout = {
    title: layout_title
  }
  let config = {
      tableHeaderStyle: headerStyle,
      tableCellStyle: cellStyle
  }

  let df = new dfd.DataFrame(data)
  let grp = df.groupby(["Artist"])
  grp.agg({ Song_Age:"mean",
            Release_Year:"max",
            Popularity:"mean",
            Song_Duration:"mean" }).sortValues("Artist", { ascending: true})
    .plot(div_id).table({ config, layout })
            

}

function plotBar(data, index, div_id) {
  const df = new dfd.DataFrame(data, index)
        df.plot(div_id).bar()
}

function plotScatterNCols(data,
  layout_title,
  div_id
  ) {
     let layout = {
         title: layout_title
       }

    let df = new dfd.DataFrame(data)
    df.plot(div_id).scatter({ layout })
}


function plotScatter(data,
    layout_title,
    layout_x_axis_title,
    layout_y_axis_title,
    x_axis_column_name,
    y_axis_column_name,
    div_id
    ) {
       let layout = {
           title: layout_title,
           xaxis: {
             title: layout_x_axis_title
           },
           yaxis: {
             title: layout_y_axis_title
           }
         }

         let config = {
            x: x_axis_column_name, y: y_axis_column_name
        }

         let df = new dfd.DataFrame(data)

       df.plot(div_id).scatter({ config, layout })
 }


function plotHist(data,
    layout_title,
    layout_x_axis_title,
    layout_y_axis_title,
    column_name,
    div_id
    ) {
       let layout = {
           title: layout_title,
           xaxis: {
             title: layout_x_axis_title
           },
           yaxis: {
             title: layout_y_axis_title
           }
         }
       let df = new dfd.DataFrame(data)
       df[column_name].plot(div_id).hist({ layout })

 }


function plotGroupbyLine(data,
     layout_title,
     layout_x_axis_title,
     layout_y_axis_title,
     config_columns,
     groupby_columns,
     groupby_col_columns,
     index_column,
     div_id
     ) {
        let layout = {
            title: layout_title,
            xaxis: {
              title: layout_x_axis_title
            },
            yaxis: {
              title: layout_y_axis_title
            }
          }
        let config = {
            columns: config_columns
        }
        let df = new dfd.DataFrame(data)
        df.groupby(groupby_columns)
            .col(groupby_col_columns)
            .count()
            .setIndex(index_column)
            .plot(div_id)
            .line({ config, layout })

  }

function plotGroupbyTable(data,
    layout_title,
    groupby_columns,
    groupby_col_columns,
    sort_columns,
    ascending,
    div_id
    ) {


        let layout = {
            title: layout_title
          }
        let config = {
            tableHeaderStyle: headerStyle,
            tableCellStyle: cellStyle
        }

        let df = new dfd.DataFrame(data)
        df = df.groupby(groupby_columns)
            .col(groupby_col_columns)
            .count()
            .sortValues(sort_columns, { ascending: ascending})
            
        df.plot(div_id)
            .table({ config, layout })

    }

    function plotGroupbyPie(data,
        layout_title,
        groupby_columns,
        groupby_col_columns,
        config_labels_column,
        config_values_column,
        div_id
        ) {
            let layout = {
                title: layout_title
              }
            let config = {
                values: config_values_column,
                labels: config_labels_column
            }

            let df = new dfd.DataFrame(data)
            df.groupby(groupby_columns)
                .col(groupby_col_columns)
                .count()
                .plot(div_id)
                .pie({ config, layout })
                
        }