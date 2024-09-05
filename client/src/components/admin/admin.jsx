import React, { useState, useEffect } from 'react';
import { getData, getData2 } from '../../services/useHttp';
import "./AdminPanel.css"

const ItemProductForm = () => {
    const [itemProduct, setItemProduct] = useState({
        _id: '',
        img: '',
        cost: '',
        name: '',
        species: '',
        category: '',
        subcategory: '',
        colors: [{ color: '', image: '' }],
        width: '',
        height: '',
        countryOfManufacture: '',
        materials: ''
    });

    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'colors') {
            const newColors = [...itemProduct.colors];
            newColors[index].color = value;
            setItemProduct({ ...itemProduct, colors: newColors });
        } else if (name === 'colorImage') {
            const newColors = [...itemProduct.colors];
            newColors[index].image = value;
            setItemProduct({ ...itemProduct, colors: newColors });
        } else {
            setItemProduct({ ...itemProduct, [name]: value });
        }
    };

    const addColorField = () => {
        setItemProduct({
            ...itemProduct,
            colors: [...itemProduct.colors, { color: '', image: '' }],
        });
    };

    const removeColorField = (index) => {
        const newColors = [...itemProduct.colors];
        newColors.splice(index, 1);
        setItemProduct({ ...itemProduct, colors: newColors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const colorsData = itemProduct.colors.map(color => ({ color: color.color, image: color.image }));
            const requestBody = { ...itemProduct, colors: colorsData };
            delete requestBody._id;
    
            const response = await fetch(`http://13.53.147.216/api/itemProducts${isEditing ? `/${itemProduct._id}` : ''}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                setItems(isEditing ? items.map(item => item._id === updatedItem._id ? updatedItem : item) : [...items, updatedItem]);
                setItemProduct({
                    _id: '',
                    img: '',
                    cost: '',
                    name: '',
                    species: '',
                    category: '',
                    subcategory: '',
                    colors: [{ color: '', image: '' }],
                    width: '',
                    height: '',
                    countryOfManufacture: '',
                    materials: ''
                });
                setIsEditing(false);
            } else {
                console.error('Failed to save item product:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving item product:', error);
        }
    };

    const handleEdit = (item) => {
        setItemProduct({
            _id: item._id,
            img: item.img,
            cost: item.cost,
            name: item.name,
            species: item.species,
            category: item.category,
            subcategory: item.subcategory,
            colors: item.colors || [{ color: '', image: '' }],
            width: item.width || '',
            height: item.height || '',
            countryOfManufacture: item.countryOfManufacture || '',
            materials: item.materials || ''
        });
        setIsEditing(true);
    };

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://13.53.147.216/api/itemProducts/${_id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setItems(items.filter(item => item._id !== _id));
            } else {
                console.error('Failed to delete item product:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting item product:', error);
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('http://13.53.147.216/api/itemProducts');
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            } else {
                console.error('Failed to fetch item products:', response.statusText);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="admin-panel">
            <h2>Item Product Form</h2>
            <form onSubmit={handleSubmit} className="item-product-form">
                <input type="text" name="_id" value={itemProduct._id} onChange={handleChange} placeholder="ID" disabled />
                <input type="text" name="img" value={itemProduct.img} onChange={handleChange} placeholder="Image URL" />
                <input type="text" name="cost" value={itemProduct.cost} onChange={handleChange} placeholder="Cost" />
                <input type="text" name="name" value={itemProduct.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="species" value={itemProduct.species} onChange={handleChange} placeholder="Species" />
                <input type="text" name="category" value={itemProduct.category} onChange={handleChange} placeholder="Category" />
                <input type="text" name="subcategory" value={itemProduct.subcategory} onChange={handleChange} placeholder="Subcategory" />
                <input type="text" name="width" value={itemProduct.width} onChange={handleChange} placeholder="Width" />
                <input type="text" name="height" value={itemProduct.height} onChange={handleChange} placeholder="Height" />
                <input type="text" name="countryOfManufacture" value={itemProduct.countryOfManufacture} onChange={handleChange} placeholder="Country of Manufacture" />
                <input type="text" name="materials" value={itemProduct.materials} onChange={handleChange} placeholder="Materials" />
                <div>
                    <label>Colors:</label>
                    {itemProduct.colors.map((colorField, index) => (
                        <div key={index} className="color-field">
                            <input type="text" name="colors" value={colorField.color} onChange={(e) => handleChange(e, index)} placeholder={`Color ${index + 1}`} />
                            <input type="text" name="colorImage" value={colorField.image} onChange={(e) => handleChange(e, index)} placeholder={`Image URL for Color ${index + 1}`} />
                            {index > 0 && <button type="button" onClick={() => removeColorField(index)}>Remove</button>}
                        </div>
                    ))}
                    <button type="button" onClick={addColorField}>Add Color</button>
                </div>
                <button type="submit">{isEditing ? 'Update Item Product' : 'Add Item Product'}</button>
            </form>
            <h2>Existing Item Products</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item._id} - {item.name} - {item.cost} - {item.category} - {item.subcategory}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};



const FilterForm = () => {
    const [filter, setFilter] = useState({
        id: '',
        name: '',
        category: '',
        subfilters: [{ id: '', filterName: '', name: '' }]
    });

    const [filters, setFilters] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchFilters = async () => {
            const data = await getData2();
            if (data) setFilters(data);
        };

        fetchFilters();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleSubfilterChange = (index, e) => {
        const { name, value } = e.target;
        const newSubfilters = filter.subfilters.map((subfilter, subIndex) => {
            if (subIndex === index) {
                return { ...subfilter, [name]: value };
            }
            return subfilter;
        });
        setFilter({ ...filter, subfilters: newSubfilters });
    };

    const addSubfilter = () => {
        setFilter({
            ...filter,
            subfilters: [...filter.subfilters, { id: '', filterName: '', name: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const response = await fetch(`http://13.53.147.216/api/filters${isEditing ? `/${filter.id}` : ''}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filter)
            });

            if (response.ok) {
                const updatedFilter = await response.json();
                setFilters(isEditing ? filters.map(f => f.id === updatedFilter.id ? updatedFilter : f) : [...filters, updatedFilter]);
                setFilter({
                    id: '',
                    name: '',
                    category: '',
                    subfilters: [{ id: '', filterName: '', name: '' }]
                });
                setIsEditing(false);
            } else {
                console.error('Failed to save filter:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving filter:', error);
        }
    };

    const handleEdit = (filter) => {
        setFilter(filter);
        setIsEditing(true);
    };

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://13.53.147.216/api/filters/${_id}`, { method: 'DELETE' });
    
            if (response.ok) {
                setFilters(filters.filter(filter => filter._id !== _id));
            } else {
                console.error('Failed to delete filter:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting filter:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Filter Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" value={filter.id} onChange={handleChange} placeholder="ID" disabled={isEditing} />
                <input type="text" name="name" value={filter.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="category" value={filter.category} onChange={handleChange} placeholder="Category" />
                {filter.subfilters.map((subfilter, index) => (
                    <div key={index} className="color-field">
                        <input type="text" name="id" value={subfilter.id} onChange={(e) => handleSubfilterChange(index, e)} placeholder="Subfilter ID" />
                        <input type="text" name="filterName" value={subfilter.filterName} onChange={(e) => handleSubfilterChange(index, e)} placeholder="Subfilter Name" />
                        <input type="text" name="name" value={subfilter.name} onChange={(e) => handleSubfilterChange(index, e)} placeholder="Subfilter Category" />
                    </div>
                ))}
                <button type="button" onClick={addSubfilter}>Add Subfilter</button>
                <button type="submit">{isEditing ? 'Update Filter' : 'Add Filter'}</button>
            </form>
            <h2>Existing Filters</h2>
            <ul>
                {filters.map(filter => (
                    <li key={filter._id}>
                        {filter.name} - {filter.category}
                        <ul className="subfilters">
                            {filter.subfilters && filter.subfilters.map(subfilter => (
                                <li key={subfilter.id}>{subfilter.filterName} - {subfilter.name}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleEdit(filter)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(filter._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};




export { ItemProductForm, FilterForm };
