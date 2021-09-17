import React,{useEffect, useState} from 'react'
import { Line } from "react-chartjs-2"




const TailorData = (data, turl) => {
    var caseRelation = {}
    var ErrorStat = ""

    console.log("TAILOR DATA RUNNING --------------------------------------------" )
    console.log("turl is", turl)
    if (turl === "https://disease.sh/v3/covid-19/historical/all?lastdays=90") {
        caseRelation = data
        console.log("case is true", data.cases)
      } else {
        if (Object. keys(data).length <= 1) {
        console.log("Empty Case Found", data)
        ErrorStat = "The Country you have chosen does not have publicly available data"
        console.log(ErrorStat)
        alert(ErrorStat)
        return [0,0,0,0, ErrorStat];
      } else {
        caseRelation = data.timeline
        console.log("bruh moment", data.timeline)
      }
      }
    let dates = []
    let casesStat = []
    let deathsStat = []
    let newcasesStat = [0,]
    let newdeathsStat = [0,]
    for (var date in caseRelation.cases) {
        dates.push(date)
        casesStat.push(caseRelation.cases[date])
      }
    for (var date in caseRelation.deaths) {
        deathsStat.push(caseRelation.deaths[date])
      }
    for (var date in caseRelation.cases) {
        if (date === Object.keys(caseRelation.cases)[0]) {
        console.log("New cases: first date has been encountered", caseRelation.deaths[date])
        continue;
      }
      var i = Object.keys(caseRelation.cases).indexOf(date)
      var newcases = caseRelation.cases[date] - caseRelation.cases[Object.keys(caseRelation.cases)[i-1]]
      newcasesStat.push(newcases)
      }
      for (var date in caseRelation.deaths) {
        if (date === Object.keys(caseRelation.deaths)[0]) {
        console.log("New deaths: first date has been encountered", caseRelation.deaths[date])
        continue;
      }
      var i = Object.keys(caseRelation.deaths).indexOf(date)
      var newdeaths = caseRelation.deaths[date] - caseRelation.deaths[Object.keys(caseRelation.cases)[i-1]]
      newdeathsStat.push(newdeaths)
      }
    return [dates,casesStat,newcasesStat,deathsStat,newdeathsStat,ErrorStat];
  };

function LineGraph(graphurl) {
    console.log("The URL used for the graph is",graphurl.graphurl)

    const [stats, setStats] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          await fetch((graphurl.graphurl))
            .then((response) => {
              return response.json();
            })
            .then((data) => {
                console.log("data lmao",data);
                const stat = TailorData(data,(graphurl.graphurl))
                setStats(stat)
              });
              
        };
    
        fetchData();
      }, [graphurl]);



    return (
        <div>
            <Line 
            
            data = {
                {labels: stats[0],
                datasets: [
                  {
                    label: "Total Cases",
                    data: stats[1],
                    fill: false,
                    borderColor: "rgba(249, 249, 0 ,1)"
                  },
                  {
                    label: "Total Deaths",
                    data: stats[3],
                    fill: false,
                    borderColor: "rgba(249, 0, 0, 1)"
                  },
                  {
                    label: "New Cases",
                    data: stats[2],
                    fill: false,
                    borderColor: "rgba(0, 0, 249, 1)"
                  },
                  {
                    label: "New Deaths",
                    data: stats[4],
                    fill: false,
                    borderColor: "rgba(30, 250, 165, 1)"
                  },
                ],
                options: {
                  plugins: {
                      subtitle: {
                          display: true,
                          text: String(stats[5])
                      }
                  }},
            }} />
        </div>
    )
}

export default LineGraph
