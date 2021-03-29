import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core'
import React, {useState, useLayoutEffect} from 'react'
import {CheckboxTypeWrapper} from '../FilterButton.style'
import SearchIcon from '@material-ui/icons/Search'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { LoadingComponent } from '../shared/CircularProgress'
import { filterArrayOfObject, getNinVariables } from '../helper'

const useStyles = makeStyles({
  root: {
    fontSize: 12,
    padding: '0px 14px 14px 14px',
  },
  rootInput: {
    fontSize: 12,
    height: 35,
    padding: '8px 7px',
    backgroundColor: '#fff',
  },
  rootCheckbox: {
    display: 'flex',
    margin: 0,
    padding: '0px 12px 7px 12px',
    alignItems: 'flex-start',
    '& .MuiTypography-body1': {
      paddingTop: 3,
    },
  },
  labelCheckbox: {
    fontSize: 12,
  },
  checkboxRoot: {
    padding: 0,
    marginRight: 8,
  },
})

const CheckboxItem = ({label, name, onChange, checked, value}) => {
  const classes = useStyles()
  return (
    <FormControlLabel
      classes={{
        root: classes.rootCheckbox,
        label: classes.labelCheckbox,
      }}
      control={
        <Checkbox
          checked={checked}
          color="primary"
          classes={{
            root: classes.checkboxRoot,
          }}
          onChange={onChange}
          value={value}
          name={name}
        />
      }
      label={label}
    />
  )
}

const DUMY = gql`
  query($user: uuid) {
    dumy(where: {user: {_eq: $user}}) {
      id
    }
  }
`

const SLICE_TRESHOLD = 6
const INITIAL_NIN = []

