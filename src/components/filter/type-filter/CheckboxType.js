import {
  Checkbox,
  CircularProgress,
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

export default function CheckboxType({
  activeFilter,
  setFilterData,
  filterData,
  height,
}) {
  const classes = useStyles()
  const {fieldName, emptyState} = activeFilter
  const {fetch, list} = activeFilter.options
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [optionResult, setOptionResult] = useState(undefined)

  const [getDataQuery, {data}] = useLazyQuery((fetch && fetch.query) || DUMY)

  useLayoutEffect(() => {
    if (fetch) {
      getDataQuery({
        variables: {
          ...fetch.options.variables,
          search: `%${search}%`,
        },
      })
    } else {
      if (search === '') {
        setOptionResult(list)
      }
    }
    if (data && fetch) {
      setOptionResult(fetch.setData(data) || [])
      setLoading(false)
    }
  }, [data, search, activeFilter])

  const handleChange = (e, check, item) => {
    e.preventDefault()
    if (fetch) {
      setOptionResult(fetch.setData(data) || [])
    }
    setFilterData(filter => {
      let newValue = []
      if (check) {
        if (filter && filter[fieldName] && filter[fieldName].length > 0) {
          newValue = [...filter[fieldName]]
        }
        newValue.push(item)
      } else {
        const newData = [...filter[fieldName]].filter(function(itm) {
          return itm.value !== item.value
        })
        newValue = newData
      }
      return {...filter, [fieldName]: newValue}
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
    if (isAdded(filterData && filterData[fieldName], dataSelected)) {
      const stgCheck = [...filterData[fieldName]]
      const index = stgCheck
        .map(e => {
          return e.value
        })
        .indexOf(dataSelected.value)
      if (index > -1) {
        stgCheck.splice(index, 1)
      }
      setFilterData(filter => ({...filter, [fieldName]: stgCheck}))
    } else {
      setFilterData(filter => {
        let newValue = []
        if (filter && filter[fieldName] && filter[fieldName].length > 0) {
          newValue = [...filter[fieldName]]
        }
        newValue.push(dataSelected)
        return {...filter, [fieldName]: newValue}
      })
    }
  }

  const handleSelectAll = () => {
    setFilterData(filter => ({...filter, [fieldName]: optionResult}))
  }
  const handleReset = () => {
    setFilterData(filter => ({...filter, [fieldName]: []}))
  }

  const handleSearch = e => {
    if (fetch) {
      setLoading(true)
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
      <div className="list-checkbox">
        <FormGroup>
          {optionResult && !loading ? (
            optionResult.length > 0 ? (
              optionResult.map((item, i) => (
                <CheckboxItem
                  checked={
                    (filterData &&
                      filterData[fieldName] &&
                      filterData[fieldName].some(
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
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 0px',
              }}
            >
              <CircularProgress />
            </div>
          )}
        </FormGroup>
      </div>
    </CheckboxTypeWrapper>
  )
}
