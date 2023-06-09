import ResponsiveAppBar from "../../components/Navbar";
import Actions from "./Buttons";
import WarningsDetails from "./bell";
import Categories from "./List";
import SearchComp from "../../components/Search";
import Breadcrumb from "../../components/bread";
import AddCategory from "./List/AddCategory";
// import FoldersFiles from "./#foldersFiles";
import { useState } from "react";

const Category = () => {
    const [listOfCategory, setListOfCategory] = useState([]);
    const [clean, setClean] = useState(true);

    const fetchData = (list) => {
        setListOfCategory(list)
    }
    const addNewCategory = (category) => {
        setListOfCategory([...listOfCategory, category])
        console.log(listOfCategory)

    }
    const cleanFunc = () => {
        setClean(false)
    }
    return (<>
        <ResponsiveAppBar></ResponsiveAppBar>
        <h1>דף ראשי</h1>
        <SearchComp clean={cleanFunc}></SearchComp>
        {/* <AddCategory addOne={addNewCategory}/> */}
        <WarningsDetails></WarningsDetails>
        <Breadcrumb></Breadcrumb>
        
        {clean && <>
            <Categories></Categories>
        </>
        }
        {/* <Categories></Categories> */}
    </>)
}
export default Category;