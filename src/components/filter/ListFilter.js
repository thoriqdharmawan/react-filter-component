import React, {forwardRef} from 'react'
import {ListFilterWrapper, ItemFilterWrapper} from './FilterButton.style'

const ItemFilter = ({name, count, active = false, ...child}) => {
  return (
    <ItemFilterWrapper {...child} active={active} count={count}>
      <span className="name">{name}</span>
      <span className="count">{count}</span>
    </ItemFilterWrapper>
  )
}

const ListFilter = (
  {
    listFilter,
    setActiveFilter,
    activeFilter,
    filterData,
    onResetAll,
    onCancel,
    onApply,
  },
  ref
) => {
  return (
    <ListFilterWrapper>
      <div ref={ref} className="list-item">
        {listFilter.map((list, i) => {
          const length =
            filterData &&
            filterData[list.fieldName] &&
            filterData[list.fieldName].length
          return (
            <ItemFilter
              active={list.fieldName === activeFilter.fieldName}
              onClick={() => setActiveFilter(list)}
              key={`${i}-${list.fieldName}`}
              name={list.name}
              count={(length > 99 ? '99+' : length) || 0}
            />
          )
        })}
      </div>
      <div className="footer">
        <span onClick={onResetAll} className="btn reset-all">
          Reset All
        </span>
        <div className="action">
          <span onClick={onCancel} className="btn cancel">
            Cancel
          </span>
          <span onClick={onApply} className="btn apply">
            Apply
          </span>
        </div>
      </div>
    </ListFilterWrapper>
  )
}

export default forwardRef(ListFilter)
