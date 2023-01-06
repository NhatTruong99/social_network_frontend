import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
// eslint-disable-next-line no-unused-vars
import {Bar, Doughnut, Pie, Line} from 'react-chartjs-2';
import axios from "axios";
import "../../../App.css";
import UserService from "../../../services/user.service";
import PostService from "../../../services/post.service";
import GroupService from "../../../services/group.service";
import StatiticsService from '../../../services/statitics.service';
import { MONTHS } from "../../../utils/spUtils";
// Import hết luôn tránh bị lỗi lúc chuyển Chart
import "chart.js/auto";
import PostChart from './PostChart';
import UserChart from './UserChart';
import CommentChart from './CommentChart';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const Chart = () => {

    // Để phân biệt các Chart tránh đè dữ liệu lên nhau
    const [chartUser, setChartUser] = useState([]);

    const [users, setUsers] = useState([]);
    const [registered_years, setRegisteredYears] = useState([]);
    const [registered_months, setRegisteredMonths] = useState([]);
    const [totalUserYear, setTotalUserYear] = useState([]);
    const [totalUserMonth, setTotalUserMonth] = useState([]);
    const [selectedYearRegister, setSelectedYearRegister] = useState(2020);

    const [posts, setPosts] = useState([]);
    const [published_years, setPublishedYears] = useState([]);
    const [published_months, setPublishedMonths] = useState([]);
    const [totalPostYear, setTotalPostYear] = useState([]);
    const [totalPostMonth, setTotalPostMonth] = useState([]);
    const [selectedYearPublished, setSelectedYearPublished] = useState(2020);
    const [PostPerMonth, setTotalPostPerMonth] = useState([])
   
    const [groups, setGroups] = useState([]);

    const [year2Selected , setYear2Selected] = useState();



    var totalUserByYear =  {
    //  labels: chartUser.map(x => x.registeredDate), // Map để lấy dữ liệu cần hiển thị lên Chart
    //  labels: chartUser.map(x => x.username),
      labels: registered_years,
      datasets: [
      {
        label: 'Total User Register By Year',
     //  data: chartUser.map(x => x.id),
        data: totalUserYear,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }

  var totalUserByMonth =  {
      labels: registered_months,
      datasets: [
      {
        label: 'Total User Register By Month',
        data: totalUserMonth,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }

  var totalPostByYear =  {
      labels: published_years,
      datasets: [
      {
        label: 'Total Post Published By Year',
        data: totalPostYear,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }

  var totalPostByMonth =  {
      labels: published_months,
      datasets: [
      {
        label: 'Total Post Published By Month',
        data: totalPostMonth,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }


   

   

    const fetchYearRegister = async () => {
      await UserService.getYearByUser().then(response => {
          // console.log(response.data);
          setRegisteredYears(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countUserByYear = async () => {
      await UserService.countUserByYear().then(response => {
          // console.log(response.data)
          setTotalUserYear(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchMonthRegister = async (year) => {
      await UserService.getMonthByUser(year=selectedYearRegister).then(response => {
          // console.log(response.data)
          setRegisteredMonths(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countUserByMonth = async (year) => {
      await UserService.countUserByMonth(year=selectedYearRegister).then(response => {
          // console.log(response.data);
          setTotalUserMonth(response.data);
          
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchUser = async () => {
      await UserService.getAllUsers().then(response => {
          // console.log(response.data)
          setChartUser(response.data);
          setUsers(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchYearPublished = async () => {
      await PostService.getYearByPost().then(response => {
          // console.log(response.data);
          setPublishedYears(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countPostByYear = async () => {
      await PostService.countPostByYear().then(response => {
          // console.log(response.data)
          setTotalPostYear(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchMonthPublished = async (year) => {
      await PostService.getMonthByPost(year=selectedYearPublished).then(response => {
          // console.log(response.data)
          setPublishedMonths(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countPostByMonth = async (year) => {
      await PostService.countPostByMonth(year=selectedYearPublished).then(response => {
          // console.log(response.data);
          setTotalPostMonth(response.data);
          console.log(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchPost = async () => {
      await PostService.readAllPosts().then(response => {
          // console.log(response.data)
          setPosts(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchGroup = async () => {
      await GroupService.readAllGroups().then(response => {
          // console.log(response.data)
          setGroups(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };
  
    useEffect(() => {
      fetchYearPublished();
      fetchUser()
      fetchPost()
      fetchGroup()



    }, []);
  // First Chart
  



  return (
    // Thêm className = "content-wrapper" vào tránh Navbar che chữ
    <div className="">
      
      <section className="content">
        <div className="container-fluid">
               {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{users.length}</h3>
                <p style={{color: 'white'}}>User Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{posts.length}<sup style={{fontSize: 20}}></sup></h3>
                <p style={{color: 'white'}}>Posts Published</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3 style={{color: 'white'}}>{groups.length}</h3>
                <p style={{color: 'white'}}>Total Group</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
            </div>
            
          </div>
          <div className="col-lg-3 col-6">
          <div class="small-box bg-danger">
              <div className="inner">
                <h3 style={{color: 'white'}}>65</h3>

                <p style={{color: 'white'}}>Chua nghi ra</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              {/* <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a> */}
            </div>
          </div>
          {/* ./col */}
        </div>
 
        <PostChart published_years={published_years}/>
      
        <UserChart published_years={published_years}/>

        <CommentChart published_years={published_years}/>

      </div>
      
      
      </section>
    
    </div>
  )
}

export default Chart