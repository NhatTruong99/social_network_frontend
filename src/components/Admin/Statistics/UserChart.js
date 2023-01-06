import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
import {Bar, Doughnut, Pie, Line} from 'react-chartjs-2';
import { MONTHS } from "../../../utils/spUtils";
import StatiticsService from '../../../services/statitics.service';

function UserChart({published_years}) {

    const [yearSelected , setYearSelected] = useState();

    const [chartState,setChartState] = useState({
        labels: MONTHS,
        datasets: [{
          label: 'Total User',
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
        
      const [TotalPerYear , setTotalPerYear] = useState(0);
    
      const totalUsersPerMonth = (year)=>{  
            if(year)
            {
              StatiticsService.getTotalsUserPerMonth(year).then((res)=>{
                let listValue = res.data
                var value = []
                var totalyear = 0;
                listValue.forEach((item)=>{
                  value.push(item)
                  totalyear = totalyear + item
            
                })
                setTotalPerYear(totalyear)
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
        totalUsersPerMonth(new Date().getFullYear())

     },[])
      
      useEffect(() => {
    
        totalUsersPerMonth(yearSelected);
    }, [yearSelected]);


  return (
    <div className="card card-success mt-5">
    <div className="card-header">
      <h3 className="card-title">User registered In {!yearSelected?new Date().getFullYear():yearSelected}</h3>
      <span className="float-right"> Total: {TotalPerYear}</span>
     
   
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
              {/* Đổi thành BarChart, LineChart, PieChart, DoughnutChart tuỳ ý
              {/* Thêm thẻ ul để hiển thị nhiều Chart */}
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



export default UserChart
