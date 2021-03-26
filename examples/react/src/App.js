import React from 'react'
import { Filter } from 'react-filter'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import gql from 'graphql-tag'

const GET_LAUCH_PAST  = gql`
  query ($search: String) {
    launchesPast(find: {mission_name: $search}, limit: 10) {
      id
      mission_name
    }
  }  
`
const GET_SHIPS  = gql`
  query ($search: String) {
    ships(limit: 10, find: {name: $search}) {
      id
      name
    }
  }   
`

const App = () => {
  const listFilter = [
    {
      name: 'Status',
      fieldName: 'status',
      type: 'checkbox',
      options: {
        list: [
          // contoh dari list yang enggak ngefetch
          {value: 1, label: 'Waiting'}, // penamaan key harus value dan label
          {value: 2, label: 'Approved'},
          {value: 3, label: 'Rejected'},
          {value: 4, label: 'Cancelled'},
        ],
      },
    },
    {
      name: 'Launch Past', // REQUIRED
      fieldName: 'launchPast', // REQUIRED => Unique value
      type: 'checkbox', // REQUIRED  => Type String => checkbox | date | age | salary
      // emptyState: 'Empty List', // OPTIONAL => Type String | ReactNode
      options: {
        // REQUIRED  =>  Bisa list ngefetch ataupun list hardode
        fetch: {
          // ## Cntoh List nge fetch ##
          query: GET_LAUCH_PAST, // REQUIRED  => must include $String
          options: {},
          setData: data => {
            // REQUIRED => untuk nge mapping data list
            if (data && data.launchesPast) {
              return data.launchesPast.map(({id, mission_name}) => {
                return {
                  value: id,
                  label: mission_name,
                }
              })
            }
          },
        },
      },
    },
    {
      name: 'Ships', // REQUIRED
      fieldName: 'ships', // REQUIRED => Unique value
      type: 'checkbox', // REQUIRED  => Type String => checkbox | date | age | salary
      // emptyState: 'Empty List', // OPTIONAL => Type String | ReactNode
      options: {
        // REQUIRED  =>  Bisa list ngefetch ataupun list hardode
        fetch: {
          // ## Cntoh List nge fetch ##
          options: {},
          query: GET_SHIPS, // REQUIRED  => must include $String
          setData: data => {
            if (data && data.ships) {
              return data.ships.map(({id, name}) => {
                return {
                  value: id,
                  label: name,
                }
              })
            }
          },
        },
      },
    },
    {
      name: 'Date', // REQUIRED
      fieldName: 'date', // REQUIRED => unique
      type: 'date', // REQUIRED
    },
    {
      name: 'Age', // REQUIRED
      fieldName: 'age', // REQUIRED => unique
      type: 'age', // REQUIRED
      min: 0, // REQUIRED
      max: 70, // REQUIRED
    },
    {
      name: 'Salary', // REQUIRED
      fieldName: 'salary', // REQUIRED => unique
      type: 'salary', // REQUIRED
      min: 0, // REQUIRED
      max: 1000000, // REQUIRED
    },
  ]

  const handleApply = result => {
      // eslint-disable-next-line
      console.log('result : ', result)
  }

  const anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'right',
  }
  const transformOrigin = {
      vertical: 'top',
      horizontal: 'right',
  }
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Filter 
            anchorOrigin={anchorOrigin} // OPTIONAL || see  https://material-ui.com/components/popover/#anchor-playground
            transformOrigin={transformOrigin} // OPTIONAL || see  https://material-ui.com/components/popover/#anchor-playground
            id="filter-wlb" // REQUIRED, Unique value
            onApply={handleApply} // REQUIRED
            listFilter={listFilter} // REQUIRED
          >
            <button>Click me</button>
          </Filter>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  )
}

export default App