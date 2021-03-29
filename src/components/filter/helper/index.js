export const formatatSalary = (salary) => {
  if (salary && !Number.isInteger(salary) && salary !== '') {
    const number_string = salary.replace(/[^,\d]/g, '').toString()
    const split = number_string.split(',')
    const sisa = split[0].length % 3
    let rupiah = split[0].substr(0, sisa)
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
    return rupiah
  } else {
    return salary
  }
}

export const changeToNumber = (number) => {
  if (number && !Number.isInteger(number)) {
    return parseInt(number.split('.').join(''))
  } else {
    return number
  }
}

export const filterArrayOfObject = (array, anotherArray) =>
  array.filter(
    (elem) => !anotherArray.find(({ value }) => elem.value === value)
  )

export const getNinVariables = (array, object, isCheck) => {
  let _ninObj = []
  if (isCheck) {
    _ninObj = [...array, object]
  } else {
    _ninObj = [...array].filter(function (itm) {
      return itm.value !== object.value
    })
  }
  return _ninObj.map((obj) => {
    return obj.value
  })
}


export const getTotalCountChecked = (checkboxFilter = [], filterData = {}) => {
  let countInclude = 0
  let countExclude = 0
  checkboxFilter.map((res) => {
    countInclude =
      countInclude +
      ((filterData[0] &&
        filterData[0][res.fieldName] &&
        filterData[0][res.fieldName].length) ||
        0)
    countExclude =
      countExclude +
      ((filterData[1] &&
        filterData[1][res.fieldName] &&
        filterData[1][res.fieldName].length) ||
        0)
  })
  return [countInclude, countExclude]
}
