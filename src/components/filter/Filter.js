import {makeStyles, Popover} from '@material-ui/core'
import React, {useState} from 'react'
import {useGetDimensions} from './hooks/useGetDimensions'
// import { FilterWrapper } from './FilterButton.style'
import ListFilter from './ListFilter'
import TypeFilter from './TypeFilter'

const useStyles = makeStyles({
  paper: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'muli',
    borderRadius: 5,
    minHeight: 217,
  },
})

const defaultAnchor = {
  vertical: 'bottom',
  horizontal: 'right',
}

const defaultTransform = {
  vertical: 'top',
  horizontal: 'right',
}

// 'include' = 0, 'exclude' = 1
const INITIAL_BRIDGE = 0
const INITIAL_FILTERDATA = {
  0: {},
  1: {}
}
const INITIAL_GLOBAL_NIN = {
  0: [],
  1: []
}

export default function Filter({
  listFilter,
  id = 'filter',
  onApply,
  anchorOrigin = defaultAnchor,
  transformOrigin = defaultTransform,
  ...children
}) {
  const [bridge, setBridge] = useState(INITIAL_BRIDGE)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeFilter, setActiveFilter] = useState(listFilter[0])
  const [ref, {height}] = useGetDimensions()

  const [filterData, setFilterData] = useState(INITIAL_FILTERDATA)
  const [globalNin, setGlobalNin] = useState(INITIAL_GLOBAL_NIN)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleResetAll = () => {
    setFilterData(INITIAL_FILTERDATA)
    setGlobalNin(INITIAL_GLOBAL_NIN)
  }

  const handleApply = () => {
    onApply(filterData)
    handleClose()
  }

  const open = Boolean(anchorEl)
  const idTarget = open ? id : undefined
  return (
    <div>
      <div
        aria-describedby={idTarget}
        style={{display: 'inline-flex', fontFamily: 'muli'}}
        onClick={handleClick}
        {...children}
      />
      <Popover
        id={idTarget}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <ListFilter
          id={id}
          ref={ref}
          bridge={bridge}
          setBridge={setBridge}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          listFilter={listFilter}
          filterData={filterData}
          onResetAll={handleResetAll}
          onCancel={handleClose}
          onApply={handleApply}
        />
        <TypeFilter
          height={height}
          filterData={filterData}
          setFilterData={setFilterData}
          activeFilter={activeFilter}
          setGlobalNin={setGlobalNin}
          globalNin={globalNin}
          bridge={bridge}
        />
      </Popover>
    </div>
  )
}
