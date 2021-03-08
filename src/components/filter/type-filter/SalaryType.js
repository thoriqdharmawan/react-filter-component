import {InputAdornment, makeStyles, TextField} from '@material-ui/core'
import React from 'react'
import {AgeTypeWrapper} from '../FilterButton.style'
import {formatatSalary, changeToNumber} from '../helper'
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
    width: 107,
    padding: '8px 7px',
    backgroundColor: '#fff',
    textAlign: 'right',
  },
  input: {
    fontSize: 12,
    padding: '18.5px 2px',
    textAlign: 'right',
  },
  rootAndroment: {
    '& p': {
      fontSize: 12,
      color: '#a9a8a8',
    },
  },
})

const TextFieldSalary = ({value, onChange, label}) => {
  const classes = useStyles()
  return (
    <div className="input">
      <p style={{color: '#a9a8a8', fontSize: 12, margin: 0, marginBottom: 4}}>{label}</p>
      <div className="wrapper-input">
        <TextField
          value={value}
          variant="outlined"
          onChange={onChange}
          classes={{
            root: classes.root,
          }}
          InputProps={{
            classes: {
              root: classes.rootInput,
              input: classes.input,
            },
            startAdornment: (
              <InputAdornment
                classes={{root: classes.rootAndroment}}
                position="start"
              >
                <div
                  style={{
                    borderRight: '1px solid #d0d4d4',
                    paddingRight: 4,
                    display: 'flex',
                    alignItems: 'center',
                    height: 30,
                    marginRight: 6,
                  }}
                >
                  <p>Rp</p>
                </div>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  )
}

export default function SalaryType({activeFilter, setFilterData, filterData}) {
  const handleChange = (event, newValue) => {
    event.preventDefault()
    setFilterData(e => ({
      ...e,
      [activeFilter.fieldName]: {
        min: changeToNumber(newValue[0]),
        max: changeToNumber(newValue[1]),
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
          <TextFieldSalary
            label="Min"
            value={formatatSalary(
              (filterData &&
                filterData[activeFilter.fieldName] &&
                filterData[activeFilter.fieldName].min &&
                filterData[activeFilter.fieldName].min.toString()) ||
                ''
            )}
            // value={value1 || ''}
            onChange={e => {
              const value = e.target.value === '' ? '' : e.target.value
              setter('min', changeToNumber(value))
            }}
          />
          <div className="strip">-</div>
          <TextFieldSalary
            label="Max"
            value={formatatSalary(
              (filterData &&
                filterData[activeFilter.fieldName] &&
                filterData[activeFilter.fieldName].max &&
                filterData[activeFilter.fieldName].max.toString()) ||
                ''
            )}
            // value={value2 || ''}
            onChange={e => {
              const value = e.target.value === '' ? '' : e.target.value
              setter('max', changeToNumber(value))
            }}
          />
        </div>
        <SliderFilter
          min={activeFilter.min}
          max={activeFilter.max}
          value={[
            (filterData &&
              filterData[activeFilter.fieldName] &&
              filterData[activeFilter.fieldName].min &&
              filterData[activeFilter.fieldName].min) ||
              null,
            (filterData &&
              filterData[activeFilter.fieldName] &&
              filterData[activeFilter.fieldName].max &&
              filterData[activeFilter.fieldName].max.toString()) ||
              null,
          ]}
          onChange={handleChange}
        />
      </div>
    </AgeTypeWrapper>
  )
}
