import React from 'react'
import { TypeFilterWrapper } from './FilterButton.style'
import AgeType from './type-filter/AgeType'
import CheckboxType from './type-filter/CheckboxType'
import DateType from './type-filter/DateType'
import SalaryType from './type-filter/SalaryType'

export default function TypeFilter({
  activeFilter,
  setFilterData,
  filterData,
  height,
  bridge,
  globalNin,
  setGlobalNin
}) {
  const renderType = ({
    activeFilter,
    setFilterData,
    filterData,
    bridge,
    setGlobalNin,
    globalNin
  }) => {
    const { type, utils } = activeFilter
    switch (type) {
      case 'checkbox':
        return (
          <CheckboxType
            height={height}
            activeFilter={activeFilter}
            setFilterData={setFilterData}
            filterData={filterData}
            bridge={bridge}
            setGlobalNin={setGlobalNin}
            globalNin={globalNin}
          />
        )
      case 'date':
        return (
          <DateType
            activeFilter={activeFilter}
            setFilterData={setFilterData}
            filterData={filterData}
            utils={utils}
            bridge={bridge}
          />
        )
      case 'age':
        return (
          <AgeType
            filterData={filterData}
            activeFilter={activeFilter}
            setFilterData={setFilterData}
            bridge={bridge}
          />
        )
      case 'salary':
        return (
          <SalaryType
            filterData={filterData}
            activeFilter={activeFilter}
            setFilterData={setFilterData}
            bridge={bridge}
          />
        )
      default:
        return <p />
    }
  }

  return (
    <TypeFilterWrapper>
      {renderType({
        activeFilter,
        setFilterData,
        filterData,
        bridge,
        globalNin,
        setGlobalNin
      })}
    </TypeFilterWrapper>
  )
}
