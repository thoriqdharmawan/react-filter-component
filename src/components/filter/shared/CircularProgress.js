import React from 'react'
import { CircularProgress } from '@material-ui/core'

export function LoadingComponent() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0px'
      }}
    >
      <CircularProgress />
    </div>
  )
}
