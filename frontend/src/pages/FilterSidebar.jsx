import React from "react";

export const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-3">
        Filter Jobs
      </h3>

      {/* Job Type */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Job Type
        </label>
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Location
        </label>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="New York, NY">New York, NY</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
    </div>
  );
};
