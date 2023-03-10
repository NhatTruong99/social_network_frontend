import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
import {Bar, Doughnut, Pie, Line} from 'react-chartjs-2';
import { MONTHS } from "../../../utils/spUtils";
import StatiticsService from '../../../services/statitics.service';

function PostChart({published_years}) {

    const [yearSelected , setYearSelected] = useState();

    const [chartState,setChartState] = useState({
        labels: MONTHS,
        datasets: [{
          label: 'Total Post',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      })
        
      const [TotalPostPerYear , setTotalPostPerYear] = useState(0);
    
      const totalPostsPerMonth = (year)=>{  
            if(year)
            {
              StatiticsService.getTotalsPostPerMonth(year).then((res)=>{
                let listValue = res.data
                var value = []
                var totalyear = 0;
                listValue.forEach((item)=>{
                  value.push(item)
                  totalyear = totalyear + item
            
                })
                setTotalPostPerYear(totalyear)
                setChartState({
                labels: MONTHS,
                datasets: [{
                  label: 'Total Post',
                  data: value,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }]
              })
            })   
            }
     
      }
      
    
     useEffect(()=>{
        totalPostsPerMonth(new Date().getFullYear())

     },[])
      
      useEffect(() => {
    
        totalPostsPerMonth(yearSelected);
    }, [yearSelected]);


  return (
    <div className="card card-success mt-5">
    <div className="card-header">
      <h3 className="card-title">Posts published In {!yearSelected?new Date().getFullYear():yearSelected}</h3>
      <span className="float-right"> Total: {TotalPostPerYear}</span>

      
    
    </div>
    <div className="ms-4 mt-3">
    <span>Select year: </span>

    <select value={yearSelected} onChange={(e) => setYearSelected(e.target.value)}>
          {published_years && published_years.map( 
            (item) =>
            
            <option value={item} key={item.id}> {item}</option>
           )
          }
         
      </select>

    </div>
 
    <div className="card-body">
      <div className="chart"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
        <ul className='col-12'>
              {/* ?????i th??nh BarChart, LineChart, PieChart, DoughnutChart tu??? ??
              {/* Th??m th??? ul ????? hi???n th??? nhi???u Chart */}
              {/* col-..., mt-..., me-..., ... */}
          <Bar
              
                height={300}
                data = {chartState}
                options = {{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      stepValue: 1,
                      title: {
                        display: true,
                        text: 'Total Post'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                }
                }}
            />
      </ul>
      </div>
    </div>
    {/* /.card-body */}
  </div>
  )
}



export default PostChart
