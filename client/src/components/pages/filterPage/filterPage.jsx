import ListFilterItem from "../../common/layout/listItem/listFilterItem"
import { useLocation } from 'react-router-dom';
import Header from "../../common/header/header";
import Footer from "../../common/footer/footer";

const FilterPage = () => {
    const location = useLocation();
    const filter = location.state?.filter.category;

    return (
        <div>
            <Header />
            <ListFilterItem category="category" categoryName={filter} />
            <div style={{ backgroundColor: "#F4F4F4" }}>
                <Footer />
            </div>
        </div>

    )
}

export default FilterPage;