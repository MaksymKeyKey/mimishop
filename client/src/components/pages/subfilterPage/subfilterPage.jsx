import ListFilterItem from "../../common/layout/listItem/listFilterItem"
import { useLocation } from 'react-router-dom';
import Header from "../../common/header/header";
import Footer from "../../common/footer/footer";

const SubFilterPage = () => {
    const location = useLocation();
    const filter = location.state?.item.name;

    return (
        <div>
            <Header />
            <ListFilterItem subcategory="subcategory" filterName={filter} />
            <div style={{ backgroundColor: "#F4F4F4" }}>
                <Footer />
            </div>
        </div>
    )
}

export default SubFilterPage;