import {makeStyles, Slider} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  rootSlider: {paddingTop: 21},
  rail: {color: '#e5e5e5', height: 3},
  track: {color: '#039be5', height: 3},
  thumb: {color: '#039be5'},
})

export const SliderFilter = ({min, max, value, onChange}) => {
  const classes = useStyles()
  return (
    <Slider
      classes={{
        root: classes.rootSlider,
        rail: classes.rail,
        track: classes.track,
        thumb: classes.thumb,
      }}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      aria-labelledby="range-slider"
    />
  )
}
