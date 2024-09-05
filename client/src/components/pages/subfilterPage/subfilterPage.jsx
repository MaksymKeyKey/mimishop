import ListFilterItem from "../../common/layout/listItem/listFilterItem"
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from "../../common/header/header";
import Footer from "../../common/footer/footer";
import { Link } from "react-router-dom";
import Filters from "../../filters/filters";

const SubFilterPage = () => {
    const location = useLocation();
    const filter = location.state?.subfilter.name;
    const subfilters = location.state?.subfilters

    const [activeFilter, setActiveFilter] = useState(filter);




    const handleClick = (subfilter) => {
        setActiveFilter(subfilter.name);
    };

    return (
        <div>
            <div className='header-stiky'>
                <Header />
            </div>
            <div className="menu-header">
                <Filters />
            </div>
            <div className="main-body">
                <div className="container-catalog">
                    <ul className="subs-block">
                        {subfilters?.map((subfilter, id) => (
                            <Link
                                key={id}
                                to={`/itemFilterPage/${subfilter.name}`}
                                state={{ subfilter, subfilters }}
                                className="subfilter-link"
                            >
                                <li className={`subfilter-item ${activeFilter === subfilter.name ? 'active' : ''}`}
                                    onClick={() => handleClick(subfilter)}
                                >
                                    {subfilter.filterName}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <ListFilterItem subcategory="subcategory" filterName={filter} />
                </div>


            </div>
            <div style={{ backgroundColor: "#F4F4F4" }}>
                <Footer />
            </div>
        </div>
    )
}

export default SubFilterPage;