export default function CheckboxType({
  activeFilter,
  setFilterData,
  filterData,
  height,
  bridge,
  globalNin,
  setGlobalNin
}) {
  const classes = useStyles()
  const {fieldName, emptyState} = activeFilter
  const {fetch, list} = activeFilter.options
  const [search, setSearch] = useState('')
  const [optionResult, setOptionResult] = useState(undefined)
  const [totalData, setTotalData] = useState(0)

  const [getDataQuery, {data, loading: fetchLoading, refetch}] = useLazyQuery((fetch && fetch.query) || DUMY)
  const SEARCH_VARIABLES = `%${search}%`

  useLayoutEffect(() => {
    if (fetch) {
      getDataQuery({
        variables: {
          ...fetch.options.variables,
          limit: fetch.options.variables.limit,
          search: SEARCH_VARIABLES,
          nin: globalNin && globalNin[bridge] && globalNin[bridge][fieldName] || [],
        },
      })
    } else {
      if (search === '') {
        setOptionResult(list)
      }
    }
    if (data && fetch) {
      const [dataMap, totalData] = fetch.setData(data) || []
      setOptionResult(dataMap || [])
      setTotalData(totalData)
    }
  }, [data, search, activeFilter, globalNin])

  const handleChange = (e, check, item) => {
    e.preventDefault()
    if (fetch) {
      const _nin = getNinVariables(_selectedCheckbox, item, check)
      setGlobalNin(nin => {
        return {
          ...nin,
          [bridge]: {
            ...nin[bridge],
            [fieldName]: _nin
          }
        }
      })
      const variables = {
        ...fetch.options.variables,
        limit: fetch.options.variables.limit,
        nin: _nin,
        search: SEARCH_VARIABLES,
      }
      refetch(variables)
      setOptionResult(fetch.setData(data) || [])
    }
    setFilterData(filter => {
      let newValue = []
      if (check) {
        if (filter && filter[bridge] && filter[bridge][fieldName] && filter[bridge][fieldName].length > 0) {
          newValue = [...filter[bridge][fieldName]]
        }
        newValue.push(item)
      } else {
        const newData = [...filter[bridge][fieldName]].filter(function(itm) {
          return itm.value !== item.value
        })
        newValue = newData
      }
      return {
        ...filter, 
        [bridge]: {
          ...filter[bridge],
          [fieldName]: newValue
        }
      }
    })
  }


  const isAdded = (check, dataSelected) => {
    let result = false
    if (check && check.length > 0) {
      check.map(cek => {
        if (cek.value === dataSelected.value) {
          result = true
        }
      })
      return result
    } else {
      return false
    }
  }

  const handleCheck = dataSelected => {
    if (isAdded(filterData && filterData[bridge] && filterData[bridge][fieldName], dataSelected)) {
      const stgCheck = [...filterData[bridge][fieldName]]
      const index = stgCheck
        .map(e => {
          return e.value
        })
        .indexOf(dataSelected.value)
      if (index > -1) {
        stgCheck.splice(index, 1)
      }
      setFilterData(filter => {
        return {
          ...filter, 
          [bridge]: {
            ...filter[bridge],
            [fieldName]: stgCheck
          }
        }
      })
    } else {
      setFilterData(filter => {
        let newValue = []
        if (filterData && filterData[bridge] && filter[bridge][fieldName] && filter[bridge][fieldName].length > 0) {
          newValue = [...filter && filter[bridge] &&filter[bridge][fieldName]]
        }
        newValue.push(dataSelected)
        return {
          ...filter, 
          [bridge]: {
            ...filter[bridge],
            [fieldName]: newValue
          }
        }
      })
    }
  }

  const handleSelectAll = () => {
    const _filterData = [...new Set([...(filterData && filterData[bridge] && filterData[bridge][fieldName] || []), ...optionResult])];
    setFilterData(filter => {
      return {
        ...filter, 
        [bridge]: {
          ...filter[bridge],
          [fieldName]: _filterData
        }
      }
    })
    if(fetch) {
      const _nin = optionResult.map(obj => obj.value)
      const newGlobalNin = [...(globalNin && globalNin[bridge] && globalNin[bridge][fieldName] || []), ..._nin]
      const _newGlobalNin = [...new Set(newGlobalNin)];
      setGlobalNin({
        ...globalNin,
        [bridge]: {
          ...globalNin[bridge],
          [fieldName]: _newGlobalNin
        }
      })
      refetch({
        ...fetch.options.variables,
        limit: fetch.options.variables.limit,
        nin: _newGlobalNin,
        search: SEARCH_VARIABLES,
      })
    }
  }
  
  const handleReset = () => {
    setFilterData(filter => {
      return {
        ...filter, 
        [bridge]: {
          ...filter[bridge],
          [fieldName]: []
        }
      }
    })
    if(fetch) {
      setGlobalNin({
        ...globalNin,
        [bridge]: {
          ...globalNin[bridge],
          [fieldName]: []
        }
      })
      refetch({
        ...fetch.options.variables,
        limit: fetch.options.variables.limit,
        nin: INITIAL_NIN,
        search: SEARCH_VARIABLES,
      })
    }
  }

  const handleSearch = e => {
    if (fetch) {
      setSearch(e.target.value)
    } else {
      const newInitial = [...list]
      setSearch(e.target.value)
      if (search !== '') {
        const results = newInitial.filter(opt =>
          opt.label.toLowerCase().includes(e.target.value)
        )
        setOptionResult(results)
      }
    }
  }

  const _selectedCheckbox =
    filterData && filterData[bridge] && filterData[bridge][fieldName] || []

  return (
    <CheckboxTypeWrapper height={height}>
      <TextField
        variant="outlined"
        classes={{
          root: classes.root,
        }}
        onChange={handleSearch}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{width: 14, height: 14, color: '#014a62'}} />
            </InputAdornment>
          ),
          classes: {
            root: classes.rootInput,
          },
        }}
      />
      <div className="action">
        <span onClick={handleSelectAll} className="btn select-all">
          Select All
        </span>
        <span onClick={handleReset} className="btn reset">
          Reset
        </span>
      </div>
      {_selectedCheckbox[0] && (
        <>
          <div className='list-checkbox'>
            <FormGroup>
              {_selectedCheckbox.reverse().slice(0, SLICE_TRESHOLD).map((item, i) => (
                <CheckboxItem
                  checked={
                    (filterData &&
                      filterData[bridge] &&
                      filterData[bridge][fieldName] &&
                      filterData[bridge][fieldName].some(
                        (e) => e.value === item.value
                      )) ||
                    false
                  }
                  key={`${i}-${item.value}`}
                  onChange={
                    fetch
                      ? (e, check) => handleChange(e, check, item)
                      : () => handleCheck(item)
                  }
                  value={item.value}
                  label={item.label}
                  name={fieldName}
                />
              ))}
            </FormGroup>
          </div>
          {_selectedCheckbox.length > SLICE_TRESHOLD && (
            <div className="more-text">
              and {_selectedCheckbox.length - SLICE_TRESHOLD} hidden items
            </div>
          )}
          <div className='divider' />
        </>
      )}
      <div className="list-checkbox">
        <FormGroup>
          {optionResult && !fetchLoading ? (
            optionResult.length > 0 ? (
              filterArrayOfObject(optionResult, _selectedCheckbox).map((item, i) => (
                <CheckboxItem
                  checked={
                    (filterData &&
                      filterData[bridge] &&
                      filterData[bridge][fieldName] &&
                      filterData[bridge][fieldName].some(
                        e => e.value === item.value
                      )) ||
                    false
                  }
                  key={`${i}-${item.value}`}
                  onChange={
                    fetch
                      ? (e, check) => handleChange(e, check, item)
                      : () => handleCheck(item)
                  }
                  value={item.value}
                  label={item.label}
                  name={fieldName}
                />
              ))
            ) : (
              <div className="empty-list">{emptyState || ''}</div>
            )
          ) : <LoadingComponent />}
        </FormGroup>
      </div>
      {fetch && totalData - _selectedCheckbox.length > SLICE_TRESHOLD && (
        <div className='more-text'>
          and {(totalData - _selectedCheckbox.length) - SLICE_TRESHOLD} hidden items
        </div>
      )}
    </CheckboxTypeWrapper>
  )
}
