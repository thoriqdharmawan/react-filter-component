import React from 'react'
import { Filter } from 'react-filter'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import gql from 'graphql-tag'

const PLANETS  = gql`
  query getPlanets ($search: String, $limit: Int, $nin: [uuid!]) {
    planets(limit: $limit, where: {name: {_ilike: $search}, id: {_nin: $nin}}) {
      id
      name
    }
    planets_aggregate {
      aggregate {
        count
      }
    }
  }
`
const GET_ASTRONAUTS = gql`
  query getAstronauts ($search: String, $limit: Int, $nin: [Int!]) {
    astronauts(limit: $limit, where: {name: {_ilike: $search}, id: {_nin: $nin}}) {
      name
      id
    }
    astronauts_aggregate {
      aggregate {
        count
      }
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
      name: 'Planets', // REQUIRED
      fieldName: 'planets', // REQUIRED => Unique value
      type: 'checkbox', // REQUIRED  => Type String => checkbox | date | age | salary
      // emptyState: 'Empty List', // OPTIONAL => Type String | ReactNode
      options: {
        // REQUIRED  =>  Bisa list ngefetch ataupun list hardode
        fetch: {
          // ## Cntoh List nge fetch ##
          query: PLANETS, // REQUIRED  => must include $String
          options: {
            variables: {
              limit: 6
            }
          },
          setData: data => {
            // REQUIRED => untuk nge mapping data list
            if (data && data.planets) {
              const _data = data.planets.map(({id, name}) => {
                return {
                  value: id,
                  label: name,
                }
              })
              return [_data, data.planets_aggregate.aggregate.count]
            }
          },
        },
      },
    },
    {
      name: 'Astronauts', // REQUIRED
      fieldName: 'astronauts', // REQUIRED => Unique value
      type: 'checkbox', // REQUIRED  => Type String => checkbox | date | age | salary
      // emptyState: 'Empty List', // OPTIONAL => Type String | ReactNode
      options: {
        // REQUIRED  =>  Bisa list ngefetch ataupun list hardode
        fetch: {
          // ## Cntoh List nge fetch ##
          query: GET_ASTRONAUTS, // REQUIRED  => must include $String
          options: {
            variables: {
              limit: 6
            }
          },
          setData: data => {
            // REQUIRED => untuk nge mapping data list
            if (data && data.astronauts) {
              const _data = data.astronauts.map(({id, name}) => {
                return {
                  value: id,
                  label: name,
                }
              })
              return [_data, data.astronauts_aggregate.aggregate.count]
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