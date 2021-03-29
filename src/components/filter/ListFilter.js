import { makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { ListFilterWrapper, ItemFilterWrapper, LabelTab } from './FilterButton.style'
import { getTotalCountChecked } from './helper'

const ItemFilter = ({ name, count, active = false, ...child }) => {
  return (
    <ItemFilterWrapper {...child} active={active} count={count}>
      <span className='name'>{name}</span>
      <span className='count'>{count}</span>
    </ItemFilterWrapper>
  )
}

function a11yProps(index, tabClass, id) {
  return {
    id: `filter-tab-${id}-${index}`,
    'aria-controls': `filter-tabpanel-${id}-${index}`,
    classes: tabClass
  }
}

const useStyles = makeStyles({
  tabRoot: {
    minWidth: '50%'
  },
  tabsRoot: {
    backgroundColor: '#f7f8f9'
  },
  indicator: {
    width: '135px !important',
    backgroundColor: '#039be5',
    height: 4
  }
})

const ListFilter = (
  {
    listFilter,
    setActiveFilter,
    activeFilter,
    filterData,
    onResetAll,
    onCancel,
    onApply,
    setBridge,
    bridge,
    id,
  },
  ref
) => {
  const classes = useStyles()
  const checkboxFilter = listFilter.filter((res) => res.type === 'checkbox')
  const [totalInclude, totoalExclude] = getTotalCountChecked(checkboxFilter, filterData)

  const handleChange = (e, newValue) => {
    e.preventDefault()
    setBridge(newValue)
  }

  return (
    <ListFilterWrapper>
      <div>
        <Tabs
          classes={{
            root: classes.tabsRoot,
            indicator: classes.indicator
          }}
          value={bridge}
          onChange={handleChange}
        >
          <Tab
            label={<LabelTab count={totalInclude}>Include <span className='count'>{totalInclude}</span></LabelTab>}
            {...a11yProps(0, {
              root: classes.tabRoot
            }, id)}
          />
          <Tab
            label={<LabelTab count={totoalExclude}>Exclude <span className='count'>{totoalExclude}</span></LabelTab>}
            {...a11yProps(1, {
              root: classes.tabRoot
            }, id)}
          />
        </Tabs>
        <div ref={ref} className='list-item'>
          {listFilter.map((list, i) => {
            const length =
              filterData &&
              filterData[bridge] &&
              filterData[bridge][list.fieldName] &&
              filterData[bridge][list.fieldName].length || 0
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
      </div>
      <div className='footer'>
        <span onClick={onResetAll} className='btn reset-all'>
          Reset All
        </span>
        <div className='action'>
          <span onClick={onCancel} className='btn cancel'>
            Cancel
          </span>
          <span onClick={onApply} className='btn apply'>
            Apply
          </span>
        </div>
      </div>
    </ListFilterWrapper>
  )
}

export default forwardRef(ListFilter)
