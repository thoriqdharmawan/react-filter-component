import {makeStyles, TextField} from '@material-ui/core'
import React from 'react'
import {AgeTypeWrapper} from '../FilterButton.style'
import {SliderFilter} from '../shared/SliderFilter'

const useStyles = makeStyles({
  wrapperSlider: {
    padding: '0px 17px',
  },
  root: {
    fontSize: 12,
  },
  rootInput: {
    fontSize: 12,
    height: 30,
    width: 63,
    padding: '8px 7px',
    backgroundColor: '#fff',
    textAlign: 'right',
  },
  input: {
    padding: '18.5px 2px',
    textAlign: 'right',
  },
})

const TextFieldAge = ({value, onChange, label}) => {
  const classes = useStyles()
  return (
    <div className="input">
      <p style={{color: '#a9a8a8', fontSize: 12, margin: 0, marginBottom: 4}}>{label}</p>
      <div className="wrapper-input">
        <TextField
          type="number"
          value={value}
          variant="outlined"
          onChange={onChange}
          classes={{
            root: classes.root,
          }}
          InputProps={{
            type: 'number',
            classes: {
              root: classes.rootInput,
              input: classes.input,
            },
          }}
        />
        <p style={{color: '#a9a8a8', fontSize: 12, margin: 0}}>Years</p>
      </div>
    </div>
  )
}

export default function AgeType({activeFilter, setFilterData, filterData}) {
  const handleChange = (event, newValue) => {
    event.preventDefault()
    setFilterData(e => ({
      ...e,
      [activeFilter.fieldName]: {
        min: newValue[0],
        max: newValue[1],
      },
    }))
  }

  const setter = (idx, value) => {
    setFilterData(e => ({
      ...e,
      [activeFilter.fieldName]: {
        ...e[activeFilter.fieldName],
        [idx]: value,
      },
    }))
  }

  const handleReset = () => {
    setFilterData(e => ({
      ...e,
      [activeFilter.fieldName]: {},
    }))
  }

  return (
    <AgeTypeWrapper>
      <div className="action">
        <span className="btn select-all">Select a range</span>
        <span onClick={handleReset} className="btn reset">
          Reset
        </span>
      </div>
      <div className="content">
        <div className="text-field">
          <TextFieldAge
            label="Min"
            value={
              (filterData &&
                filterData[activeFilter.fieldName] &&
                filterData[activeFilter.fieldName].min) ||
              false
            }
            onChange={e => {
              const value = e.target.value === '' ? '' : Number(e.target.value)
              setter('min', value)
            }}
          />
          <div className="strip">-</div>
          <TextFieldAge
            label="Max"
            value={
              (filterData &&
                filterData[activeFilter.fieldName] &&
                filterData[activeFilter.fieldName].max) ||
              false
            }
            onChange={e => {
              const value = e.target.value === '' ? '' : Number(e.target.value)
              setter('max', value)
            }}
          />
        </div>
        <SliderFilter
          min={activeFilter.min}
          max={activeFilter.max}
          value={[
            (filterData &&
              filterData[activeFilter.fieldName] &&
              filterData[activeFilter.fieldName].min) ||
              0,
            (filterData &&
              filterData[activeFilter.fieldName] &&
              filterData[activeFilter.fieldName].max) ||
              0,
          ]}
          onChange={handleChange}
        />
      </div>
    </AgeTypeWrapper>
  )
}
