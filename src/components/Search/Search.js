import { useEffect, useState} from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import SearchService from "../../services/SearchService"
import {Link } from "react-router-dom";
import UserChild from "./UserChild";
import PostChild from "./PostChild";

function Search(){
    const [listSearch,setlistSearch] = useState()
    const {keyword} = useParams();

    console.log(keyword);

    useEffect(() => {
        SearchService.getSearchResult(keyword)
            .then(response => setlistSearch(response.data))
    },[keyword])

    console.log(listSearch);
    return (
        <div className="container">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-8 col-xl-10">
                    {listSearch &&
                        <div >
                        <h5 className="mb-3" >Kết quả tìm kiếm cho từ khóa: <span style={{color: "red"}}>           {listSearch.keyword}
                        </span></h5>
                        
                        {/* user result */}
                        <div className="central-meta">
                            <div class="frnds">
                                <h5><b>Mọi người</b></h5>
                                <div class="tab-content">
                                    <div class="tab-pane active fade show " id="frends" >
                                        <ul class="nearby-contct">
                                        {listSearch.userProfiles.map((user) =>(
                                            <UserChild user={user}/>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* post result */}
                        <div className="central-meta">
                            <div class="frnds">
                                <h5><b>Bài post</b></h5>
                                <div class="tab-content">
                                    <div class="tab-pane active fade show " id="frends" >
                                        <ul class="nearby-contct">
                                        {listSearch.posts.map((postWithUser) =>(
                                            <PostChild postWithUser={postWithUser}/>
                                        ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>}
            {listSearch && <div className="result_search">
            </div>}
            
        
                        </div>
                    </div>
                </div>
            </div>
        
        
    )
}

export default Search
