import {makeStyles} from '@material-ui/core'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {DateTypeWrapper, KeyboardDatePickerStyled} from '../FilterButton.style'

const useStyles = makeStyles({
  root: {
    height: '35px',
    backgroundColor: '#fff',
    margin: '0px 17px',
  },
})

export default function DateType({
  utils,
  activeFilter,
  setFilterData,
  filterData,
}) {
  const handleChangeDate = (e, target) => {
    setFilterData({
      ...filterData,
      [activeFilter.fieldName]: {
        ...(filterData && filterData[activeFilter.fieldName]),
        [target]: e,
      },
    })
  }

  const handleReset = () => {
    setFilterData({
      ...filterData,
      [activeFilter.fieldName]: {},
    })
  }
  const classes = useStyles()
  return (
    <DateTypeWrapper>
      <div className="action">
        <span className="btn select-all">Pick a Date</span>
        <span onClick={handleReset} className="btn reset">
          Reset
        </span>
      </div>
      <MuiPickersUtilsProvider utils={utils || DateFnsUtils}>
        <span className="label">From</span>
        <KeyboardDatePickerStyled
          InputProps={{
            classes: {
              root: classes.root,
            },
            style: {backgroundColor: '#fff', fontSize: 12},
          }}
          value={
            (filterData &&
              filterData[activeFilter.fieldName] &&
              filterData[activeFilter.fieldName].from) ||
            null
          }
          inputVariant="outlined"
          format="MMMM dd, yyyy"
          size="small"
          space="0px"
          onChange={e => handleChangeDate(e, 'from')}
        />
        <span className="label">To</span>
        <KeyboardDatePickerStyled
          InputProps={{
            classes: {
              root: classes.root,
            },
            style: {backgroundColor: '#fff', fontSize: 12},
          }}
          value={
            (filterData &&
              filterData[activeFilter.fieldName] &&
              filterData[activeFilter.fieldName].to) ||
            null
          }
          inputVariant="outlined"
          format="MMMM dd, yyyy"
          size="small"
          space="0px"
          onChange={e => handleChangeDate(e, 'to')}
        />
      </MuiPickersUtilsProvider>
    </DateTypeWrapper>
  )
}
