import React from 'react'
import {TypeFilterWrapper} from './FilterButton.style'
import AgeType from './type-filter/AgeType'
import CheckboxType from './type-filter/CheckboxType'
import DateType from './type-filter/DateType'
import SalaryType from './type-filter/SalaryType'

export default function TypeFilter({
  activeFilter,
  setFilterData,
  filterData,
  height,
}) {
  const renderType = (activeFilter, setFilterData, filterData) => {
    const {type, utils} = activeFilter
    switch (type) {
      case 'checkbox':
        return (
          <CheckboxType
            height={height}
            activeFilter={activeFilter}
            setFilterData={setFilterData}
            filterData={filterData}
          />
        )
      case 'date':
        return (
          <DateType
            activeFilter={activeFilter}
            setFilterData={setFilterData}
            filterData={filterData}
            utils={utils}
          />
        )
      case 'age':
        return (
          <AgeType
            filterData={filterData}
            activeFilter={activeFilter}
            setFilterData={setFilterData}
          />
        )
      case 'salary':
        return (
          <SalaryType
            filterData={filterData}
            activeFilter={activeFilter}
            setFilterData={setFilterData}
          />
        )
      default:
        return <p></p>
    }
  }

  return (
    <TypeFilterWrapper>
      {renderType(activeFilter, setFilterData, filterData)}
    </TypeFilterWrapper>
  )
}
