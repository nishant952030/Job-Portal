import React, { useState } from 'react';

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});

    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi, NCR", "Pune", "Bangalore", "Mumbai", "Chennai", "Hyderabad"]
        },
        {
            filterType: "Job Type",
            array: ["Full-time", "Part-time", "Contract", "Internship"]
        },
        {
            filterType: "Experience Level",
            array: ["Entry Level", "Mid Level", "Senior Level", "Director"]
        },
        {
            filterType: "Industry",
            array: ["Technology", "Finance", "Healthcare", "Education", "Manufacturing"]
        },
        {
            filterType: "Salary Range",
            array: ["< 3 Lakhs", "3 - 6 Lakhs", "6 - 10 Lakhs", "10 - 15 Lakhs", "15 Lakhs+"]
        }
    ];

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prevFilters => {
            const currentSelections = prevFilters[filterType] || [];
            const newSelections = currentSelections.includes(value)
                ? currentSelections.filter(item => item !== value)
                : [...currentSelections, value];

            return {
                ...prevFilters,
                [filterType]: newSelections
            };
        });
    };

    return (
        <div className="filter-card text-start">
            {filterData.map((filter, index) => (
                <div key={index} className="filter-group flex flex-col">
                    <h3 className='font-bold text-lg'>{filter.filterType}</h3>
                    <hr />
                    {filter.array.map((item, idx) => (
                        <div key={idx} className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange(filter.filterType, item)}
                                checked={(selectedFilters[filter.filterType] || []).includes(item)}
                            />
                            <label className="filter-option ml-2">{item}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
