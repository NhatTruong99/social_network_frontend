import rootInstance from "./utilsService/rootInstance";



const getAllProvinces = async () =>{
    return rootInstance.get("/location/all-provinces");
}

const getDistricts = async (province_code) =>{
    return rootInstance.get("/location/get-districts/" + province_code);
}

const getWards = async (district_code) =>{
    return rootInstance.get("/location/get-wards/" + district_code);
}

const LocationService = {
    getAllProvinces,
    getDistricts,
    getWards

};
  
export default LocationService;

